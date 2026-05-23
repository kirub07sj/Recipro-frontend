
import { AuthProvider } from './context/AuthContext';
import AppRoute from './routes/AppRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
