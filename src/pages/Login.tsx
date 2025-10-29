import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const navigate = useNavigate();

  const getRoleFromUsername = (username: string) => {
    const lowerUsername = username.toLowerCase();
    if (lowerUsername.includes("solicitante")) return "solicitante";
    if (lowerUsername.includes("aprobador")) return "aprobador";
    if (lowerUsername.includes("auditor")) return "auditor";
    if (lowerUsername.includes("admin")) return "admin";
    return "solicitante"; // Default
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (mfaEnabled && !showMfa) {
      setShowMfa(true);
      return;
    }

    if (mfaEnabled && showMfa) {
      if (mfaCode.length !== 6) {
        alert("Código MFA inválido");
        return;
      }
    }

    // Simulación fácil – set token y navega por rol detectado del username
    localStorage.setItem('token', 'ok');  // Token simple pa' auth
    const detectedRole = getRoleFromUsername(username);
    console.log('Entrando como:', detectedRole, 'con usuario:', username);  // Debug en consola

    // Redirige según rol detectado
    switch (detectedRole) {
      case "solicitante":
        navigate("/solicitante");
        break;
      case "aprobador":
        navigate("/aprobador");
        break;
      case "auditor":
        navigate("/auditor");
        break;
      case "admin":
        navigate("/administrador");
        break;
      default:
        navigate("/solicitante");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Gradient Background with Decorative Elements */}
      <div className="relative lg:w-1/2 bg-gradient-to-br from-[#10B981] to-[#059669] p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Decorative curved shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-32 w-80 h-80 bg-green-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-300/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
          {/* Curved decorative elements */}
          <svg
            className="absolute bottom-0 left-0 w-full h-auto opacity-20"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              fillOpacity="0.3"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">DocAgil</h1>
            <p className="text-xl lg:text-2xl text-white/90 text-pretty">Sistema de Gestión de Documentos Internos</p>
          </div>
        </div>
        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/80 text-sm">www.docagil.com</p>
        </div>
      </div>
      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#10B981] mb-2">¡Hola!</h2>
            <p className="text-2xl font-semibold text-[#059669] mb-1">Bienvenido</p>
            <p className="text-xl font-medium text-gray-900">Inicia Sesión en tu Cuenta</p>
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {!showMfa ? (
              <>
                {/* Username Field (sin @) */}
                <div className="relative">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nombre de Usuario (ej: solicitante)"
                    className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                    required
                  />
                  <p className="text-xs text-gray-500 italic mt-1">
                    Rol se detecta automáticamente por el nombre (ej: solicitante → Solicitante)
                  </p>
                </div>
                {/* Password Field */}
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
                {/* MFA Checkbox */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mfa"
                      checked={mfaEnabled}
                      onCheckedChange={(checked) => setMfaEnabled(checked as boolean)}
                    />
                    <label htmlFor="mfa" className="text-sm text-gray-700 cursor-pointer select-none">
                      Habilitar MFA
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center shadow-inner">
                  <div className="mx-auto mb-3 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#10B981] shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold text-[#10B981]">Código de Verificación Enviado</p>
                  <p className="mt-1 text-sm text-green-700">Revisa tu correo electrónico</p>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Código MFA (6 dígitos)"
                    className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300 text-center text-3xl font-bold tracking-[0.5em]"
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-4 px-6 text-gray-900 font-bold text-lg rounded-full border-2 border-gray-300 hover:border-[#10B981] hover:text-[#10B981] transition-all duration-300"
                  onClick={() => setShowMfa(false)}
                >
                  Volver
                </Button>
              </div>
            )}
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-4 px-6 text-white font-bold text-lg rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showMfa ? "✓ Verificar e Iniciar Sesión" : "Iniciar Sesión"}
            </Button>
            {!showMfa && (
              <div className="flex flex-col items-center gap-3 text-sm">
                <Link
                  to="/recuperar"
                  className="font-semibold text-[#10B981] transition-all hover:text-[#059669] hover:underline hover:underline-offset-4"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
                <Link
                  to="/registro"
                  className="font-semibold text-[#10B981] transition-all hover:text-[#059669] hover:underline hover:underline-offset-4"
                >
                  Registrarse (Solicitar cuenta) →
                </Link>
              </div>
            )}
          </form>
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-xs text-gray-500">
              Desarrollado por Abram Ortiz Martínez, José Jerónimo Medrano Flores, Jesús Abdiel Chapa Cruz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}