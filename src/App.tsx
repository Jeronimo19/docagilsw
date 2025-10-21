import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';  // ← Importa Landing pa' usarlo en /
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Register';
import SolicitantePanel from './components/roles/SolicitantePanel';
import AprobadorPanel from './components/roles/AprobadorPanel';
import AuditorPanel from './components/roles/AuditorPanel';
import AdministradorPanel from './components/roles/AdministradorPanel';
import MiCuenta from './pages/profile/MiCuenta';

// Hook básico de auth (usa localStorage pa' ejemplo – expándelo con tu API después)
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('token') !== null;  // Ej: después de login, set 'token'
  return { isLoggedIn };
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing /> } />  {/* ← ¡ÉSTE! Landing como homepage principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />  // ← Protegido: redirige a login si no estás logueado
        }
      />
      {/* Rutas de roles protegidas – agregadas dentro de <Routes> pa' que funcionen */}
      <Route path="/solicitante" element={isLoggedIn ? <SolicitantePanel /> : <Navigate to="/login" replace />} />
      <Route path="/aprobador" element={isLoggedIn ? <AprobadorPanel /> : <Navigate to="/login" replace />} />
      <Route path="/auditor" element={isLoggedIn ? <AuditorPanel /> : <Navigate to="/login" replace />} />
      <Route path="/administrador" element={isLoggedIn ? <AdministradorPanel /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />  {/* Fallback a Landing, no a * */}
      <Route path="/cuenta" element={isLoggedIn ? <MiCuenta /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;