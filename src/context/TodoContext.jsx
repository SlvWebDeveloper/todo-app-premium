import { createContext, useEffect, useState } from 'react';
import { isToday } from '../utils/isToday';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

export const TodoContext = createContext();

const TodoProvider = ( { children } ) => {

  const { user } = useAuth();

  const [tasks, setTasks] = useState( [] );

  useEffect( () => {
    let cancelled = false;

    const loadTasks = async () => {
      if ( !user ) {
        setTasks( [] );
        return;
      }

      const { data, error } = await supabase
        .from( 'tasks' )
        .select( '*' )
        .eq( 'user_id', user.id )
        .order( 'created_at', { ascending: false } );

      if ( cancelled ) return;

      if ( error ) {
        console.error( 'Errore nel caricamento delle attività:', error );
        setToast( {
          message: 'Impossibile caricare le attività.',
          type: 'error',
        } );
        return;
      }

      const formattedTasks = data.map( ( task ) => ( {
        id: task.id,
        title: task.title,
        description: task.description,
        date: task.date,
        priority: task.priority,
        cardColor: task.card_color,
        isImportant: task.is_important,
        isCompleted: task.is_completed,
      } ) );

      setTasks( formattedTasks );
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [user?.id] );



  const [isModalOpen, setIsModalOpen] = useState( false );
  const [editingTask, setEditingTask] = useState( null );
  const [searchQuery, setSearchQuery] = useState( "" );
  const [toast, setToast] = useState( null );



  const toggleImportant = async ( id ) => {
    if ( !user ) return;

    const task = tasks.find( ( task ) => task.id === id );
    if ( !task ) return;

    const newValue = !task.isImportant;

    const { error } = await supabase
      .from( 'tasks' )
      .update( { is_important: newValue } )
      .eq( 'id', id )
      .eq( 'user_id', user.id );

    if ( error ) {
      console.error( 'Errore durante l’aggiornamento della priorità:', error );
      showToast( 'Impossibile aggiornare l’attività', 'error' );
      return;
    }

    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === id
          ? { ...task, isImportant: newValue }
          : task
      )
    );
  };

  const toggleCompleted = async ( id ) => {
    if ( !user ) return;

    const task = tasks.find( ( task ) => task.id === id );
    if ( !task ) return;

    const newValue = !task.isCompleted;

    const { error } = await supabase
      .from( 'tasks' )
      .update( { is_completed: newValue } )
      .eq( 'id', id )
      .eq( 'user_id', user.id );

    if ( error ) {
      console.error( 'Errore durante l’aggiornamento del completamento:', error );
      showToast( 'Impossibile aggiornare l’attività', 'error' );
      return;
    }

    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === id
          ? { ...task, isCompleted: newValue }
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
  const addTask = async ( newTask ) => {
    if ( !user ) return;

    const taskToInsert = {
      user_id: user.id,
      title: newTask.title,
      description: newTask.description || '',
      date: newTask.date || null,
      priority: ( newTask.priority || 'medium' ).toLowerCase(),
      card_color: newTask.cardColor || 'indigo',
      is_important: false,
      is_completed: false,
    };

    const { data, error } = await supabase
      .from( 'tasks' )
      .insert( taskToInsert )
      .select()
      .single();

    if ( error ) {
      console.error( 'Errore durante la creazione:', error );
      showToast( 'Errore durante la creazione dell’attività', 'error' );
      return;
    }

    const savedTask = {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      priority: data.priority,
      cardColor: data.card_color,
      isImportant: data.is_important,
      isCompleted: data.is_completed,
    };

    setTasks( ( prevTasks ) => [...prevTasks, savedTask] );
    showToast( 'Task created successfully' );
  };

  // function to delete task

  const deleteTask = async ( id ) => {
    if ( !user ) return;

    const { error } = await supabase
      .from( 'tasks' )
      .delete()
      .eq( 'id', id )
      .eq( 'user_id', user.id );

    if ( error ) {
      console.error( 'Errore durante l’eliminazione:', error );
      showToast( 'Errore durante l’eliminazione dell’attività', 'error' );
      return;
    }

    setTasks( ( prevTasks ) =>
      prevTasks.filter( ( task ) => task.id !== id )
    );

    showToast( 'Task deleted successfully' );
  };

  // function to start editing
  const startEditingTask = ( task ) => {
    setEditingTask( task );
    setIsModalOpen( true );
  };

  // function to update task
  const updateTask = async ( updatedTask ) => {
    if ( !user ) return;

    const taskToUpdate = {
      title: updatedTask.title,
      description: updatedTask.description || '',
      date: updatedTask.date || null,
      priority: ( updatedTask.priority || 'medium' ).toLowerCase(),
      card_color: updatedTask.cardColor || 'indigo',
      is_important: updatedTask.isImportant ?? false,
      is_completed: updatedTask.isCompleted ?? false,
    };

    const { error } = await supabase
      .from( 'tasks' )
      .update( taskToUpdate )
      .eq( 'id', updatedTask.id )
      .eq( 'user_id', user.id );

    if ( error ) {
      console.error( 'Errore durante l’aggiornamento:', error );
      showToast( 'Errore durante l’aggiornamento dell’attività', 'error' );
      return;
    }

    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask( null );
    setIsModalOpen( false );

    showToast( 'Task updated successfully' );
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