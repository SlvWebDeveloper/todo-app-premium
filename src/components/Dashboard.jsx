import React, { useContext, useMemo, useState } from 'react';
import { filters } from '../assets/data';
import { AlertCircle, CheckCircle2, ListTodo, Plus, Star } from 'lucide-react';
import TodoList from './TodoList';
import { TodoContext } from '../context/TodoContext';
import { isOverdue, isToday, getDeadlineLabel, } from "../utils";
import StatCard from './StatCard';


const Dashboard = () => {

  const [isSelected, setIsSelected] = useState( "all" );


  const { openTodoModal, tasks, startEditingTask } = useContext( TodoContext );

  const stats = useMemo( () => {
    const total = tasks.length;

    const completed = tasks.filter(
      ( task ) => task.isCompleted
    ).length;

    const overdue = tasks.filter(
      ( task ) => !task.isCompleted && isOverdue( task.date )
    ).length;

    const important = tasks.filter(
      ( task ) => task.isImportant
    ).length;

    return { total, completed, overdue, important };
  }, [tasks] );


  const priorityStats = useMemo( () => {
    const activeTasks = tasks.filter( ( task ) => !task.isCompleted );

    return [
      {
        label: "High",
        count: activeTasks.filter(
          ( task ) => task.priority.toLowerCase() === "high"
        ).length,
        color: "bg-red-500",
      },
      {
        label: "Medium",
        count: activeTasks.filter(
          ( task ) => task.priority.toLowerCase() === "medium"
        ).length,
        color: "bg-amber-500",
      },
      {
        label: "Low",
        count: activeTasks.filter(
          ( task ) => task.priority.toLowerCase() === "low"
        ).length,
        color: "bg-green-500",
      },
    ];
  }, [tasks] );


  const completionPercentage =
    stats.total === 0
      ? 0
      : Math.round( ( stats.completed / stats.total ) * 100 );

  const activeTasksCount = tasks.filter(
    ( task ) => !task.isCompleted
  ).length;

  const upcomingDeadlines = useMemo( () => {
    const today = new Date();
    today.setHours( 0, 0, 0, 0 );

    return tasks
      .filter( ( task ) => {
        if ( task.isCompleted || !task.date ) return false;

        const [year, month, day] = task.date.split( "-" ).map( Number );
        const dueDate = new Date( year, month - 1, day );

        return dueDate >= today;
      } )
      .sort( ( a, b ) => a.date.localeCompare( b.date ) )
      .slice( 0, 5 );
  }, [tasks] );

  const todayStats = useMemo( () => {
    const todayTasks = tasks.filter( ( task ) => isToday( task.date ) );

    const completed = todayTasks.filter(
      ( task ) => task.isCompleted
    ).length;

    const total = todayTasks.length;

    return {
      total,
      completed,
      remaining: total - completed,
      percentage:
        total === 0 ? 0 : Math.round( ( completed / total ) * 100 ),
    };
  }, [tasks] );

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <h2 className='text-gray-900 dark:text-white tracking-tighter font-bold text-2xl'>Good evening , Silvio</h2>
      <h2 className="text-gray-500 dark:text-gray-400 text-lg mt-2.5">
        You have { todayStats.remaining }{ " " }
        { todayStats.remaining === 1 ? "task" : "tasks" } to complete today
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={ stats.total }
          icon={ ListTodo }
          color="indigo"
        />

        <StatCard
          title="Completed"
          value={ stats.completed }
          icon={ CheckCircle2 }
          color="green"
        />

        <StatCard
          title="Overdue"
          value={ stats.overdue }
          icon={ AlertCircle }
          color="red"
        />

        <StatCard
          title="Important"
          value={ stats.important }
          icon={ Star }
          color="amber"
        />
      </div>


      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Progress Overview
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Avanzamento delle tue attività
            </p>
          </div>

          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            { completionPercentage }%
          </span>
        </div>

        <div
          className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700"
          role="progressbar"
          aria-label="Percentuale di attività completate"
          aria-valuenow={ completionPercentage }
          aria-valuemin={ 0 }
          aria-valuemax={ 100 }
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={ { width: `${completionPercentage}%` } }
          />
        </div>

        <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{ stats.completed } completate</span>
          <span>{ stats.total } totali</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Today's Tasks
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Il riepilogo delle attività di oggi
            </p>
          </div>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            { todayStats.percentage }%
          </span>
        </div>

        { todayStats.total === 0 && (
          <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-700/50 dark:text-gray-400">
            Non hai attività programmate per oggi. Puoi approfittarne
            per organizzare le prossime giornate.
          </p>
        ) }

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total
            </p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              { todayStats.total }
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-300">
              Completed
            </p>
            <p className="mt-1 text-2xl font-semibold text-green-700 dark:text-green-300">
              { todayStats.completed }
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-900/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Remaining
            </p>
            <p className="mt-1 text-2xl font-semibold text-amber-700 dark:text-amber-300">
              { todayStats.remaining }
            </p>
          </div>
        </div>
      </div>


      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Tasks by Priority
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Distribuzione delle attività per livello di priorità
          </p>
        </div>

        <div className="mt-6 space-y-5">
          { priorityStats.map( ( item ) => {
            const percentage =
              activeTasksCount === 0
                ? 0
                : Math.round( ( item.count / activeTasksCount ) * 100 );

            return (
              <div key={ item.label }>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    { item.label }
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    { item.count } ({ percentage }%)
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className={ `h-full rounded-full transition-all duration-500 ${item.color}` }
                    style={ { width: `${percentage}%` } }
                  />
                </div>
              </div>
            );
          } ) }
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Upcoming Deadlines
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Le prossime attività in scadenza
          </p>
        </div>

        { upcomingDeadlines.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nessuna scadenza imminente.
          </p>
        ) : (
          <div className="space-y-3">
            { upcomingDeadlines.map( ( task ) => (
              <button
                key={ task.id }
                type="button"
                onClick={ () => startEditingTask( task ) }
                className="flex w-full items-center justify-between gap-4 rounded-xl bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-gray-700/50 dark:hover:bg-gray-700"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    { task.title }
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Scadenza: { task.date.split( "-" ).reverse().join( "-" ) }
                    </p>

                    { getDeadlineLabel( task.date ) && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        { getDeadlineLabel( task.date ) }
                      </span>
                    ) }
                  </div>
                </div>

                <span
                  className={ `shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${task.priority.toLowerCase() === "high"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    : task.priority.toLowerCase() === "medium"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }` }
                >
                  { task.priority }
                </span>
              </button>
            ) ) }
          </div>
        ) }
      </div>


      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* filters button */ }
        <div className="flex flex-wrap gap-2.5 py-3 sm:py-5 sm:px-3">

          {
            filters.map( ( item ) => {
              return (
                <button
                  key={ item.id }
                  onClick={ () => setIsSelected( item.id ) }
                  className={ `px-3 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-200 font-medium active:scale-95 ${isSelected === item.id
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm"
                    }` }
                >
                  <div className='flex items-center gap-3'>
                    <span className='font-medium'>{ item.name }</span>
                  </div>
                </button>
              );
            } )
          }
        </div>

        {/* add task button */ }
        <div>
          <button
            className='flex items-center gap-1.5 rounded-xl px-7 py-3 shadow-xl shadow-indigo-500/20 bg-indigo-500 text-white transition-all duration-200 font-medium active:scale-95 hover:bg-indigo-600'
            onClick={ openTodoModal }
          >
            <Plus className='w-5 h-5' />
            Add Task
          </button>
        </div>

      </div>

      <div className='my-10'>
        <TodoList filter={ isSelected } />
      </div>

    </div>
  );
};

export default Dashboard;