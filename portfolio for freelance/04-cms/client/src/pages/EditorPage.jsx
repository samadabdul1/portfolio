import { useState } from 'react';

export default function EditorPage({ post, onSaved, onCancel }) {
  const [title,    setTitle]    = useState(post?.title    || '');
  const [body,     setBody]     = useState(post?.body     || '');
  const [excerpt,  setExcerpt]  = useState(post?.excerpt  || '');
  const [category, setCategory] = useState(post?.category || 'Tutorial');
  const [tags,     setTags]     = useState((post?.tags || []).join(', '));
  const [status,   setStatus]   = useState(post?.status   || 'draft');
  const [saved,    setSaved]    = useState(false);

  function slugify(s) {
    return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 60);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); onSaved(); }, 1000);
  }

  const CATEGORIES = ['Tutorial', 'Design', 'Backend', 'Frontend', 'News', 'Opinion'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{post ? 'Edit post' : 'New post'}</h1>
          <p className="text-gray-500 text-sm mt-1">Write and publish your content</p>
        </div>
        <button onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-600 transition">← Back</button>
      </div>
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <input type="text" placeholder="Post title…" value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 border-0 focus:outline-none bg-transparent"/>
            <div className="h-px bg-gray-100"/>
            <textarea rows={16} placeholder="Write your post content here…" value={body} onChange={e => setBody(e.target.value)}
              className="w-full text-gray-700 text-sm leading-relaxed placeholder-gray-300 border-0 focus:outline-none bg-transparent resize-none"/>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea rows={3} placeholder="Short description…" value={excerpt} onChange={e => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"/>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Publish</h3>
            <div className="flex gap-2">
              {['draft','published'].map(s => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition ${status === s ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s}
                </button>
              ))}
            </div>
            <button type="submit" disabled={saved}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-semibold text-sm disabled:opacity-70 transition">
              {saved ? '✓ Saved!' : post ? 'Update post' : 'Publish post'}
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Category</h3>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Tags</h3>
            <input type="text" placeholder="react, css, firebase…" value={tags} onChange={e => setTags(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"/>
          </div>
          {title && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Slug</h3>
              <p className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded-lg break-all">/{slugify(title)}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
