import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import App from './App.jsx';
import './main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
