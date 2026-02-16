import { HeadshotStyle } from './types';
import React from 'react';
import { Briefcase, Building2, Sun, Coffee, Zap, Camera } from 'lucide-react';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate',
    name: 'Corporate Professional',
    description: 'Clean grey or navy background, suit or blazer, perfect for LinkedIn.',
    promptModifier: 'a professional corporate headshot, wearing a tailored business suit, neutral studio grey background, soft studio lighting, high quality, 8k, photorealistic',
    icon: 'Briefcase',
    color: 'bg-blue-600'
  },
  {
    id: 'tech',
    name: 'Modern Tech Office',
    description: 'Smart casual attire, blurred modern office background with glass and wood.',
    promptModifier: 'a modern tech industry headshot, wearing smart casual business attire, blurred modern open-plan office background, bright natural lighting, 8k, photorealistic',
    icon: 'Zap',
    color: 'bg-indigo-600'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Natural',
    description: 'Warm natural light, bokeh park or city background, approachable vibe.',
    promptModifier: 'an outdoor lifestyle professional headshot, golden hour natural lighting, blurred city park background with bokeh, friendly and approachable expression, high resolution',
    icon: 'Sun',
    color: 'bg-amber-600'
  },
  {
    id: 'startup',
    name: 'Creative Startup',
    description: 'Trendy loft background, brick walls, relaxed but professional.',
    promptModifier: 'a creative startup founder headshot, trendy loft office background with brick walls, relaxed professional attire, artistic lighting, sharp focus',
    icon: 'Coffee',
    color: 'bg-rose-600'
  },
  {
    id: 'studio',
    name: 'Classic Studio',
    description: 'Dramatic lighting, black or dark textured background, high contrast.',
    promptModifier: 'a dramatic studio headshot, dark textured background, rembrandt lighting, high contrast, serious and professional demeanor, 8k uhd',
    icon: 'Camera',
    color: 'bg-slate-700'
  },
];

export const MAX_HISTORY_SIZE = 5;

// Helper to render icons based on string name to avoid circular deps or complex passing
export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'Briefcase': return <Briefcase {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Sun': return <Sun {...props} />;
    case 'Coffee': return <Coffee {...props} />;
    case 'Camera': return <Camera {...props} />;
    default: return <Briefcase {...props} />;
  }
};