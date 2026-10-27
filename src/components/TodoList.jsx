import React, { useContext, useMemo, useState } from 'react';
import TodoCard from './TodoCard';
import { TodoContext } from '../context/TodoContext';
import { SidebarContext } from '../context/SidebarContext';
import EmptyState from './EmptyState';
import { emptyStates } from '../assets/data';
import DeleteConfirmModal from './DeleteConfirmModal';
import { ArrowUpDown } from 'lucide-react';
import { isToday, isUpcoming } from "../utils";


const TodoList = ( { filter } ) => {

  const { tasks, searchQuery, deleteTask, setSearchQuery } = useContext( TodoContext );
  const { selectedView } = useContext( SidebarContext );
  const [taskToDelete, setTaskToDelete] = useState( null );
  const [sortBy, setSortBy] = useState( "date" );
  const [priorityFilter, setPriorityFilter] = useState( "all" );

  const filteredTasks = useMemo( () => {

    let result = tasks;


    // Sidebar filter
    switch ( selectedView ) {
      case "today":
        result = result.filter( ( task ) =>
          isToday( task.date )
        );
        break;

      case "upcoming":
        result = result.filter( ( task ) =>
          isUpcoming( task.date )
        );
        break;

      case "completed":
        result = result.filter( ( task ) => task.isCompleted );
        break;

      case "important":
        result = result.filter( ( task ) => task.isImportant );
        break;

      default:
        break;
    }

    // Dashboard filter
    switch ( filter ) {
      case "active":
        result = result.filter( ( task ) => !task.isCompleted );
        break;

      case "completed":
        result = result.filter( ( task ) => task.isCompleted );
        break;

      case "important":
        result = result.filter( ( task ) => task.isImportant );
        break;

      default:
        break;
    }

    if ( searchQuery.trim() !== "" ) {
      result = result.filter( task =>
        task.title.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        task.description.toLowerCase().includes( searchQuery.toLowerCase() )
      );
    }

    if ( priorityFilter !== "all" ) {
      result = result.filter(
        ( task ) => task.priority.toLowerCase() === priorityFilter
      );
    }


    const sortedTasks = [...result];

    if ( sortBy === "date" ) {
      sortedTasks.sort( ( a, b ) => {
        if ( a.isCompleted !== b.isCompleted ) {
          return Number( a.isCompleted ) - Number( b.isCompleted );
        }

        return a.date.localeCompare( b.date );
      } );
    }

    if ( sortBy === "priority" ) {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };

      sortedTasks.sort( ( a, b ) => {
        // Le task attive vengono prima di quelle completate
        if ( a.isCompleted !== b.isCompleted ) {
          return Number( a.isCompleted ) - Number( b.isCompleted );
        }

        // A parità di stato, ordina per priorità
        const priorityDifference =
          priorityOrder[a.priority.toLowerCase()] -
          priorityOrder[b.priority.toLowerCase()];

        if ( priorityDifference !== 0 ) {
          return priorityDifference;
        }

        // A parità di priorità, ordina per scadenza
        return a.date.localeCompare( b.date );
      } );
    }

    return sortedTasks;

  }, [tasks, selectedView, filter, searchQuery, sortBy, priorityFilter] );

  const resultsCount = filteredTasks.length;


  let emptyState;

  if ( tasks.length === 0 ) {
    emptyState = emptyStates["no-tasks"];
  } else if ( filteredTasks.length === 0 ) {
    emptyState = emptyStates["no-results"];
  }

  const resetFilters = () => {
    setPriorityFilter( "all" );
    setSearchQuery( "" );
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-end gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          { resultsCount } task
        </p>
        <div className="flex items-center gap-2">
          <label
            htmlFor="priorityFilter"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Priorità
          </label>

          <select
            id="priorityFilter"
            value={ priorityFilter }
            onChange={ ( e ) => setPriorityFilter( e.target.value ) }
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-indigo-400"
          >
            <option value="all">Tutte</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sortBy"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <ArrowUpDown size={ 16 } />
            Ordina per
          </label>

          <select
            id="sortBy"
            value={ sortBy }
            onChange={ ( e ) => setSortBy( e.target.value ) }
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-indigo-400"
          >
            <option value="date">Scadenza</option>
            <option value="priority">Priorità</option>
          </select>
        </div>
        <button
          type="button"
          onClick={ resetFilters }
          className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Azzera filtri
        </button>
      </div>



      { emptyState ? (
        <EmptyState
          { ...emptyState }
          action
          onAction={
            tasks.length > 0 && filteredTasks.length === 0
              ? resetFilters
              : undefined
          }
          actionLabel={
            tasks.length > 0 && filteredTasks.length === 0
              ? "Azzera filtri"
              : "Add Task"
          }
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          { filteredTasks.map( ( task ) => (
            <TodoCard
              task={ task }
              key={ task.id }
              onDelete={ setTaskToDelete }
            />
          ) ) }
        </div>
      ) }



      {
        taskToDelete && (
          <DeleteConfirmModal
            task={ taskToDelete }
            onCancel={ () => setTaskToDelete( null ) }
            onConfirm={ () => {
              deleteTask( taskToDelete.id );
              setTaskToDelete( null );
            } }
          />
        )
      }
    </>
  );
};

export default TodoList;