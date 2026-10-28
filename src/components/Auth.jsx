import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState( false );
  const [email, setEmail] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [loading, setLoading] = useState( false );
  const [message, setMessage] = useState( '' );
  const [errorMessage, setErrorMessage] = useState( '' );

  const handleSubmit = async ( event ) => {
    event.preventDefault();

    setLoading( true );
    setMessage( '' );
    setErrorMessage( '' );

    try {
      if ( isRegistering ) {
        const { data, error } = await supabase.auth.signUp( {
          email,
          password,
        } );

        if ( error ) throw error;

        if ( data.session ) {
          setMessage( 'Registrazione completata!' );
        } else {
          setMessage(
            'Registrazione ricevuta. Controlla la tua email per confermare l’account.'
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword( {
          email,
          password,
        } );

        if ( error ) throw error;

        setMessage( 'Accesso effettuato!' );
      }
    } catch ( error ) {
      setErrorMessage( error.message || 'Si è verificato un errore.' );
    } finally {
      setLoading( false );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Todo App Premium
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          { isRegistering
            ? 'Crea il tuo account per iniziare.'
            : 'Accedi per gestire le tue attività.' }
        </p>

        <form onSubmit={ handleSubmit } className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={ email }
              onChange={ ( event ) => setEmail( event.target.value ) }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete={
                isRegistering ? 'new-password' : 'current-password'
              }
              minLength={ 6 }
              required
              value={ password }
              onChange={ ( event ) => setPassword( event.target.value ) }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          { errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              { errorMessage }
            </p>
          ) }

          { message && (
            <p role="status" className="text-sm text-green-600">
              { message }
            </p>
          ) }

          <button
            type="submit"
            disabled={ loading }
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            { loading
              ? 'Attendi...'
              : isRegistering
                ? 'Crea account'
                : 'Accedi' }
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          { isRegistering
            ? 'Hai già un account?'
            : 'Non hai ancora un account?' }{ ' ' }
          <button
            type="button"
            onClick={ () => {
              setIsRegistering( ( current ) => !current );
              setMessage( '' );
              setErrorMessage( '' );
            } }
            className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            { isRegistering ? 'Accedi' : 'Registrati' }
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
