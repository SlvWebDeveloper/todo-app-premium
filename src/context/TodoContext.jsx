import { createContext, useEffect, useState } from 'react';
import { fakeTasks } from '../assets/data';
import { isToday } from '../utils/isToday';

export const TodoContext = createContext();

const TodoProvider = ( { children } ) => {

  const [tasks, setTasks] = useState( () => {
    const savedTasks = localStorage.getItem( "tasks" );

    if ( savedTasks ) {
      return JSON.parse( savedTasks );
    } else {
      return fakeTasks;
    }
  } );

  useEffect( () => {
    localStorage.setItem( "tasks", JSON.stringify( tasks ) );
  }, [tasks] );



  const [isModalOpen, setIsModalOpen] = useState( false );
  const [editingTask, setEditingTask] = useState( null );
  const [searchQuery, setSearchQuery] = useState( "" );
  const [toast, setToast] = useState( null );


  // function to toggle important
  const toggleImportant = ( id ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === id
          ? {
            ...task,
            isImportant: !task.isImportant
          }
          : task
      )
    );
  };

  // function to toggle completed
  const toggleCompleted = ( id ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  // function to open modal add and edit task
  const openTodoModal = () => {
    setIsModalOpen( true );
  };

  // function to close modal add and edit task
  const closeTodoModal = () => {
    setIsModalOpen( false );
    setEditingTask( null );
  };

  // function to add task
  const addTask = ( newTask ) => {
    setTasks( prevTasks => [
      ...prevTasks, {
        ...newTask,
        id: crypto.randomUUID(),
        isImportant: false,
        isCompleted: false
      }
    ] );
    showToast( "Task created successfully" );
  };

  // function to delete task
  const deleteTask = ( id ) => {
    setTasks( prevTasks => prevTasks.filter( el => el.id !== id ) );
    showToast( "Task deleted successfully" );
  };

  // function to start editing
  const startEditingTask = ( task ) => {
    setEditingTask( task );
    setIsModalOpen( true );
  };

  // function to update task
  const updateTask = ( updatedTask ) => {
    setTasks( prevTasks =>
      prevTasks.map( task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask( null );
    setIsModalOpen( false );

    showToast( "Task updated successfully" );
  };

  const getTodayTasksCount = () => {
    return tasks.filter(
      ( task ) => isToday( task.date ) && !task.isCompleted
    ).length;
  };

  const showToast = ( message, type = "success" ) => {
    setToast( { message, type } );
  };

  const hideToast = () => {
    setToast( null );
  };




  const todoValue = {
    tasks,
    toggleImportant,
    toggleCompleted,
    openTodoModal,
    closeTodoModal,
    isModalOpen,
    editingTask,
    addTask,
    deleteTask,
    startEditingTask,
    updateTask,
    getTodayTasksCount,
    searchQuery,
    setSearchQuery,
    toast,
    showToast,
    hideToast
  };

  return <TodoContext.Provider value={ todoValue }>
    { children }
  </TodoContext.Provider>;
};

export default TodoProvider;