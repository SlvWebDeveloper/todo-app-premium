import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext( null );

export const AuthProvider = ( { children } ) => {
  const [session, setSession] = useState( null );
  const [loading, setLoading] = useState( true );

  useEffect( () => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if ( !mounted ) return;

      if ( error ) {
        console.error( 'Errore nel recupero della sessione:', error );
      }

      setSession( data?.session ?? null );
      setLoading( false );
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange( ( _event, session ) => {
      setSession( session );
      setLoading( false );
    } );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [] );

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if ( error ) throw error;
  };

  return (
    <AuthContext.Provider
      value={ {
        session,
        user: session?.user ?? null,
        loading,
        signOut,
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext( AuthContext );

  if ( !context ) {
    throw new Error( 'useAuth deve essere usato dentro AuthProvider' );
  }

  return context;
};
