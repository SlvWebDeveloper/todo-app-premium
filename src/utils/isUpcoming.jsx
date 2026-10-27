export const isUpcoming = ( dateString ) => {
  if ( !dateString ) return false;

  const [year, month, day] = dateString.split( "-" ).map( Number );
  const taskDate = new Date( year, month - 1, day );

  const today = new Date();
  today.setHours( 0, 0, 0, 0 );
  taskDate.setHours( 0, 0, 0, 0 );

  return (
    !Number.isNaN( taskDate.getTime() ) &&
    taskDate.getTime() > today.getTime()
  );
};