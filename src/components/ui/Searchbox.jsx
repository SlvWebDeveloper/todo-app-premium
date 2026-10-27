import { Search } from 'lucide-react';

const Searchbox = ( {
  placeholder = "Search...",
  onSearch,
  query = "",
  className = ""
} ) => {


  return (
    <div className={ `w-full max-w-md ${className}` }>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={ query }
          onChange={ ( e ) => onSearch( e.target.value ) }
          placeholder={ placeholder }
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all shadow-sm"
        />
      </div>
    </div>
  );
};

export default Searchbox;