import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Button from './Button';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          onImageSelected(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <div 
        className={`relative group cursor-pointer flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 ${
          dragActive 
            ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" 
            : "border-slate-600 bg-slate-800/50 hover:border-slate-400 hover:bg-slate-800"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
          <div className="p-4 rounded-full bg-slate-700/50 mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-10 h-10 text-indigo-400" />
          </div>
          <p className="mb-2 text-xl font-semibold text-slate-200">
            Upload your selfie
          </p>
          <p className="mb-6 text-sm text-slate-400">
            SVG, PNG, JPG or WEBP (MAX. 5MB)
          </p>
          <Button variant="secondary" className="pointer-events-none">
            Select from computer
          </Button>
        </div>
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">1</div>
            <h3 className="font-medium text-slate-200">Good Lighting</h3>
          </div>
          <p className="text-xs text-slate-400">Face the light source. Avoid strong shadows on your face.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">2</div>
            <h3 className="font-medium text-slate-200">Clear Face</h3>
          </div>
          <p className="text-xs text-slate-400">Ensure your face is unobstructed and in focus.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">3</div>
            <h3 className="font-medium text-slate-200">Neutral Expression</h3>
          </div>
          <p className="text-xs text-slate-400">A slight smile or neutral expression works best.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;