export const PriorityBadge = ( priority ) => {

  const PRIORITY_STYLES = {
    "low": "bg-green-200 text-green-800",
    "medium": "bg-yellow-200 text-yellow-800",
    "high": "bg-red-200 text-red-800",
  };

  return (
    <span className={ `px-2 py-0.5 text-xs font-medium rounded-md ${PRIORITY_STYLES[priority]}` }>
      { priority.toUpperCase() }
    </span>
  );
};