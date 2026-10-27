import { Menu, Moon, Sun } from 'lucide-react';
import React, { useContext } from 'react';
import Searchbox from './ui/Searchbox';
import { ThemeContext } from '../context/ThemeContext';
import { SidebarContext } from '../context/SidebarContext';
import { TodoContext } from '../context/TodoContext';

const Navbar = () => {

  const { darkMode, setDarkMode } = useContext( ThemeContext );
  const { openSidebar } = useContext( SidebarContext );
  const { searchQuery, setSearchQuery } = useContext( TodoContext );


  return (
    <div className='p-4 border-b bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600 shadow-sm flex justify-between items-center'>

      <button
        aria-label='Open Sidebar'
        onClick={ () => openSidebar() }
        className='lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all active:scale-90'>
        <Menu className='w-5 h-5' />
      </button>

      <div className='w-full'>
        <Searchbox query={ searchQuery } onSearch={ setSearchQuery } />
      </div>

      {/* Switch light/dark mode + icon profile */ }
      <div className='flex items-center gap-1 md:gap-2'>
        <button
          aria-label='Set dark mode'
          onClick={ () => setDarkMode( prev => !prev ) }
          className='flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all active:scale-90 p-2.5 rounded-xl'
        >
          {
            darkMode ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )
          }
        </button>

        {/* profile icon */ }
        <div className='w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex justify-center items-center cursor-pointer hover:scale-105 transition-transform ml-2 shadow-lg active:scale-95'>
          <span className='text-white font-semibold'>S</span>
        </div>
      </div>


    </div>
  );
};

export default Navbar;