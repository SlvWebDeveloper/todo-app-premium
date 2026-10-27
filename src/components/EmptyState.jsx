
import React, { useContext } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { TodoContext } from '../context/TodoContext';

const EmptyState = ( {
  icon,
  title,
  description,
  action,
  onAction,
  actionLabel,
} ) => {
  const { openTodoModal } = useContext( TodoContext );

  const Icon = icon;

  const handleAction = onAction || openTodoModal;
  const label = actionLabel || 'Add Task';

  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        { title }
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        { description }
      </p>

      { action && (
        <button
          type="button"
          onClick={ handleAction }
          className="mt-6 flex items-center gap-1.5 rounded-xl bg-indigo-500 px-7 py-3 font-medium text-white shadow-xl shadow-indigo-500/20 transition-all duration-200 hover:bg-indigo-600 active:scale-95"
        >
          { onAction ? (
            <RotateCcw className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          ) }
          { label }
        </button>
      ) }
    </div>
  );
};

export default EmptyState;
