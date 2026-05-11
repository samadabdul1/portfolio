import { useWishlist } from '../context/WishlistContext';
import { DEMO_LISTINGS } from '../data/demo';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { savedIds, toggleSaved } = useWishlist();
  const items = DEMO_LISTINGS.filter(l => savedIds.has(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} saved {items.length === 1 ? 'place' : 'places'}</p>
        </div>
        <Link to="/" className="text-sm text-[#ff385c] font-semibold hover:underline">
          Back to listings
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No saved places yet</h2>
          <p className="text-gray-500 text-sm mb-6">Tap the heart on any listing to save it here.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff385c] to-[#e6683c] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition">
            Explore listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <button onClick={() => toggleSaved(item.id)} className="absolute top-3 right-3 p-1.5 transition" aria-label="Remove from wishlist">
                  <svg className="w-6 h-6 fill-[#ff385c] stroke-[#ff385c]" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <div className="absolute top-3 left-3">
                  <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">{item.category}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <svg className="w-3.5 h-3.5 fill-gray-900" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-900">{item.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="text-sm font-semibold text-gray-900 pt-0.5">
                  <span className="text-base">${item.price}</span> <span className="font-normal text-gray-500">/ night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
