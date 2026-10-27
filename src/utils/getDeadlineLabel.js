export const getDeadlineLabel = ( date ) => {
  if ( !date ) return null;

  const [year, month, day] = date.split( "-" ).map( Number );
  const dueDate = new Date( year, month - 1, day );

  if ( Number.isNaN( dueDate.getTime() ) ) return null;

  const today = new Date();
  today.setHours( 0, 0, 0, 0 );

  const tomorrow = new Date( today );
  tomorrow.setDate( tomorrow.getDate() + 1 );

  if ( dueDate.getTime() === today.getTime() ) return "Today";
  if ( dueDate.getTime() === tomorrow.getTime() ) return "Tomorrow";

  return null;
};