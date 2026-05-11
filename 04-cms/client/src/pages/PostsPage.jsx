import { useState } from 'react';

const INITIAL_POSTS = [
  { id: '1', title: 'Getting Started with React 18', status: 'published', category: 'Tutorial', excerpt: 'Learn the new features in React 18 including concurrent rendering and automatic batching.' },
  { id: '2', title: 'Designing with Tailwind CSS',   status: 'published', category: 'Design',   excerpt: 'Build beautiful UIs faster using utility-first CSS with Tailwind.' },
  { id: '3', title: 'Firebase Auth Deep Dive',        status: 'draft',     category: 'Backend',  excerpt: 'Everything you need to know about Firebase Authentication in 2024.' },
  { id: '4', title: 'Node.js Performance Tips',       status: 'published', category: 'Backend',  excerpt: 'Practical tips to squeeze more performance out of your Node.js applications.' },
  { id: '5', title: 'CSS Grid Layout Mastery',        status: 'draft',     category: 'Design',   excerpt: 'A deep dive into CSS Grid with real-world examples and best practices.' },
];

export default function PostsPage({ onEdit }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [filter, setFilter] = useState('all');

  function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  function toggleStatus(post) {
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
  }

  const filtered = posts.filter(p => filter === 'all' || p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <button onClick={() => onEdit(null)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-semibold text-sm transition">
          + New post
        </button>
      </div>
      <div className="flex gap-2">
        {['all', 'published', 'draft'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${filter === f ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Title</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
              <th className="text-right px-5 py-3 text-gray-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(post => (
              <tr key={post.id} className="border-b border-gray-100 last:border-0 hover:bg-amber-50/30 transition">
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{post.category}</span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleStatus(post)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full transition ${post.status === 'published' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : 'bg-gray-400'}`}/>
                    {post.status}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => onEdit(post)} className="px-3 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition">Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-10 text-sm">No posts found.</p>}
      </div>
    </div>
  );
}
