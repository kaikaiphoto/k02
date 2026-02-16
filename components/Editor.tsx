import React, { useState } from 'react';
import { Download, RefreshCw, Wand2, ArrowLeft, Send } from 'lucide-react';
import Button from './Button';
import { editImage } from '../services/geminiService';

interface EditorProps {
  originalImage: string;
  currentImage: string;
  onUpdateImage: (newImage: string) => void;
  onReset: () => void;
}

const Editor: React.FC<EditorProps> = ({ originalImage, currentImage, onUpdateImage, onReset }) => {
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'result' | 'original'>('result');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `pro-headshot-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = async () => {
    if (!prompt.trim()) return;
    
    setIsEditing(true);
    try {
      // Use current image as source for the edit to allow iterative edits
      const newImage = await editImage(currentImage, prompt);
      onUpdateImage(newImage);
      setPrompt('');
    } catch (error) {
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: Image Display */}
      <div className="flex-1 flex flex-col items-center">
        <div className="bg-slate-800 rounded-2xl p-1.5 flex gap-1 mb-4 shadow-lg">
           <button 
             onClick={() => setActiveTab('result')}
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
               activeTab === 'result' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
             }`}
           >
             Current Result
           </button>
           <button 
             onClick={() => setActiveTab('original')}
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
               activeTab === 'original' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
             }`}
           >
             Original Selfie
           </button>
        </div>

        <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
          <img 
            src={activeTab === 'result' ? currentImage : originalImage} 
            alt="Headshot" 
            className="w-full h-full object-cover"
          />
          {isEditing && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Wand2 className="w-12 h-12 text-indigo-400 animate-pulse mb-4" />
                <p className="text-white font-medium animate-pulse">Applying magic edits...</p>
             </div>
          )}
        </div>

        <div className="flex gap-4 mt-6 w-full max-w-md">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onReset}
            icon={<ArrowLeft className="w-4 h-4"/>}
          >
            Start Over
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleDownload}
            icon={<Download className="w-4 h-4"/>}
          >
            Download HD
          </Button>
        </div>
      </div>

      {/* Right Column: Editing Controls */}
      <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 p-6 flex flex-col h-fit">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Magic Editor</h2>
            <p className="text-sm text-slate-400">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Refine your headshot
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="E.g., 'Make the smile more natural', 'Add a retro filter', 'Change background to a library', 'Remove the glare on glasses'..."
                className="w-full bg-slate-800 text-white rounded-lg pl-4 pr-12 py-3 border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-none placeholder-slate-500"
              />
              <button 
                onClick={handleEdit}
                disabled={isEditing || !prompt.trim()}
                className="absolute bottom-3 right-3 p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Fix lighting balance",
                "Make background more blurry",
                "Enhance sharpness",
                "Add a warm cinematic filter"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setPrompt(suggestion);
                    // Optional: auto-submit or just fill
                  }}
                  className="text-left text-sm p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors text-slate-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
           <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <RefreshCw className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Iterative Editing</h4>
                <p className="text-xs text-slate-400 mt-1">
                  You can keep adding edits on top of each other. If you don't like a change, you can start over from the original.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;