import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Home from './components/layout/Home';
import Loader from './components/utils/loader/Loader';


function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={
          user ? <Home /> : <Navigate to='/auth' />
        } />

        <Route path='/auth' element={
          !user ? <AuthPage /> : <Navigate to='/' />
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
