import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparksDriftingShaders } from "./SparksDriftingShaders";

const words = ["IDÉES", "PROJETS", "ENVIES", "SOUHAITS"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
      
      {/* LE FOND SHADER FEU */}
      <div className="absolute inset-0 z-0">
        <SparksDriftingShaders 
            speed={0.6} 
            fireIntensity={1.5} 
            sparkSize={1.2} 
            smokeIntensity={0.8}
        />
        {/* Overlay pour fondre le bas du feu avec le noir */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* CONTENU */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight tracking-tighter mb-8 font-sans drop-shadow-2xl">
          Mettez le feu à vos <br className="md:hidden" />
          
          {/* LE MOT QUI BRULE */}
          <span className="relative inline-block min-w-[350px] text-center align-top ml-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                
                // Apparition
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', color: '#ffffff' }}
                
                // DISPARITION (BRÛLE)
                exit={{ 
                    opacity: 0, 
                    y: -60, // Monte dans le feu
                    scale: 1.5, 
                    filter: 'blur(12px)', 
                    color: '#ff5500' // Devient orange feu
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute left-0 right-0 mx-auto block"
              >
                {words[index]}.
              </motion.span>
            </AnimatePresence>

            {/* CENDRES (Flocons gris qui tombent au changement) */}
            <AnimatePresence>
                <FallingAsh key={index} />
            </AnimatePresence>
          </span>
        </h1>

        {/* DESCRIPTION (LE SOL) */}
        <div className="relative max-w-2xl mt-8">
            <p className="text-lg md:text-2xl text-white/70 italic font-serif border-t border-white/10 pt-8">
                Nous transformons vos étincelles en brasiers numériques. Une approche radicale pour des résultats qui marquent les esprits.
            </p>
        </div>

      </div>
    </section>
  );
}

// EFFET DE CENDRES QUI TOMBENT
function FallingAsh() {
    // Génère 8 particules aléatoires
    const particles = Array.from({ length: 8 });

    return (
        <>
            {particles.map((_, i) => {
                // Position aléatoire de départ autour du mot
                const randomX = (Math.random() - 0.5) * 150; 
                const randomDelay = Math.random() * 0.3;
                const randomDuration = 1.5 + Math.random();

                return (
                    <motion.div
                        key={i}
                        initial={{ 
                            opacity: 0.8, 
                            y: 0, 
                            x: randomX,
                            scale: Math.random() * 0.5 + 0.5 
                        }}
                        animate={{ 
                            opacity: 0, 
                            y: 120 + Math.random() * 50, // Tombe vers la description
                            x: randomX + (Math.random() - 0.5) * 50, // Dérive horizontale
                            rotate: Math.random() * 360 
                        }} 
                        transition={{ 
                            duration: randomDuration, 
                            ease: "easeIn",
                            delay: randomDelay 
                        }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full pointer-events-none"
                    />
                )
            })}
        </>
    );
}