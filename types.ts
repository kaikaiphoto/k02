export enum AppState {
  UPLOAD = 'UPLOAD',
  STYLE_SELECTION = 'STYLE_SELECTION',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  EDITING = 'EDITING'
}

export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  icon: string;
  color: string;
}

export interface GeneratedImage {
  original: string; // Base64
  current: string; // Base64
  history: string[]; // Base64[]
}