import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import { UserMsgProvider } from './context/UserMsgContext.jsx';
import './main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <UserMsgProvider>
            <App />
          </UserMsgProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
