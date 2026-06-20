import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Check, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Asset } from '../types';

interface AssetStudioProps {
  assets: Asset[];
  onAddAssets: (newAssets: Asset[]) => void;
  onUpdateAssetRole: (id: string, role: Asset['role']) => void;
  onDeleteAsset: (id: string) => void;
  projectId: string;
}

export default function AssetStudio({ assets, onAddAssets, onUpdateAssetRole, onDeleteAsset, projectId }: AssetStudioProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList) => {
    const promises = Array.from(files).map((file) => {
      return new Promise<Asset>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const sizeKb = (file.size / 1024).toFixed(1);
          const sizeStr = parseFloat(sizeKb) > 1024 
            ? `${(parseFloat(sizeKb) / 1024).toFixed(1)} MB` 
            : `${sizeKb} KB`;

          // Detect dynamic properties if image
          const img = new Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;
            let orientation: 'landscape' | 'portrait' | 'square' = 'square';
            if (width > height * 1.1) orientation = 'landscape';
            else if (height > width * 1.1) orientation = 'portrait';

            // Auto recommend role
            let recommendedRole: Asset['role'] = 'unassigned';
            if (file.name.toLowerCase().includes('logo')) {
              recommendedRole = 'logo';
            } else if (orientation === 'landscape' && parseFloat(sizeKb) > 200) {
              recommendedRole = 'hero';
            } else if (orientation === 'portrait') {
              recommendedRole = 'testimonial';
            } else if (orientation === 'landscape') {
              recommendedRole = 'gallery';
            }

            resolve({
              id: 'ast-' + Math.random().toString(36).substr(2, 9),
              projectId,
              name: file.name,
              type: file.type.startsWith('video/') ? 'video' : file.name.endsWith('.svg') || file.name.toLowerCase().includes('icon') ? 'icon' : 'image',
              url: result,
              role: recommendedRole,
              size: sizeStr,
              width,
              height,
              orientation
            });
          };

          img.onerror = () => {
            // Default safe resolving (documents / videos)
            resolve({
              id: 'ast-' + Math.random().toString(36).substr(2, 9),
              projectId,
              name: file.name,
              type: file.type.startsWith('video/') ? 'video' : 'document',
              url: result,
              role: 'unassigned',
              size: sizeStr
            });
          };

          img.src = result;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((newAssets) => {
      onAddAssets(newAssets);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const getPlacementSuggestion = (asset: Asset): string => {
    if (asset.role === 'logo') return 'Ubicado en barra de navegación superior y pie de página.';
    if (asset.role === 'hero') return 'Fondo premium o cabecera visual principal para la sección Hero.';
    if (asset.role === 'background') return 'Fondo inmersivo texturizado o parallax para secciones secundarias.';
    if (asset.role === 'gallery') return 'Aparecerá en el slider / carrusel interactivo de trabajos de la galería.';
    if (asset.role === 'testimonial') return 'Avatar de cliente para testimonio destacado o foto de equipo.';
    if (asset.role === 'map') return 'Mapa personalizado del negocio o cabecera de contacto.';
    
    // Default smart suggestion based on proportions
    if (asset.orientation === 'landscape') return 'Sugerencia: "Hero" o "Galería" por ser apaisado.';
    if (asset.orientation === 'portrait') return 'Sugerencia: "Testimonio" o "Servicio" por ser vertical.';
    return 'Asigna un rol para colocarlo estratégicamente en la web.';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 text-slate-100" id="asset-studio-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
            <ImageIcon size={18} />
          </div>
          <h3 className="text-md font-semibold tracking-tight">Valkyrie Asset Studio</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 px-2 py-0.5 bg-slate-800 rounded">
          {assets.length} Recursos subidos
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging 
            ? 'border-blue-500 bg-blue-500/5' 
            : 'border-slate-800 hover:border-slate-700 bg-slate-950/30'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*,video/*"
          className="hidden"
        />
        <Upload className="mx-auto mb-3 text-slate-500" size={32} />
        <p className="text-sm font-medium text-slate-300">
          Arrastra y suelta tus assets premium o <span className="text-blue-400 hover:underline">haz clic para examinar</span>
        </p>
        <p className="text-xs text-slate-500 mt-1.5">
          Soporta imágenes JPG, PNG, WEBP, SVG o MP4 para el fondo de vídeo
        </p>
      </div>

      {assets.length > 0 && (
        <div className="mt-5 space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
          {assets.map((asset) => (
            <div 
              key={asset.id} 
              className="p-3 bg-slate-950/50 border border-slate-800/80 rounded-lg flex flex-col md:flex-row gap-3 items-start md:items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 relative group">
                  {asset.type === 'video' ? (
                    <video src={asset.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  )}
                  {asset.orientation && (
                    <span className="absolute bottom-0 right-0 bg-slate-900/80 text-[8px] font-mono px-1 rounded-tl capitalize">
                      {asset.orientation}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate max-w-[170px]">{asset.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">
                    {asset.size} {asset.width && `• ${asset.width}x${asset.height}px`}
                  </p>
                </div>
              </div>

              {/* Asset Role Selector */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex flex-col gap-1 w-full md:w-auto">
                  <label className="text-[10px] uppercase tracking-wider font-mono text-slate-500">
                    Rol o Ubicación en la Web
                  </label>
                  <select
                    value={asset.role}
                    onChange={(e) => onUpdateAssetRole(asset.id, e.target.value as Asset['role'])}
                    className="bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="unassigned">Sin asignar / Auto distribuido</option>
                    <option value="logo">Marca / Logo Oficial</option>
                    <option value="hero">Focal Hero Image</option>
                    <option value="background">Fondo de sección (Parallax/Video)</option>
                    <option value="gallery">Portafolio / Carrusel Galería</option>
                    <option value="testimonial">Avatar / Testimonio de Cliente</option>
                    <option value="map">Imagen o Portada de Mapa</option>
                  </select>
                </div>

                <button
                  onClick={() => onDeleteAsset(asset.id)}
                  className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded transition-colors self-end mt-4 md:mt-0"
                  title="Eliminar Asset"
                  id={`delete-btn-${asset.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Placement Hint Footer */}
              <div className="w-full xl:hidden border-t border-slate-900 mt-2 pt-2 text-[10px] text-blue-400/80 flex items-center gap-1.5">
                <Sparkles size={10} />
                <span>{getPlacementSuggestion(asset)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {assets.length > 0 && (
        <div className="mt-4 p-2.5 bg-slate-950/20 border border-slate-800/50 rounded-lg text-xs text-slate-400 flex items-start gap-2">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="font-semibold text-slate-200">Sugerencias Inteligentes de Asset Tracker</span>
            <p className="mt-0.5 leading-relaxed text-[11px]">
              El motor de conversión ha analizado tus archivos. El logo y las imágenes marcadas con roles serán renderizadas exactamente donde el copywriting dirija el flujo de compras.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
