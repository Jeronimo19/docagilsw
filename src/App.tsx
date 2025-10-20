import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Register';  // Línea 5: Asegúrate de que el archivo exista

// Hook simple de auth (usa localStorage para ejemplo)
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('token') !== null;  // Ejemplo básico, expándelo con tu API
  return { isLoggedIn };
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />  // Línea ~23: Fix syntax - paréntesis claros + 'replace' para clean URL
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />  {/* Fallback a Landing */}
    </Routes>
  );
}

export default App;