import Root from './Root';
import AuthPage from './components/1_auth/AuthPage';
import NotFound from './components/1_auth/NotFound';
import NewCredentials from './components/1_auth/NewCredentials';
import Tasks from './components/4_tasks/Tasks';
import Loader from './components/6_utils/loader/Loader';
import { useAuth } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>

        <Route path='/new-credentials' element={<NewCredentials />} />

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
