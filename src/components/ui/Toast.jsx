import React, { useEffect } from 'react';
import { CheckCircle2, X, XCircle } from 'lucide-react';

const Toast = ( { message, type = 'success', onClose } ) => {
  const isSuccess = type === 'success';

  useEffect( () => {
    const timer = setTimeout( () => {
      onClose();
    }, 3000 );

    return () => clearTimeout( timer );
  }, [onClose, message] );

  return (
    <div
      className={ `fixed top-5 right-5 z-50 flex w-full max-w-sm items-center gap-3 rounded-xl border p-4 shadow-xl ${isSuccess
        ? 'border-green-200 bg-white text-green-600 dark:border-green-500/20 dark:bg-gray-800'
        : 'border-red-200 bg-white text-red-600 dark:border-red-500/20 dark:bg-gray-800'
        } ` }
    >
      { isSuccess ? (
        <CheckCircle2 className="h-5 w-5 shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 shrink-0" />
      ) }

      <p className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        { message }
      </p>

      <button
        type="button"
        onClick={ onClose }
        aria-label="Close notification"
        className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;;