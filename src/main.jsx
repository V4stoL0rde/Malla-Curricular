import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css'; // Importa los estilos de Mantine
import './index.css';
import App from './App.jsx';
import { MantineProvider } from '@mantine/core';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <MantineProvider> {/* Elimina el theme si no lo estás personalizando específicamente */}
      <App />
    </MantineProvider>
  </StrictMode>
);