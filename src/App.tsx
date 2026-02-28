
import { AuthProvider } from './context/AuthContext';
import AppRoute from './routes/AppRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
