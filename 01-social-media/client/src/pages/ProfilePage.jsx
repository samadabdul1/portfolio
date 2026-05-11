import { Link } from 'react-router-dom';

const DEMO_PROFILE = {
  displayName: 'Demo User',
  email: 'demo@example.com',
  posts: 12,
  followers: 348,
  following: 127,
};

const DEMO_GRID = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=300',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300',
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=300',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=300',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300',
];

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 grid place-items-center text-white text-3xl font-bold shrink-0">
          {DEMO_PROFILE.displayName[0]}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{DEMO_PROFILE.displayName}</h2>
          <p className="text-gray-500 text-sm mb-3">{DEMO_PROFILE.email}</p>
          <div className="flex gap-6">
            {[['Posts', DEMO_PROFILE.posts], ['Followers', DEMO_PROFILE.followers], ['Following', DEMO_PROFILE.following]].map(([label, val]) => (
              <div key={label} className="text-center">
                <p className="font-bold text-gray-900">{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {DEMO_GRID.map((url, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-sm">
            <img src={url} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer" />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-pink-500 font-semibold hover:underline">← Back to feed</Link>
      </div>
    </div>
  );
}
