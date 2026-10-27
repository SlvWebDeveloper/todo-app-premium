import SidebarProvider from './SidebarContext';
import ThemeProvider from './ThemeContext';
import TodoProvider from './TodoContext';


export const Providers = ( { children } ) => {
  return (
    <TodoProvider>
      <SidebarProvider>
        <ThemeProvider>
          { children }
        </ThemeProvider>
      </SidebarProvider>
    </TodoProvider>
  );
};