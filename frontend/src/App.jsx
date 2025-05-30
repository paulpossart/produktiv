import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Root from './Root';
import AuthPage from './components/1_auth/AuthPage';
import NotFound from './components/1_auth/NotFound';
import NewCreds from './components/1_auth/NewCreds';
import Tasks from './components/4_tasks/Tasks';
import Account from './components/5_users/Account';
import Loader from './components/6_utils/loader/Loader';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>

        <Route path='/new-credentials' element={<NewCreds />} />

        <Route
          path='/auth'
          element={!user ? <AuthPage /> : <Navigate to='/' />}
        />

        <Route
          path='/'
          element={user ? <Root /> : <Navigate to='/auth' />}
        >

          <Route index element={<Tasks />} />

        </Route>


        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App
