import React from 'react';
import { HEADSHOT_STYLES, getIcon } from '../constants';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  onSelect: (style: HeadshotStyle) => void;
  selectedId?: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-white mb-8">Choose your professional vibe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HEADSHOT_STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style)}
            className={`cursor-pointer group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              selectedId === style.id
                ? 'border-indigo-500 bg-slate-800 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
            }`}
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${style.color === 'bg-slate-700' ? 'text-white' : style.color.replace('bg-', 'text-')}`}>
               {/* Large background icon decoration */}
               {React.cloneElement(getIcon(style.icon) as React.ReactElement, { className: "w-24 h-24" })}
            </div>
            
            <div className="p-6 relative z-10">
              <div className={`w-12 h-12 rounded-lg ${style.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {getIcon(style.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{style.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {style.description}
              </p>
            </div>
            
            {/* Selection Ring */}
            {selectedId === style.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center ring-2 ring-slate-900">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;