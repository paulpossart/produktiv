import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Root from './Root';
import AuthPage from './components/1_auth/AuthPage';
import Tasks from './components/4_tasks/tasks';
import { useAuth } from './context/AuthContext';

import './app.module.scss';


function App() {
  const {user} = useAuth();

  console.log(user)

  return (
    <Router>
      <Routes>

        <Route path='/auth'
          element={
            !user ? <AuthPage /> : <Navigate to='/' />
          }
        />

        <Route
          element={
            user ? <Root /> : <Navigate to='/auth' />
          }
        >
          <Route path='/' element={<Tasks />} />
          <Route index element={<Tasks />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
