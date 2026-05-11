import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  function handleClear() {
    setValue('');
    onSearch('');
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition px-4 py-3 gap-3">
        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search destinations..."
          value={value}
          onChange={handleChange}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
        />
        {value && (
          <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
