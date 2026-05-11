import { useState } from 'react';
import PostsPage from './pages/PostsPage';
import EditorPage from './pages/EditorPage';
import MediaPage from './pages/MediaPage';
import Navbar from './components/Navbar';

export default function App() {
  const [view, setView]       = useState('posts');
  const [editPost, setEditPost] = useState(null);

  function handleEdit(post) { setEditPost(post); setView('editor'); }
  function handleSaved()    { setView('posts'); setEditPost(null); }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar view={view === 'editor' ? 'posts' : view} onNavigate={v => { setView(v); setEditPost(null); }} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'posts'  && <PostsPage onEdit={handleEdit} />}
        {view === 'editor' && <EditorPage post={editPost} onSaved={handleSaved} onCancel={() => setView('posts')} />}
        {view === 'media'  && <MediaPage />}
      </main>
    </div>
  );
}
