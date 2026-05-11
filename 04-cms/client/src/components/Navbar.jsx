export default function Navbar({ view, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 grid place-items-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Quill</span>
          </div>
          <nav className="flex gap-1">
            {['posts','media'].map(v => (
              <button key={v} onClick={() => onNavigate(v)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${view === v ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                {v}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500 grid place-items-center text-white text-sm font-bold">D</div>
          <span className="text-sm text-gray-500 hidden sm:block">Demo User</span>
        </div>
      </div>
    </header>
  );
}
