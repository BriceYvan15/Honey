import React, { useState, useCallback, useRef, useMemo } from 'react';
import HeartBackground from './components/HeartBackground';
import { NO_BUTTON_STAGES } from './constants';
import { Step } from './types';
import { Heart, Sparkles, Send, Quote } from 'lucide-react';

const SAD_EMOJIS = ["🥺", "😢", "😭", "💔", "🥀", "😿", "⚓️", "☁️"];

interface SadParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const launchConfetti = () => {
  if (typeof window !== 'undefined' && (window as any).confetti) {
    (window as any).confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff', '#ff1493']
    });
  }
};

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('entry');
  const [name, setName] = useState('');
  const [noStage, setNoStage] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [sadParticles, setSadParticles] = useState<SadParticle[]>([]);
  const [successVideoError, setSuccessVideoError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stages = useMemo(() => NO_BUTTON_STAGES(name || "mon amour"), [name]);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const spawnSadness = (x: number, y: number) => {
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: x + (Math.random() * 120 - 60),
      y: y + (Math.random() * 120 - 60),
      emoji: SAD_EMOJIS[Math.floor(Math.random() * SAD_EMOJIS.length)]
    }));
    setSadParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setSadParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2500);
  };

  const handleNoHover = useCallback((e: React.MouseEvent) => {
    if (noStage < stages.length - 1) {
      setNoStage(prev => prev + 1);
      setYesButtonScale(prev => prev + 0.18);

      const moveRange = 140;
      const newX = (Math.random() - 0.5) * moveRange * 2;
      const newY = (Math.random() - 0.5) * moveRange * 2;
      setNoOffset({ x: newX, y: newY });

      spawnSadness(e.clientX, e.clientY);
    } else {
      setNoOffset({ x: 0, y: 0 });
    }
  }, [noStage, stages.length]);

  const handleYes = useCallback(() => {
    setStep('success');
    setSuccessVideoError(false);
    launchConfetti();
    setTimeout(launchConfetti, 500);
    setTimeout(launchConfetti, 1200);
  }, []);

  const startAsking = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep('asking');
    }
  };

  const currentNoButton = stages[noStage];
  const isNoTransformedToYes = noStage === stages.length - 1;

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-y-auto transition-colors duration-500 bg-rose-50" 
      ref={containerRef}
    >
      <HeartBackground />

      {sadParticles.map(p => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50 animate-sad-float text-3xl"
          style={{ left: p.x, top: p.y }}
        >
          {p.emoji}
        </div>
      ))}

      <div className="z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border-4 border-rose-100 transform transition-all relative my-8">

        {step === 'entry' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl font-romantic text-rose-600">Coucou Honey... ❤️</h1>
            <p className="text-rose-400">Tu peux écrire ton nom juste en dessous stp ?</p>
            <form onSubmit={startAsking} className="space-y-6">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ton petit nom ici..."
                className="w-full px-6 py-4 rounded-full border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-center text-xl text-rose-600 shadow-inner bg-rose-50/50"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 text-white font-bold rounded-full shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                Continuer <Send size={20} />
              </button>
            </form>
          </div>
        )}

        {step === 'asking' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative inline-block">
              <div
                className="w-48 h-48 mx-auto rounded-full border-4 border-rose-200 shadow-lg transition-all duration-500 bg-white/90 flex items-center justify-center"
                aria-label="Réaction"
              >
                <span className="text-7xl select-none">
                  {noStage > 2 ? '😭' : '🥺'}
                </span>
              </div>
              <Heart className={`absolute -top-2 -right-2 text-rose-500 ${noStage > 0 ? 'animate-ping' : 'animate-bounce'}`} size={32} fill="currentColor" />
            </div>

            <h1 className="text-3xl font-romantic text-rose-600 leading-tight min-h-[4rem] flex items-center justify-center">
              {currentNoButton.persuasion}
            </h1>

            <div className="relative h-32 flex items-center justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                <button
                  onClick={handleYes}
                  style={{ transform: `scale(${yesButtonScale})` }}
                  className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-green-200 transition-all duration-300 transform active:scale-95 flex items-center gap-2 text-xl z-20"
                >
                  OUI ! <Heart size={20} fill="currentColor" />
                </button>

                <button
                  onMouseEnter={handleNoHover}
                  onClick={isNoTransformedToYes ? handleYes : undefined}
                  style={{ 
                    transform: isNoTransformedToYes ? 'scale(1.1)' : `translate(${noOffset.x}px, ${noOffset.y}px)`,
                    transition: isNoTransformedToYes ? 'all 0.3s ease' : 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className={`px-8 py-3 ${currentNoButton.color} text-white font-semibold rounded-full shadow-md min-w-[140px] whitespace-nowrap ${isNoTransformedToYes ? 'animate-pulse ring-4 ring-green-300' : ''}`}
                >
                  {currentNoButton.text}
                </button>
              </div>
            </div>

            <p className="text-rose-400 text-sm italic pt-4">
              {noStage > 0 ? `Tentatives d'esquive de ${name} : ${noStage}` : `Psst... Je sais déjà que tu vas dire oui ❤️`}
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 animate-in zoom-in slide-in-from-bottom duration-1000">
            <div className="relative pb-4">
              <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-2xl overflow-hidden border-4 border-green-200 shadow-xl bg-white">
                {!successVideoError && (
                  <video
                    src="/celebration.mp4"
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setSuccessVideoError(true)}
                    className="w-full h-full object-contain"
                  />
                )}

                {successVideoError && (
                  <img 
                    src="/successs.png" 
                    alt="Happy Valentine" 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <Sparkles className="absolute -top-2 -left-2 text-yellow-400 animate-pulse" size={30} />
              <Heart className="absolute -bottom-2 -right-2 text-rose-500 animate-bounce" size={30} fill="currentColor" />
            </div>

            <div className="space-y-4 text-left">
              <h1 className="text-4xl font-romantic text-rose-600 text-center mb-6">
                Le meilleur choix de ta vie, {name} ! ❤️
              </h1>

              <div className="bg-rose-50/80 p-6 rounded-2xl border-2 border-rose-100 shadow-inner relative">
                <Quote className="absolute -top-3 -left-2 text-rose-200 transform -scale-x-100" size={30} />
                <p className="text-rose-700 text-lg leading-relaxed italic mb-4">
                  "Depuis que tu es entrée dans ma vie, chaque instant a pris une couleur particulière. Ton sourire est ma plus belle récompense et ta tendresse mon plus grand trésor."
                </p>
                <p className="text-rose-700 text-lg leading-relaxed italic">
                  "Merci de faire battre mon cœur un peu plus fort chaque jour. Je suis tellement fier et heureux que tu sois ma Valentine."
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-rose-400 font-romantic text-2xl animate-pulse">
                  Je t'aime infiniment...
                </p>
                <p className="text-rose-300 text-xs mt-4 uppercase tracking-[0.2em]">
                  Pour toujours et à jamais
                </p>
              </div>
            </div>

            <button
              onClick={() => { setStep('asking'); setNoStage(0); setYesButtonScale(1); setNoOffset({x:0, y:0}); }}
              className="mt-6 text-rose-300 hover:text-rose-500 text-sm transition-colors underline decoration-dotted block mx-auto pb-4"
            >
              Revoir ce moment magique
            </button>
          </div>
        )}
      </div>

      <footer className="w-full text-center text-rose-300 text-xs tracking-widest uppercase py-6 z-10">
        Fait avec tout mon amour ❤️ 2024
      </footer>

      <style>{`
        @keyframes sad-float {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 1; transform: translateY(-20px) scale(1) rotate(-10deg); }
          50% { transform: translateY(-80px) scale(1.2) rotate(10deg); opacity: 0.8; }
          100% { transform: translateY(-180px) scale(1.5) rotate(0deg); opacity: 0; }
        }
        .animate-sad-float {
          animation: sad-float 2.5s cubic-bezier(0.2, 0, 0.8, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
