import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fontsource/montserrat/400.css";      // Regular
import "@fontsource/montserrat/700.css";      // Bold
import "@fontsource/montserrat/400-italic.css"; // Italic
import './index.css';
import App from './App.tsx';
import "./typografy.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
