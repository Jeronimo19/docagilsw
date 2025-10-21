// src/pages/Landing.tsx - Hero unificado con solo animación de fondo (sin separación ni duplicados)
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Plane, Cloud, Star, Sparkles, Bird, Wind } from 'lucide-react';

export default function Landing() {
  const teamMembers = [
    { name: "Abram Ortiz Martínez", initials: "AO" },
    { name: "José Jerónimo Medrano Flores", initials: "JM" },
    { name: "Jesús Abdiel Chapa Cruz", initials: "JC" },
  ];

  const projectSections = [
    {
      id: "1",
      icon: "📋",
      title: "Introducción / Información del Proyecto",
      description:
        "DocFlow automatiza la gestión de documentos internos, eliminando procesos manuales y estableciendo flujos de trabajo estructurados.",
    },
    {
      id: "2",
      icon: "👥",
      title: "Stakeholders / Actores Involucrados",
      description:
        "Usuarios iniciadores, revisores, aprobadores, auditores y administradores con permisos y responsabilidades específicas.",
    },
    {
      id: "3",
      icon: "⚙️",
      title: "Requerimientos Funcionales",
      description:
        "Flujo de 6 etapas: Iniciación, Revisión, Asignación, Aprobación, Auditoría y Finalización con trazabilidad completa.",
    },
    {
      id: "4",
      icon: "🛡️",
      title: "Requerimientos No Funcionales",
      description:
        "Rendimiento < 2s, seguridad robusta, escalabilidad para 1000+ usuarios, 99.9% uptime y usabilidad intuitiva.",
    },
    {
      id: "5",
      icon: "🔍",
      title: "Recolección de Información / Técnicas",
      description:
        "Entrevistas, análisis de procesos, encuestas y workshops colaborativos para identificar necesidades clave.",
    },
    {
      id: "6",
      icon: "📊",
      title: "Clasificación y Priorización",
      description:
        "Requerimientos clasificados por criticidad e impacto, priorizados según viabilidad técnica y dependencias.",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,rgba(2,0,36,1),rgba(37,37,230,1),rgba(0,212,255,1))] relative overflow-hidden">
      {/* Hero Section - Solo animación de fondo, contenido encima sin separación */}
      <section className="relative px-6 py-16 md:py-24 min-h-[80vh]">
        {/* Animated Background Elements - z-0, fondo transparente */}
        {/* Paper Plane */}
        <motion.div
          className="absolute text-white z-0"
          initial={{ x: -100, y: 100, rotate: -45 }}
          animate={{
            x: ["0vw", "50vw", "100vw"],
            y: ["20vh", "40vh", "30vh", "50vh", "10vh"],
            rotate: [-45, -30, -45, -20, -45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Plane size={48} strokeWidth={1.5} />
        </motion.div>

        {/* Cloud 1 */}
        <motion.div
          className="absolute top-20 text-white/80 z-0"
          initial={{ x: -100 }}
          animate={{ x: ["0vw", "100vw"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Cloud size={64} strokeWidth={1} fill="white" />
        </motion.div>

        {/* Cloud 2 */}
        <motion.div
          className="absolute top-40 text-white/60 z-0"
          initial={{ x: -150 }}
          animate={{ x: ["0vw", "100vw"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        >
          <Cloud size={80} strokeWidth={1} fill="white" />
        </motion.div>

        {/* Stars */}
        <motion.div
          className="absolute top-32 left-1/4 text-white z-0"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={32} fill="white" />
        </motion.div>

        <motion.div
          className="absolute top-64 right-1/3 text-white z-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star size={24} fill="white" />
        </motion.div>

        {/* Shooting Star */}
        <motion.div
          className="absolute text-white z-0"
          initial={{ x: "100vw", y: -50, rotate: -45 }}
          animate={{
            x: ["-10vw"],
            y: ["50vh"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeIn",
          }}
        >
          <Sparkles size={32} />
        </motion.div>

        {/* Balloon */}
        <motion.div
          className="absolute bottom-20 left-1/4 text-white z-0"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="20" rx="18" ry="22" fill="white" opacity="0.9" />
            <path d="M20 42 Q18 50, 20 58" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        {/* Butterfly */}
        <motion.div
          className="absolute top-1/3 right-1/4 text-white z-0"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 24 Q18 18, 12 20 Q8 22, 10 28 Q12 32, 18 30 Q22 28, 24 24" fill="white" opacity="0.8" />
            <path d="M24 24 Q30 18, 36 20 Q40 22, 38 28 Q36 32, 30 30 Q26 28, 24 24" fill="white" opacity="0.8" />
            <circle cx="24" cy="24" r="2" fill="white" />
          </svg>
        </motion.div>

        {/* Kite */}
        <motion.div
          className="absolute top-1/4 right-1/3 text-white z-0"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [5, 15, 5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 8 L40 28 L28 40 L16 28 Z" fill="white" opacity="0.85" />
            <line x1="28" y1="40" x2="28" y2="52" stroke="white" strokeWidth="1" />
            <circle cx="28" cy="46" r="2" fill="white" />
            <circle cx="28" cy="50" r="2" fill="white" />
          </svg>
        </motion.div>

        {/* Bird */}
        <motion.div
          className="absolute top-1/2 text-white z-0"
          initial={{ x: "100vw" }}
          animate={{
            x: ["-10vw"],
            y: [0, -20, 10, -15, 0],
          }}
          transition={{
            x: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Bird size={36} strokeWidth={1.5} />
        </motion.div>

        {/* Wind/Breeze Effect */}
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-white/40 z-0"
          animate={{
            x: [0, 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Wind size={48} />
        </motion.div>

        {/* Contenido del Hero - z-20, sin animaciones que causen glitches */}
        <div className="mx-auto max-w-6xl text-center relative z-20">
        <h1
          className="mb-6 font-poppins text-5xl font-bold text-white md:text-6xl lg:text-7xl drop-shadow-lg"
          style={{ 
            WebkitTextStroke: "1px black",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          DocAgil: Flujo de Aprobaciones y Control de Documentos Internos
        </h1>
          <p className="mb-8 text-2xl font-medium text-[#FFFFFF] md:text-3xl">
            Automatiza tus documentos internos y reduce tiempos en 50%
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/registro">
              <Button
                size="lg"
                className="bg-[#10B981] px-10 py-7 text-xl font-semibold text-white shadow-lg transition-all hover:bg-[#0A0480] hover:shadow-xl"
              >
                Registrarse
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-xl font-semibold text-[#3B82F6] border-[#3B82F6] hover:bg-[#10B981] hover:text-white"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#10B981]">Equipo de Desarrollo:</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center gap-3 text-center">
                <Avatar className="h-28 w-28 bg-[#3B82F6] shadow-lg">
                  <AvatarFallback className="text-2xl font-bold text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold text-gray-800">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Index Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-[#10B981]">Índice del Proyecto</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSections.map((section, index) => (
              <Card
                key={section.id}
                className="animate-in fade-in bg-[#3B82F6] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              >
                <CardContent className="p-6">
                  <div className="mb-4 text-5xl">{section.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-[#10B981]">{section.title}</h3>
                  <p className="leading-relaxed text-white">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <Link to="/login">
            <Button
              size="lg"
              className="animate-pulse bg-[#10B981] px-12 py-8 text-2xl font-bold text-white shadow-2xl transition-all hover:scale-110 hover:bg-[#0A0480]"
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Link to="/registro" className="ml-4">
            <Button
              size="lg"
              variant="outline"
              className="px-12 py-8 text-2xl font-bold text-[#3B82F6] border-[#3B82F6] hover:bg-[#10B981] hover:text-white"
            >
              Registrarse
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-bold text-[#10B981]">DocAgil</h3>
          </div>
          <div className="mb-4 flex justify-center gap-6">
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Contacto
            </a>
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Soporte
            </a>
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Documentación
            </a>
          </div>
          <p className="text-center text-gray-600">Desarrollado por el equipo DocFlow</p>
          <p className="mt-2 text-center text-sm text-gray-500">© 2025 DocFlow. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}