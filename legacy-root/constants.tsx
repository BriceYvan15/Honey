
import { ButtonStage } from './types';

export const NO_BUTTON_STAGES: (name: string) => ButtonStage[] = (name) => [
  { 
    text: "Non", 
    color: "bg-gray-400", 
    persuasion: `Est-ce que tu veux être ma Valentine, ${name} ?` 
  },
  { 
    text: "Tu es sûre ?", 
    color: "bg-gray-500", 
    persuasion: `Tu es vraiment sûre, ${name} ? 🤨` 
  },
  { 
    text: "Vraiment ?", 
    color: "bg-rose-300", 
    persuasion: `Mais... je pensais qu'on était inséparables ! 😭` 
  },
  { 
    text: "Réfléchis bien...", 
    color: "bg-rose-400", 
    persuasion: `Réfléchis encore un tout petit peu... s'il te plaît ? ✨` 
  },
  { 
    text: "Dernière chance !", 
    color: "bg-rose-500", 
    persuasion: `C'est ta dernière chance d'avoir le meilleur Valentin ! 🏃‍♂️💨` 
  },
  { 
    text: "OUI ! ❤️", 
    color: "bg-green-500", 
    persuasion: `Je savais que tu ne pourrais pas résister à mon charme ! 😍` 
  }
];

export const HEART_ICONS = [
  "❤️", "💖", "💝", "💕", "💘", "💌", "🌸"
];
