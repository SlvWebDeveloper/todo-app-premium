import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TodoModal from './components/TodoModal';
import Toast from './components/ui/Toast';
import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';

const App = () => {

  const { toast, hideToast } = useContext( TodoContext );

  return (
    <div className='flex h-screen'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar />

        <main className='flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950'>
          <div className='h-full'>
            <Dashboard />
          </div>
        </main>

        <TodoModal />

      </div>
      { toast &&
        <Toast
          message={ toast.message }
          type={ toast.type }
          onClose={ hideToast }
        />
      }
    </div>
  );
};

export default App;