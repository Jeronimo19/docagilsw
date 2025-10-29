import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';  // ← Importa Landing pa' usarlo en /
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';  // ← Nueva: AuthPage combinada (login + register con tabs)
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
      <Route path="/" element={<Landing />} />  {/* ← ¡ÉSTE! Landing como homepage principal */}
      <Route path="/auth" element={<AuthPage />} />  {/* ← Nueva: AuthPage (login + register en tabs) */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/auth?tab=login" replace />  // ← Protegido: redirige a auth (login por default)
        }
      />
      {/* Rutas de roles protegidas – agregadas dentro de <Routes> pa' que funcionen */}
      <Route path="/solicitante" element={isLoggedIn ? <SolicitantePanel /> : <Navigate to="/auth?tab=login" replace />} />
      <Route path="/aprobador" element={isLoggedIn ? <AprobadorPanel /> : <Navigate to="/auth?tab=login" replace />} />
      <Route path="/auditor" element={isLoggedIn ? <AuditorPanel /> : <Navigate to="/auth?tab=login" replace />} />
      <Route path="/administrador" element={isLoggedIn ? <AdministradorPanel /> : <Navigate to="/auth?tab=login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />  {/* Fallback a Landing, no a * */}
      <Route path="/cuenta" element={isLoggedIn ? <MiCuenta /> : <Navigate to="/auth?tab=login" replace />} />
    </Routes>
  );
}

export default App;