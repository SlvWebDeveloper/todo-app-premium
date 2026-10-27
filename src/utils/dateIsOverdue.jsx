export const isOverdue = ( dateString ) => {
  if ( !dateString ) return false;

  const [year, month, day] = dateString.split( "-" ).map( Number );
  const todoDate = new Date( year, month - 1, day );

  const today = new Date();
  today.setHours( 0, 0, 0, 0 );

  return (
    !Number.isNaN( todoDate.getTime() ) &&
    todoDate < today
  );
};