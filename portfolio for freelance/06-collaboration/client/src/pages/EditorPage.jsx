import { useState, useRef, useCallback } from 'react';
import CommentsPanel from '../components/CommentsPanel';

const PRESENCE = [
  { name: 'Alex R.',  color: '#7c3aed' },
  { name: 'Maya P.', color: '#0284c7' },
  { name: 'You',     color: '#16a34a' },
];

export default function EditorPage({ doc, onChange }) {
  const [title,   setTitle]   = useState(doc.title);
  const [content, setContent] = useState(doc.content || '');
  const [saving,  setSaving]  = useState(false);
  const [showComments, setShowComments] = useState(false);
  const timer = useRef(null);

  const handleChange = useCallback((val) => {
    setContent(val);
    setSaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange({ ...doc, title, content: val, updated: 'just now' });
      setSaving(false);
    }, 600);
  }, [doc, title, onChange]);

  function handleTitleBlur() {
    onChange({ ...doc, title, content, updated: 'just now' });
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between gap-4">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} onBlur={handleTitleBlur}
          className="text-base font-semibold text-gray-900 border-0 focus:outline-none bg-transparent flex-1 min-w-0"
          placeholder="Untitled document"/>
        <div className="flex items-center gap-3 shrink-0">
          {/* Presence avatars */}
          <div className="flex -space-x-2">
            {PRESENCE.map(u => (
              <div key={u.name} title={u.name}
                style={{ backgroundColor: u.color }}
                className="w-8 h-8 rounded-full border-2 border-white grid place-items-center text-white text-xs font-bold">
                {u.name[0]}
              </div>
            ))}
          </div>
          <span className={`text-xs font-medium ${saving ? 'text-amber-500' : 'text-emerald-500'}`}>
            {saving ? 'Saving…' : 'Saved'}
          </span>
          <button onClick={() => setShowComments(c => !c)}
            className={`p-2 rounded-lg transition ${showComments ? 'bg-violet-100 text-violet-700' : 'hover:bg-gray-100 text-gray-500'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg min-h-[800px] p-12">
            <textarea value={content} onChange={e => handleChange(e.target.value)}
              placeholder="Start typing your document…"
              className="w-full min-h-[720px] text-gray-800 text-base leading-relaxed resize-none border-0 focus:outline-none bg-transparent font-serif"/>
          </div>
        </div>
        {showComments && (
          <div className="w-80 border-l border-gray-200 overflow-auto">
            <CommentsPanel />
          </div>
        )}
      </div>
    </div>
  );
}
