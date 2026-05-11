import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 grid place-items-center text-white font-bold text-sm">P</div>
          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">Pulse</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `p-2 rounded-xl transition ${isActive ? 'text-pink-500' : 'text-gray-400 hover:text-gray-700'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `p-2 rounded-xl transition ${isActive ? 'text-pink-500' : 'text-gray-400 hover:text-gray-700'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
