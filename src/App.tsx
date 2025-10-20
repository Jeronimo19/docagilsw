// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';    // Línea 3: Path correcto
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';        // Línea 5: Path correcto (cambia de '../' a './')
import Registro from './pages/Register';  // ← NUEVO: Import para Registro

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />  // Línea 13: Ahora resuelto
      <Route path="*" element={<Landing />} />  {/* Fallback */}
    </Routes>
  );
}

export default App;