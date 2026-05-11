import { useWishlist } from '../context/WishlistContext';

export default function ListingCard({ listing }) {
  const { savedIds, toggleSaved } = useWishlist();
  const saved = savedIds.has(listing.id);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <button onClick={e => { e.preventDefault(); toggleSaved(listing.id); }} className="absolute top-3 right-3 p-1.5 transition" aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}>
          <svg className={`w-6 h-6 transition ${saved ? 'fill-[#ff385c] stroke-[#ff385c]' : 'fill-white/40 stroke-white'}`} strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">{listing.category}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-3.5 h-3.5 fill-gray-900" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-gray-900">{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="text-xs text-gray-400">{listing.reviews} reviews</p>
        <p className="text-sm font-semibold text-gray-900 pt-0.5">
          <span className="text-base">${listing.price}</span> <span className="font-normal text-gray-500">/ night</span>
        </p>
      </div>
    </div>
  );
}
