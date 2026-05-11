import { useState } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const DEMO_POSTS = [
  {
    id: '1',
    authorName: 'Alex Rivera',
    authorId: 'u1',
    caption: 'Golden hour at the coast never disappoints 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    likes: 142,
    createdAt: '2h ago',
    comments: [
      { id: 'c1', authorName: 'Jamie', text: 'Stunning view!' },
      { id: 'c2', authorName: 'Sam', text: 'Where is this?' },
    ],
  },
  {
    id: '2',
    authorName: 'Maya Patel',
    authorId: 'u2',
    caption: 'Found the best coffee spot in the city ☕️',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    likes: 87,
    createdAt: '5h ago',
    comments: [
      { id: 'c3', authorName: 'Chris', text: 'Need to visit!' },
    ],
  },
  {
    id: '3',
    authorName: 'Jordan Lee',
    authorId: 'u3',
    caption: 'Weekend hike completed 🏔️ 14km and worth every step',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600',
    likes: 214,
    createdAt: '1d ago',
    comments: [],
  },
  {
    id: '4',
    authorName: 'Sam Kim',
    authorId: 'u4',
    caption: 'Late night coding session with a view 💻',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    likes: 63,
    createdAt: '2d ago',
    comments: [
      { id: 'c4', authorName: 'Alex', text: 'Living the dream!' },
      { id: 'c5', authorName: 'Maya', text: 'What are you building?' },
    ],
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [showCreate, setShowCreate] = useState(false);

  function handleCreate(caption, imagePreview) {
    const newPost = {
      id: Date.now().toString(),
      authorName: 'Demo User',
      authorId: 'demo',
      caption,
      image: imagePreview || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600',
      likes: 0,
      createdAt: 'just now',
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    setShowCreate(false);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Create post trigger */}
      <button
        onClick={() => setShowCreate(s => !s)}
        className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 text-left hover:border-pink-300 transition shadow-sm"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 grid place-items-center text-white text-sm font-bold shrink-0">D</div>
        <span className="text-gray-400 text-sm">Share something with the world…</span>
      </button>

      {showCreate && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <CreatePost onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
        </div>
      )}

      {posts.map(post => (
        <PostCard key={post.id} post={post} onLike={(id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))} />
      ))}
    </div>
  );
}
