import { useState } from 'react';

const DEMO_COMMENTS = [
  { id: '1', author: 'Alex R.',  color: '#7c3aed', text: 'This section looks great! Maybe expand on the technical details?', time: '5 min ago' },
  { id: '2', author: 'Maya P.', color: '#0284c7', text: 'Agreed. I think we should also add a timeline here.', time: '3 min ago' },
];

export default function CommentsPanel() {
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [text, setText] = useState('');

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setComments(prev => [...prev, { id: Date.now().toString(), author: 'You', color: '#16a34a', text: text.trim(), time: 'just now' }]);
    setText('');
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 text-sm">Comments</h3>
        <p className="text-xs text-gray-400">{comments.length} comments</p>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {comments.map(c => (
          <div key={c.id}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full grid place-items-center text-white text-xs font-bold" style={{ backgroundColor: c.color }}>{c.author[0]}</div>
              <span className="text-xs font-medium text-gray-700">{c.author}</span>
              <span className="text-xs text-gray-400">{c.time}</span>
            </div>
            <div className="ml-8 bg-gray-50 rounded-xl px-3 py-2">
              <p className="text-sm text-gray-700 leading-snug">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="border-t border-gray-200 p-3 flex gap-2">
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment…"
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
        <button type="submit" disabled={!text.trim()}
          className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition">→</button>
      </form>
    </div>
  );
}
