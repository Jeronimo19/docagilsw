// src/pages/Register.tsx - Fixado
import { useState } from 'react';  // ← Solo hooks si los usás (valor, no tipo)
import { Link, useNavigate } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';  // ← ¡ÉSTE ES EL FIX! Type-only import para los eventos

export default function Registro() {  // O 'Register' si lo cambiaste
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {  // ← Ahora tipado bien
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {  // ← Ahora tipado bien
    e.preventDefault();
    // Lógica de registro (e.g., API)
    console.log('Registro:', formData);
    navigate('/login');  // Redirige a login después
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#10B981]">Registro Gratis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#10B981] text-white py-3 rounded-md font-semibold hover:bg-[#3B82F6] transition-all"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-[#3B82F6] font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}