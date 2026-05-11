import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ff385c] grid place-items-center text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          </div>
          <span className="text-xl font-bold text-[#ff385c]">Stay</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" className={`p-2 rounded-lg transition ${pathname === '/wishlist' ? 'text-[#ff385c]' : 'text-gray-400 hover:text-gray-700'}`}>
            <svg className="w-6 h-6" fill={pathname === '/wishlist' ? '#ff385c' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff385c] to-orange-500 grid place-items-center text-white text-sm font-bold">
            {(user?.displayName || 'U')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}
