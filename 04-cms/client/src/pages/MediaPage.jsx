const DEMO_IMAGES = [
  { name: 'hero-shot.jpg',     url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=300' },
  { name: 'city-lights.jpg',   url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { name: 'mountains.jpg',     url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=300' },
  { name: 'coffee-shop.jpg',   url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300' },
  { name: 'laptop-desk.jpg',   url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300' },
  { name: 'ocean-sunset.jpg',  url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300' },
];

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">{DEMO_IMAGES.length} files</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-semibold text-sm transition">
          ↑ Upload
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {DEMO_IMAGES.map(f => (
          <div key={f.name} className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100">
            <img src={f.url} alt={f.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end">
              <p className="w-full px-2 py-1.5 text-white text-xs truncate font-medium">{f.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
