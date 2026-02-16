import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import Editor from './components/Editor';
import Button from './components/Button';
import { AppState, HeadshotStyle } from './types';
import { generateHeadshot } from './services/geminiService';
import { Camera, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string) => {
    setOriginalImage(base64);
    setAppState(AppState.STYLE_SELECTION);
    setError(null);
  };

  const handleStyleSelect = async (style: HeadshotStyle) => {
    if (!originalImage) return;
    
    setSelectedStyle(style);
    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const result = await generateHeadshot(originalImage, style.promptModifier);
      setCurrentImage(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("Failed to generate headshot. Please try again or use a clearer selfie.");
      setAppState(AppState.STYLE_SELECTION);
    }
  };

  const handleUpdateImage = (newImage: string) => {
    setCurrentImage(newImage);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCurrentImage(null);
    setSelectedStyle(null);
    setAppState(AppState.UPLOAD);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={handleReset} style={{cursor: 'pointer'}}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ProHeadshot<span className="text-indigo-400">AI</span></span>
          </div>
          {appState !== AppState.UPLOAD && (
            <button onClick={handleReset} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              New Project
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-8 w-full max-w-lg bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* STEP 1: Upload */}
        {appState === AppState.UPLOAD && (
          <div className="flex flex-col items-center w-full max-w-4xl animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Professional Headshots,<br/>Instantly.
            </h1>
            <p className="text-slate-400 text-lg text-center max-w-2xl mb-12">
              Turn your casual selfies into studio-quality professional headshots using advanced AI. No photographer needed.
            </p>
            <ImageUploader onImageSelected={handleImageUpload} />
          </div>
        )}

        {/* STEP 2: Style Selection */}
        {appState === AppState.STYLE_SELECTION && (
          <div className="w-full animate-in slide-in-from-right-8 duration-500">
             <div className="flex justify-center mb-8">
               <img src={originalImage || ''} className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 shadow-xl" alt="Your selfie" />
             </div>
             <StyleSelector onSelect={handleStyleSelect} />
          </div>
        )}

        {/* STEP 3: Generating */}
        {appState === AppState.GENERATING && (
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
               <div className="relative w-32 h-32">
                 <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-indigo-500 rounded-full animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Sparkles className="w-10 h-10 text-indigo-400 animate-bounce" />
                 </div>
               </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Creating your headshot...</h2>
            <p className="text-slate-400">Applying {selectedStyle?.name} style</p>
            <p className="text-slate-500 text-sm mt-4">This usually takes about 5-10 seconds</p>
          </div>
        )}

        {/* STEP 4: Result & Edit */}
        {appState === AppState.RESULT && currentImage && originalImage && (
          <div className="w-full animate-in slide-in-from-bottom-8 duration-500">
            <Editor 
              originalImage={originalImage}
              currentImage={currentImage}
              onUpdateImage={handleUpdateImage}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      <footer className="py-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ProHeadshot AI. Powered by Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
};

export default App;