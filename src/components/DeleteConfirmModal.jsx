import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ( { task, onCancel, onConfirm } ) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={ onCancel }
    >
      <div
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        onClick={ ( e ) => e.stopPropagation() }
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/10">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete task?
            </h2>
          </div>

          <button
            type="button"
            onClick={ onCancel }
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{ ' ' }
          <span className="font-medium text-gray-800 dark:text-gray-200">
            "{ task.title }"
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={ onCancel }
            className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={ onConfirm }
            className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;