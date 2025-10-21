import React from 'react';
import { motion } from 'framer-motion';

const PaperPlaneHero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Fondo con patrón SVG */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenido principal (z alto) */}
      <div className="container mx-auto px-4 text-center relative z-40">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
        >
          ¡Lanza tu idea al mundo!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Convierte tus sueños en realidad con animaciones fluidas y creativas en React.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow z-40"
        >
          Empezar ahora
        </motion.button>
      </div>

      {/* FIGURAS CON Z-INDEX ESCALONADO Y SOMBRA FUERTE */}
      {/* 1: Avión (arriba-izq) */}
      <motion.div
        initial={{ x: -300, opacity: 0, scale: 0.8 }}
        animate={{
          x: 1400,
          y: [-60, 60, -40],
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8],
          rotate: [-15, 15, -10],
        }}
        transition={{
          x: { duration: 7, ease: 'easeInOut' },
          y: { duration: 7, ease: 'easeInOut' },
          opacity: { duration: 7, ease: 'easeInOut' },
          scale: { duration: 7, ease: 'easeInOut' },
          rotate: { duration: 7, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 2,
          delay: 0.2,
        }}
        className="absolute top-20 left-0 w-20 h-20 md:w-28 md:h-28 z-10"
      >
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
          <path d="M10 30 L90 30 L50 10 Z" fill="white" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M10 30 L30 20 L50 30" fill="none" stroke="#374151" strokeWidth="3" strokeLinejoin="round" />
          <path d="M90 30 L70 20 L50 30" fill="none" stroke="#374151" strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 30 L60 40 L40 40 Z" fill="white" stroke="#374151" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* 2: Pájaro (abajo-izq) */}
      <motion.div
        initial={{ x: -250, opacity: 0, scale: 0.7 }}
        animate={{
          x: 1300,
          y: [80, -80, 60],
          opacity: [0, 1, 1, 0],
          scale: [0.7, 1.2, 0.8, 0.7],
          rotate: [20, -20, 15],
        }}
        transition={{
          x: { duration: 5, ease: 'easeInOut' },
          y: { duration: 5, ease: 'easeInOut' },
          opacity: { duration: 5, ease: 'easeInOut' },
          scale: { duration: 5, ease: 'easeInOut' },
          rotate: { duration: 5, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 1.5,
          delay: 0.5,
        }}
        className="absolute bottom-20 left-0 w-16 h-16 md:w-24 md:h-24 z-11"
      >
        <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
          <ellipse cx="50" cy="25" rx="15" ry="10" fill="white" stroke="#374151" strokeWidth="2" />
          <path d="M35 25 Q50 15 65 25" fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          <path d="M65 25 Q50 35 35 25" fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          <path d="M70 25 L80 20 L70 25" fill="#F9FAFB" />
          <circle cx="60" cy="20" r="3" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 3: Nube (medio) */}
      <motion.div
        initial={{ x: -400, opacity: 0, scale: 0.9 }}
        animate={{
          x: 1600,
          y: [20, -20, 10],
          opacity: [0, 0.9, 0.9, 0],
          scale: [0.9, 1.1, 0.95, 0.9],
          rotate: [1, -1, 0],
        }}
        transition={{
          x: { duration: 9, ease: 'easeInOut' },
          y: { duration: 9, ease: 'easeInOut' },
          opacity: { duration: 9, ease: 'easeInOut' },
          scale: { duration: 9, ease: 'easeInOut' },
          rotate: { duration: 9, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 3,
          delay: 1,
        }}
        className="absolute top-1/2 left-0 w-24 h-24 md:w-32 md:h-32 z-12"
        style={{ transform: 'translateY(-50%)' }}
      >
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
          <circle cx="30" cy="30" r="15" fill="white" stroke="#4B5563" strokeWidth="2" />
          <circle cx="50" cy="25" r="20" fill="white" stroke="#4B5563" strokeWidth="2" />
          <circle cx="70" cy="35" r="18" fill="white" stroke="#4B5563" strokeWidth="2" />
          <circle cx="40" cy="40" r="12" fill="white" stroke="#4B5563" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* 4: Estrella (arriba-der) */}
      <motion.div
        initial={{ x: 300, y: -100, opacity: 0, scale: 0.5 }}
        animate={{
          x: [-200, 200, -100],
          y: [-150, -100, -130],
          opacity: [0, 0.8, 1, 0.8, 0],
          scale: [0.5, 1.3, 0.7, 1.3, 0.5],
          rotate: [0, 180, 360],
        }}
        transition={{
          x: { duration: 6, ease: 'easeInOut' },
          y: { duration: 6, ease: 'easeInOut' },
          opacity: { duration: 6, ease: 'easeInOut' },
          scale: { duration: 6, ease: 'easeInOut' },
          rotate: { duration: 6, ease: 'linear' },
          repeat: Infinity,
          repeatDelay: 2,
          delay: 1.8,
        }}
        className="absolute top-10 right-10 w-14 h-14 md:w-18 md:h-18 z-13"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
          <path d="M50 10 L61 35 L90 35 L65 55 L75 85 L50 70 L25 85 L35 55 L10 35 L39 35 Z" fill="white" stroke="#374151" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* 5: Globo (abajo-izq) */}
      <motion.div
        initial={{ x: 100, y: 300, opacity: 0, scale: 0.6 }}
        animate={{
          x: [-500, -200, -300],
          y: [200, 100, 150],
          opacity: [0, 1, 1, 0],
          scale: [0.6, 1.1, 0.9, 0.6],
          rotate: [5, -5, 0],
        }}
        transition={{
          x: { duration: 8, ease: 'easeOut' },
          y: { duration: 8, ease: 'easeOut' },
          opacity: { duration: 8, ease: 'easeInOut' },
          scale: { duration: 8, ease: 'easeInOut' },
          rotate: { duration: 8, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 2.5,
          delay: 2.2,
        }}
        className="absolute bottom-10 left-10 w-18 h-18 md:w-24 md:h-24 z-14"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="40" r="30" fill="white" stroke="#4B5563" strokeWidth="3" />
          <line x1="50" y1="70" x2="50" y2="90" stroke="#374151" strokeWidth="2" />
          <rect x="45" y="85" width="10" height="8" fill="#F9FAFB" stroke="#374151" strokeWidth="1.5" rx="2" />
        </svg>
      </motion.div>

      {/* 6: Mariposa (medio-izq) */}
      <motion.div
        initial={{ x: -150, opacity: 0, scale: 0.7 }}
        animate={{
          x: 500,
          y: [-40, 40, -30, 20],
          opacity: [0, 1, 1, 0],
          scale: [0.7, 1.2, 0.8, 0.7],
          rotate: [25, -25, 20],
        }}
        transition={{
          x: { duration: 4, ease: 'easeInOut' },
          y: { duration: 4, ease: 'easeInOut' },
          opacity: { duration: 4, ease: 'easeInOut' },
          scale: { duration: 4, ease: 'easeInOut' },
          rotate: { duration: 4, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 1.2,
          delay: 0,
        }}
        className="absolute top-48 left-0 w-12 h-12 md:w-18 md:h-18 z-15"
      >
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-lg" preserveAspectRatio="xMidYMid meet">
          <ellipse cx="50" cy="30" rx="4" ry="15" fill="white" stroke="#374151" strokeWidth="2" />
          <path d="M40 20 Q30 10 20 20" fill="white" stroke="#4B5563" strokeWidth="2" />
          <path d="M60 20 Q70 10 80 20" fill="white" stroke="#4B5563" strokeWidth="2" />
          <path d="M40 40 Q30 50 20 40" fill="white" stroke="#4B5563" strokeWidth="2" />
          <path d="M60 40 Q70 50 80 40" fill="white" stroke="#4B5563" strokeWidth="2" />
          <circle cx="25" cy="20" r="2.5" fill="#E5E7EB" />
          <circle cx="75" cy="20" r="2.5" fill="#E5E7EB" />
        </svg>
      </motion.div>

      {/* 7: Cometa (arriba-der) */}
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.9 }}
        animate={{
          x: -600,
          y: [-30, 30, -20],
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1, 1, 0.9],
          rotate: [-10, 10, 0],
        }}
        transition={{
          x: { duration: 6, ease: 'easeInOut' },
          y: { duration: 6, ease: 'easeInOut' },
          opacity: { duration: 6, ease: 'easeInOut' },
          scale: { duration: 6, ease: 'easeInOut' },
          rotate: { duration: 6, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 2,
          delay: 3,
        }}
        className="absolute top-32 right-0 w-20 h-20 md:w-28 md:h-28 z-16"
      >
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
          <path d="M50 10 L80 30 L50 50 L20 30 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
          <line x1="20" y1="30" x2="0" y2="30" stroke="#4B5563" strokeWidth="3.5" />
          <line x1="0" y1="30" x2="-15" y2="25" stroke="#4B5563" strokeWidth="2" />
          <line x1="0" y1="30" x2="-15" y2="35" stroke="#4B5563" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* 8: Estrella fugaz (arriba-centro) */}
      <motion.div
        initial={{ x: 0, y: -200, opacity: 0, scale: 0.4 }}
        animate={{
          x: [300, 600, 900],
          y: [200, 400, 600],
          opacity: [0, 1, 0.8, 0],
          scale: [0.4, 1.4, 0.5, 0.4],
          rotate: [-60, -120, -180],
        }}
        transition={{
          x: { duration: 5, ease: 'easeIn' },
          y: { duration: 5, ease: 'easeIn' },
          opacity: { duration: 5, ease: 'easeInOut' },
          scale: { duration: 5, ease: 'easeInOut' },
          rotate: { duration: 5, ease: 'easeInOut' },
          repeat: Infinity,
          repeatDelay: 3.5,
          delay: 3.5,
        }}
        className="absolute top-0 left-1/2 w-10 h-10 md:w-14 md:h-14 z-17"
        style={{ transform: 'translateX(-50%) translateY(-50%)' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
          <path d="M50 10 L61 35 L90 35 L65 55 L75 85 L50 70 L25 85 L35 55 L10 35 L39 35 Z" fill="white" stroke="#374151" strokeWidth="2" />
          <rect x="50" y="55" width="3" height="40" fill="white" opacity="0.7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default PaperPlaneHero;