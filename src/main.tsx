import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Para las rutas
import App from './App';  // Importa tu App.tsx
import './index.css';  // Si tenés CSS global

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envuelve para que las rutas funcionen */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);