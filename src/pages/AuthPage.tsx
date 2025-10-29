import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "register">(
    (searchParams.get("tab") as "login" | "register") || "login"
  );
  const navigate = useNavigate();

  // Estados compartidos/comunes
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Login states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const [remember, setRemember] = useState(false);

  // Register states
  const [currentStep, setCurrentStep] = useState(1);  // Paso actual (1 o 2)
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Validaciones
  const validateEmail = (email: string) => {
    if (email && !email.endsWith("@instituto.edu.mx")) {
      setEmailError("El correo debe ser institucional (@instituto.edu.mx)");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleRegisterEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegisterEmail(value);
    validateEmail(value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value && password !== value) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  // Avanzar paso en register
  const nextStep = () => {
    if (currentStep === 1) {
      if (!fullName || !registerEmail || !phone || !department) {
        alert("Completa todos los campos del paso 1");
        return;
      }
      if (!validateEmail(registerEmail)) return;
      setCurrentStep(2);
    }
  };

  // Retroceder paso
  const prevStep = () => {
    setCurrentStep(1);
  };

  const getRoleFromUsername = (username: string) => {
    const lowerUsername = username.toLowerCase();
    if (lowerUsername.includes("solicitante")) return "solicitante";
    if (lowerUsername.includes("aprobador")) return "aprobador";
    if (lowerUsername.includes("auditor")) return "auditor";
    if (lowerUsername.includes("admin")) return "admin";
    return "solicitante";
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
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
    localStorage.setItem("token", "ok");
    const detectedRole = getRoleFromUsername(loginUsername);
    console.log("Entrando como:", detectedRole, "con usuario:", loginUsername);
    switch (detectedRole) {
      case "solicitante": navigate("/solicitante"); break;
      case "aprobador": navigate("/aprobador"); break;
      case "auditor": navigate("/auditor"); break;
      case "admin": navigate("/administrador"); break;
      default: navigate("/solicitante");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    if (!acceptTerms) {
      alert("Acepta los términos");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Registration request:", { fullName, registerEmail, phone, department, role, acceptTerms });
    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentStep(1);  // Reset a paso 1
    setTimeout(() => {
      setIsSuccess(false);
      // Reset form
      setFullName(""); setRegisterEmail(""); setPhone(""); setDepartment(""); setRole("");
      setPassword(""); setConfirmPassword(""); setAcceptTerms(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado Izquierdo: Gradiente azul celeste-gris */}
      <div className="relative lg:w-1/2 bg-gradient-to-br from-sky-500 to-slate-100 p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-32 w-80 h-80 bg-sky-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-slate-300/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
          <svg className="absolute bottom-0 left-0 w-full h-auto opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="white" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">DocAgil</h1>
            <p className="text-xl lg:text-2xl text-white/90 text-pretty">Sistema de Gestión de Documentos Internos</p>
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/80 text-sm">www.docagil.com</p>
        </div>
      </div>

      {/* Lado Derecho: Gris claro */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-sky-100/50 border border-slate-200 p-8 lg:p-12">  {/* ← SOMBRA MEJORADA: shadow-xl con tint celeste */}
          {/* Greeting */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {activeTab === "login" ? "¡Hola!" : "¡Crea tu Cuenta!"}
            </h2>
            <p className="text-2xl font-semibold text-slate-700 mb-1">
              {activeTab === "login" ? "Bienvenido" : "Solicita Acceso"}
            </p>
            <p className="text-xl font-medium text-slate-600">
              {activeTab === "login" ? "Inicia Sesión en tu Cuenta" : "Regístrate en DocAgil"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 bg-slate-100 p-1 rounded-xl">
            <Button
              type="button"
              variant={activeTab === "login" ? "default" : "ghost"}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-sky-500 text-white shadow-lg hover:bg-sky-600"
                  : "text-sky-500 hover:bg-slate-200 border border-sky-200"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Iniciar Sesión
            </Button>
            <Button
              type="button"
              variant={activeTab === "register" ? "default" : "ghost"}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-sky-500 text-white shadow-lg hover:bg-sky-600"
                  : "text-sky-500 hover:bg-slate-200 border border-sky-200"
              }`}
              onClick={() => {
                setActiveTab("register");
                setCurrentStep(1);
              }}
            >
              Crear Cuenta
            </Button>
          </div>

          {/* Contenedor de Forms */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: activeTab === "login" ? "translateX(0)" : "translateX(-100%)" }}
            >
              {/* Login Form */}
              <div className="w-full flex-shrink-0">
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {!showMfa ? (
                    <>
                      <div className="relative">
                        <Input
                          type="text"
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          placeholder="Nombre de Usuario (ej: solicitante)"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                        />
                        <p className="text-xs text-slate-500 italic mt-1">Rol detectado por nombre (ej: solicitante → Solicitante)</p>
                      </div>
                      <div className="relative">
                        <Input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Contraseña"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="mfa" checked={mfaEnabled} onCheckedChange={(checked) => setMfaEnabled(checked as boolean)} />
                          <label htmlFor="mfa" className="text-sm text-slate-700 cursor-pointer select-none">Habilitar MFA</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" checked={remember} onCheckedChange={(checked) => setRemember(checked as boolean)} />
                          <label htmlFor="remember" className="text-sm text-slate-700 cursor-pointer select-none">Recordarme</label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-xl bg-gradient-to-br from-sky-50 to-slate-50 p-6 text-center shadow-inner border border-slate-200">
                        <div className="mx-auto mb-3 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-sky-500 shadow-lg">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <p className="font-semibold text-sky-700">Código de Verificación Enviado</p>
                        <p className="mt-1 text-sm text-slate-600">Revisa tu correo</p>
                      </div>
                      <Input
                        type="text"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Código MFA (6 dígitos)"
                        className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300 text-center text-3xl font-bold tracking-[0.5em]"
                        maxLength={6}
                        required
                      />
                      <Button type="button" variant="outline" className="w-full py-4 px-6 text-slate-900 font-bold text-lg rounded-full border-2 border-slate-300 hover:border-sky-500 hover:text-sky-500 transition-all duration-300" onClick={() => setShowMfa(false)}>
                        Volver
                      </Button>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full py-4 px-6 text-white font-bold text-lg rounded-full bg-sky-500 hover:bg-sky-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {showMfa ? "✓ Verificar e Iniciar Sesión" : "Iniciar Sesión"}
                  </Button>
                  <div className="flex flex-col items-center gap-3 text-sm">
                    <Link to="/recuperar" className="font-semibold text-sky-500 hover:text-sky-600 transition-all hover:underline hover:underline-offset-4">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </form>
              </div>

              {/* Register Form: Multi-step */}
              <div className="w-full flex-shrink-0">
                {isSuccess && (
                  <div className="absolute inset-0 bg-sky-500 rounded-xl flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 animate-in zoom-in duration-500">
                        <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">¡Solicitud Enviada!</h3>
                      <p className="text-sm text-white/90">Tu solicitud ha sido recibida</p>
                    </div>
                  </div>
                )}
                {/* Indicador de pasos */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    <div className={`w-8 h-2 rounded-full ${currentStep === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
                    <div className={`w-8 h-2 rounded-full ${currentStep === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
                  </div>
                </div>
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <>
                      <div className="relative">
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Nombre Completo"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="email"
                          value={registerEmail}
                          onChange={handleRegisterEmailChange}
                          placeholder="Correo Institucional"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                        {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                      </div>
                      <div className="relative">
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Número de Teléfono"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="Departamento o Área"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full py-4 px-6 text-white font-bold text-lg rounded-full bg-sky-500 hover:bg-sky-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Siguiente
                      </Button>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <div className="relative">
                        <Select value={role} onValueChange={setRole} disabled={isSubmitting}>
                          <SelectTrigger className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300">
                            <SelectValue placeholder="Rol que solicitas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solicitante">Solicitante</SelectItem>
                            <SelectItem value="aprobador">Aprobador</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-slate-500 mt-1">El rol Administrador es asignado por el sistema</p>
                      </div>
                      <div className="relative">
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          placeholder="Confirmar Contraseña"
                          className="w-full px-0 py-3 text-slate-900 placeholder-slate-400 bg-transparent border-0 border-b-2 border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                        {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} disabled={isSubmitting} />
                        <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer select-none">
                          Acepto términos
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1 py-4 px-6 text-sky-500 font-bold text-lg rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
                        >
                          Atrás
                        </Button>
                        <Button
                          type="submit"
                          disabled={!acceptTerms || isSubmitting}
                          className="flex-1 py-4 px-6 text-white font-bold text-lg rounded-full bg-sky-500 hover:bg-sky-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-xs text-slate-500">
              Desarrollado por Abram Ortiz Martínez, José Jerónimo Medrano Flores, Jesús Abdiel Chapa Cruz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}