
import { Menu, Moon, Sun, LogOut, UserRound } from 'lucide-react';
import { useContext, useState } from 'react';

import Searchbox from './ui/Searchbox';
import { ThemeContext } from '../context/ThemeContext';
import { SidebarContext } from '../context/SidebarContext';
import { TodoContext } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext( ThemeContext );
  const { openSidebar } = useContext( SidebarContext );
  const { searchQuery, setSearchQuery } = useContext( TodoContext );
  const { user, signOut } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState( false );
  const [logoutError, setLogoutError] = useState( '' );

  const handleLogout = async () => {
    setIsLoggingOut( true );
    setLogoutError( '' );

    try {
      await signOut();
    } catch ( error ) {
      console.error( 'Errore durante il logout:', error );
      setLogoutError( 'Impossibile uscire. Riprova.' );
    } finally {
      setIsLoggingOut( false );
    }
  };

  const email = user?.email ?? '';
  const initial = email ? email.charAt( 0 ).toUpperCase() : 'U';

  return (
    <div className="relative flex items-center justify-between gap-2 border-b border-gray-200 bg-white/90 p-4 shadow-sm dark:border-gray-600 dark:bg-gray-900/90">
      <button
        aria-label="Apri menu"
        onClick={ openSidebar }
        className="rounded-xl p-2.5 text-gray-700 transition-all hover:bg-gray-100 active:scale-90 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <Searchbox query={ searchQuery } onSearch={ setSearchQuery } />
      </div>

      <div className="flex shrink-0 items-center gap-1 md:gap-2">
        <button
          aria-label={ darkMode ? 'Attiva tema chiaro' : 'Attiva tema scuro' }
          onClick={ () => setDarkMode( ( prev ) => !prev ) }
          className="rounded-xl p-2.5 text-gray-700 transition-all hover:bg-gray-100 active:scale-90 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          { darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          ) }
        </button>

        <div className="group relative ml-1">
          <button
            type="button"
            aria-label="Profilo utente"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            { initial }
          </button>

          <div className="invisible absolute right-0 top-full z-50 w-64 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start gap-3 border-b border-gray-100 pb-3 dark:border-gray-700">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Il tuo account
                  </p>
                  <p className="break-all text-xs text-gray-500 dark:text-gray-400">
                    { email }
                  </p>
                </div>
              </div>

              { logoutError && (
                <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
                  { logoutError }
                </p>
              ) }

              <button
                type="button"
                onClick={ handleLogout }
                disabled={ isLoggingOut }
                className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut className="h-4 w-4" />
                { isLoggingOut ? 'Uscita in corso...' : 'Esci dall’account' }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
