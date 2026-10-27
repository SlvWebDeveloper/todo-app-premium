
const StatCard = ( { title, value, icon: Icon, color } ) => {
  const colorStyles = {
    indigo: {
      iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
      iconText: "text-indigo-600 dark:text-indigo-400",
    },
    green: {
      iconBg: "bg-green-100 dark:bg-green-500/10",
      iconText: "text-green-600 dark:text-green-400",
    },
    red: {
      iconBg: "bg-red-100 dark:bg-red-500/10",
      iconText: "text-red-600 dark:text-red-400",
    },
    amber: {
      iconBg: "bg-amber-100 dark:bg-amber-500/10",
      iconText: "text-amber-600 dark:text-amber-400",
    },
  };

  const styles = colorStyles[color] ?? colorStyles.indigo;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          { title }
        </p>

        <div className={ `rounded-xl p-2.5 ${styles.iconBg}` }>
          <Icon className={ `h-5 w-5 ${styles.iconText}` } />
        </div>
      </div>

      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
        { value }
      </h3>
    </div>
  );
};

export default StatCard;
