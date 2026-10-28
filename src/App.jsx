
import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import { useAuth } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TodoModal from './components/TodoModal';
import Toast from './components/ui/Toast';
import Auth from './components/Auth';

const App = () => {
  const { toast, hideToast } = useContext( TodoContext );
  const { user, loading } = useAuth();

  // Attende il controllo della sessione
  if ( loading ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-300">
          Caricamento...
        </p>
      </div>
    );
  }

  // Se non autenticato, mostra il login
  if ( !user ) {
    return <Auth />;
  }

  // Se autenticato, mostra la Todo App
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <div className="h-full">
            <Dashboard />
          </div>
        </main>

        <TodoModal />
      </div>

      { toast && (
        <Toast
          message={ toast.message }
          type={ toast.type }
          onClose={ hideToast }
        />
      ) }
    </div>
  );
};

export default App;
