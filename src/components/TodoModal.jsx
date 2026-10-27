import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { X } from 'lucide-react';
import { colors } from '../utils/bgCard';

const INITIAL_FORM = {
  title: "",
  description: "",
  date: "",
  priority: "medium",
  cardColor: "blue"
};

const PRIORITIES = ["low", "medium", "high"];

const TodoModal = () => {

  const { isModalOpen, closeTodoModal, editingTask, addTask, updateTask } = useContext( TodoContext );

  const [formData, setFormData] = useState( INITIAL_FORM );

  const handleChange = ( e ) => {
    setFormData( prev => ( {
      ...prev, [e.target.name]: e.target.value
    } ) );
  };


  const handleClose = () => {
    closeTodoModal();
    setFormData( INITIAL_FORM );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();

    if ( !formData.title.trim() ) return;

    if ( editingTask ) {

      updateTask( {
        ...editingTask,
        ...formData
      } );

    } else {
      addTask( formData );
      handleClose();
    }
  };

  useEffect( () => {
    if ( editingTask ) {
      setFormData( {
        title: editingTask.title,
        description: editingTask.description,
        date: editingTask.date,
        priority: editingTask.priority,
        cardColor: editingTask.cardColor,
      } );
    } else {
      setFormData( INITIAL_FORM );
    }
  }, [editingTask] );

  if ( !isModalOpen ) return null;

  return (
    <div
      className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-in fade-in duration-200'
      onClick={ handleClose }>

      <div
        className='bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all animate-none zoom-95 duration-200 border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col'
        onClick={ ( e ) => e.stopPropagation() }>

        <div className='flex justify-between items-center text-xl font-semibold p-6 pb-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-gray-900 dark:text-gray-50'>{ editingTask ? "Edit Task" : "Create New Task" }</h2>
          <button
            className='p-2 rounded-xl hover:bg-slate-100 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90'
            onClick={ handleClose }>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form className='overflow-auto' onSubmit={ handleSubmit }>
          <div className='flex flex-col gap-5 p-6'>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="title" className='text-gray-900 dark:text-gray-50'>Task Title</label>
              <input
                type="text"
                id='title'
                name='title'
                required
                placeholder='Enter task title'
                className='py-2 px-3 rounded-md bg-gray-100 active:outline-2 outline-gray-500'
                value={ formData.title }
                onChange={ handleChange } />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="desc" className='text-gray-900 dark:text-gray-50'>Description</label>
              <input
                type="text"
                id='desc'
                name='description'
                placeholder='Add task description'
                className='py-2 px-3 rounded-md bg-gray-100 active:outline-2 outline-gray-500'
                value={ formData.description }
                onChange={ handleChange } />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="date" className='text-gray-900 dark:text-gray-50'>Due date</label>
              <input
                type="date"
                id='date'
                name='date'
                required
                className='py-2 px-3 rounded-md bg-gray-100 active:outline-2 outline-gray-500'
                value={ formData.date }
                onChange={ handleChange } />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="" className='text-gray-900 dark:text-gray-50'>Priority Level</label>
              <div className='flex gap-1.5'>
                {
                  PRIORITIES.map( ( p ) => {
                    return (
                      <button
                        type='button'
                        key={ p }
                        onClick={ () => setFormData( prev => ( { ...prev, priority: p } ) ) }
                        className={ `flex-1 px-4 py-2.5 rounded-lg capitalize transition-all ${formData.priority === p
                          ? "bg-indigo-500 text-white shadow-md"
                          : "bg-gray-100"
                          }` }>
                        { p }
                      </button>
                    );
                  } )
                }
              </div>
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="" className='text-gray-900 dark:text-gray-50'>Card Color</label>
              <div className='flex justify-between mt-1'>
                {
                  colors.map( ( color ) => {
                    return (
                      <button
                        onClick={ () => setFormData( prev => ( { ...prev, cardColor: color.id } ) ) }
                        key={ color.id }
                        type='button'
                        className={ `w-11 h-11 rounded-full ${color.class} ${formData.cardColor === color.id
                          ? "ring-4 ring-offset-2 ring-indigo-400 dark:ring-indigo-500 scale-110 shadow-lg"
                          : "hover:scale-110 shadow-md"
                          } transition-all active:scale-95` }>

                      </button>
                    );
                  } )
                }
              </div>
            </div>

            <div className='flex gap-2.5 border-t p-6 border-gray-200 dark:border-gray-700'>
              <button
                className='flex-3 bg-indigo-500 text-white shadow-md px-4 py-2.5 rounded-lg transition-all hover:bg-indigo-700'
                type='submit'>
                { editingTask ? "Save Changes" : "Create Task" }
              </button>
              <button
                className='flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-all active:scale-95'
                type='button'
                onClick={ handleClose }
              >
                Cancel
              </button>
            </div>

          </div>
        </form>

      </div>

    </div>
  );
};

export default TodoModal;