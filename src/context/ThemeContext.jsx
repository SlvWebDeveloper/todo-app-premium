import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ( { children } ) => {

  const [darkMode, setDarkMode] = useState( false );

  useEffect( () => {
    const root = document.documentElement;

    if ( darkMode ) {
      root.classList.add( "dark" );
    } else {
      root.classList.remove( "dark" );
    }
  }, [darkMode] );

  const themeValue = {
    darkMode,
    setDarkMode
  };

  return (
    <ThemeContext.Provider value={ themeValue }>
      { children }
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;