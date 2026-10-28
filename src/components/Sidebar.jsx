import React, { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import { image, sidebarItems } from '../assets/data';
import { User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {

  const { isOpenSidebar, closeSidebar, selectedView, setSelectedView } = useContext( SidebarContext );

  const { user } = useAuth();

  return (
    <>
      <div className={ `${isOpenSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 lg:w-80 bg-white dark:bg-gray-900/90 border-r border-gray-200 dark:border-gray-600 flex flex-col transition-transform duration-300 h-screen` }>

        {/* logo */ }
        <div className='flex justify-between lg:justify-center border-b border-gray-200 dark:border-gray-600 px-3'>
          <img src={ image.logo } alt="logo" className='w-25 lg:w-30' />
          <button
            onClick={ closeSidebar }
            className='lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* sidebar item */ }
        <div className='flex flex-col gap-1.5 py-5 px-3 border-b border-gray-200 dark:border-gray-600'>
          {
            sidebarItems.map( ( item ) => {
              return (
                <button
                  key={ item.id }
                  onClick={ () => setSelectedView( item.id ) }
                  className={ `w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-95 ${selectedView === item.id
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    } ` }
                >
                  <div className='flex items-center gap-3'>
                    <item.icon className='w-5 h-5' />
                    <span className='font-medium'>{ item.name }</span>
                  </div>
                </button>
              );
            } )
          }
        </div>

        {/* user section */ }

        {/* user section */ }
        <div className="flex items-center gap-2.5 border-t border-gray-200 px-3 py-5 dark:border-gray-600">
          <div className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              { user?.user_metadata?.full_name || user?.email?.split( '@' )[0] || 'Utente' }
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              { user?.email || '' }
            </p>
          </div>
        </div>


      </div>

      {
        isOpenSidebar && (
          <div
            className='fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm'
            onClick={ closeSidebar }
          ></div>
        )
      }
    </>
  );
};

export default Sidebar;