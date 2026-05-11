export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 grid place-items-center text-white font-bold text-sm">H</div>
          <span className="text-xl font-bold text-gray-900">Hire</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 grid place-items-center text-white text-sm font-bold">D</div>
          <span className="text-sm text-gray-500 hidden sm:block">Demo User</span>
        </div>
      </div>
    </header>
  );
}
