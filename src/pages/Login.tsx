import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí va tu lógica de login (e.g., API call)
    console.log('Login:', { email, password });
    navigate('/dashboard');  // Redirige al dashboard si OK
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#3B82F6]">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#3B82F6] text-white py-3 rounded-md font-semibold hover:bg-[#10B981] transition-all"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes cuenta? <Link to="/registro" className="text-[#3B82F6] font-semibold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}