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
    text: "Allez...",
    color: "bg-rose-500",
    persuasion: `Je te promets que ça va être notre plus beau souvenir, ${name}... 🥺`
  },
  {
    text: "S'il te plaît 🙏",
    color: "bg-rose-600",
    persuasion: `Un petit oui, juste pour voir mon sourire ? 😇`
  },
  {
    text: "Je négocie 😅",
    color: "bg-fuchsia-500",
    persuasion: `Si tu dis oui, je te donne un milliard de bisous (minimum) 💋`
  },
  {
    text: "Ok je boude 😤",
    color: "bg-purple-500",
    persuasion: `Je vais faire ma petite moue triste... tu veux vraiment ça ? 😢`
  },
  {
    text: "Tu craques ?",
    color: "bg-indigo-500",
    persuasion: `Je sens que ton cœur hésite... allez ${name}, dis oui ❤️`
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
