import React, { useContext } from 'react';
import { COLOR_MAP } from '../utils/bgCard';
import { Calendar, Edit2, Star, Trash2 } from 'lucide-react';
import { PriorityBadge } from '../utils/priorityBadge';
import { TodoContext } from '../context/TodoContext';
import { isOverdue, isToday, formatDate } from "../utils";


const TodoCard = ( { task, onDelete } ) => {

  const { toggleImportant, toggleCompleted, startEditingTask } = useContext( TodoContext );

  const overdue = !task.isCompleted && isOverdue( task.date );
  const dueToday = !task.isCompleted && isToday( task.date );

  return (

    <div className={ `group h-64 relative rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-1 flex flex-col justify-between ${COLOR_MAP[task.cardColor]} ${task.isCompleted && "saturate-75"}` }>

      {/* star button */ }
      <div className='flex justify-end'>
        <button
          onClick={ () => toggleImportant( task.id ) }
          className={ `p-1 rounded-full hover:bg-slate-100 dark:hover:bg-yellow-200 hover:text-yellow-500 transition-colors ${task.isImportant ? "text-yellow-500" : "text-slate-300"}` }
        >
          <Star className='w-5 h-5' fill={ task.isImportant ? "currentColor" : "none" } />
        </button>
      </div>

      {/* title & description */ }
      <p className={ `line-clamp-1 text-xl font-bold ${task.isCompleted && "line-through"}` }>{ task.title }</p>
      <p className={ `text-gray-600 line-clamp-2 ${task.isCompleted && "line-through"}` }>{ task.description }</p>

      {/* Priority Badge */ }
      <div>
        { PriorityBadge( task.priority.toLowerCase() ) }
      </div>

      {/* Date */ }
      <div className={ `flex items-center gap-1 ${overdue ? "text-red-500" : dueToday ? "text-orange-500" : "text-gray-500"}` }>
        <Calendar className='w-3 h-3' />
        <p className='text-sm'>{ formatDate( task.date ) }</p>
      </div>

      {/* checkbox & edit & remove */ }
      <div className='flex justify-between items-center'>

        <input type='checkbox' name='' id='' className='w-5 h-5'
          checked={ task.isCompleted }
          onChange={ () => toggleCompleted( task.id ) }
        />

        <div className='flex gap-1'>

          <button
            className='p-2 rounded-xl hover:bg-slate-100 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90'
            onClick={ () => startEditingTask( task ) }
          >
            <Edit2 className='w-h h-5' />
          </button>

          <button
            className='p-2 rounded-xl hover:bg-slate-100 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90'
            onClick={ () => onDelete( task ) }
          >
            <Trash2 className='w-h h-5' />
          </button>

        </div>
      </div>

    </div>

  );
};

export default TodoCard;