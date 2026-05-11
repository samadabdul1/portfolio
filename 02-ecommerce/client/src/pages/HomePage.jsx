import { useState, useMemo } from 'react';
import { DEMO_LISTINGS, CATEGORIES } from '../data/demo';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    let result = DEMO_LISTINGS;
    if (category !== 'All') result = result.filter(l => l.category === category);
    if (searchTerm) result = result.filter(l =>
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result;
  }, [category, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchBar onSearch={setSearchTerm} />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 mt-4 scrollbar-hide">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              category === c
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
