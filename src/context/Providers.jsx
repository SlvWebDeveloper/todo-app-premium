import { AuthProvider } from './AuthContext';
import SidebarProvider from './SidebarContext';
import ThemeProvider from './ThemeContext';
import TodoProvider from './TodoContext';


export const Providers = ( { children } ) => {
  return (
    <AuthProvider>
      <TodoProvider>
        <SidebarProvider>
          <ThemeProvider>
            { children }
          </ThemeProvider>
        </SidebarProvider>
      </TodoProvider>
    </AuthProvider>
  );
};