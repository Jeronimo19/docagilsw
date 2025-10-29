import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [, setIsSubmitting] = useState(false);
  const [, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    if (email && !email.endsWith("@institucion.edu")) {
      setEmailError("El correo debe ser institucional (@institucion.edu)");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Registration request:", { fullName, email, phone, department, role, acceptTerms });

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setRole("");
      setAcceptTerms(false);
    }, 3000);
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
      {/* Right Side - Register Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#10B981] mb-2">¡Crea tu Cuenta!</h2>
            <p className="text-2xl font-semibold text-[#059669] mb-1">Solicita Acceso</p>
            <p className="text-xl font-medium text-gray-900">Regístrate en DocAgil</p>
          </div>
          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre Completo"
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                required
              />
            </div>
            {/* Email Field */}
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Correo Institucional"
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                required
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>
            {/* Phone Field */}
            <div className="relative">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Número de Teléfono"
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                required
              />
            </div>
            {/* Department Field */}
            <div className="relative">
              <Input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Departamento o Área"
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300"
                required
              />
            </div>
            {/* Role Selector */}
            <div className="relative">
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#10B981] focus:outline-none transition-colors duration-300">
                  <SelectValue placeholder="Rol que solicitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solicitante">Solicitante</SelectItem>
                  <SelectItem value="aprobador">Aprobador</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Terms Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer select-none">
                  Acepto términos
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-4 px-6 text-white font-bold text-lg rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enviar Solicitud
            </Button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-[#10B981] hover:text-[#059669] font-medium transition-colors duration-200"
              >
                Ya tengo cuenta
              </Link>
            </div>
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