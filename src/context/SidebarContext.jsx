import { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ( { children } ) => {

  const [isOpenSidebar, setIsOpenSidebar] = useState( false );
  const [selectedView, setSelectedView] = useState( "overview" );

  const openSidebar = () => {
    setIsOpenSidebar( true );
  };

  const closeSidebar = () => {
    setIsOpenSidebar( false );
  };

  const sidebarValue = {
    isOpenSidebar,
    openSidebar,
    closeSidebar,
    selectedView,
    setSelectedView
  };

  return (
    <SidebarContext.Provider value={ sidebarValue }>
      { children }
    </SidebarContext.Provider>
  );

};

export default SidebarProvider;