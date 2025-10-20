import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';  // ← Importa Landing pa' usarlo en /
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Register';

// Hook básico de auth (usa localStorage pa' ejemplo – expándelo con tu API después)
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('token') !== null;  // Ej: después de login, set 'token'
  return { isLoggedIn };
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />  {/* ← ¡ÉSTE! Landing como homepage principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />  // ← Protegido: redirige a login si no estás logueado
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />  {/* Fallback a Landing, no a * */}
    </Routes>
  );
}

export default App;