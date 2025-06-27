import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import Home from './components/home/Home';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  useEffect(()=>{
    document.body.className = 'light';
  }, [])

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
