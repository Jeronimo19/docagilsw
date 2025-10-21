import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // Para las rutas
import App from './App';  // Importa tu App.tsx
import './index.css';  // Si tenés CSS global
import './styles/globals.css';  // Agrega esta línea si no está

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);