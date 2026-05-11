import { useState } from 'react';

export default function PostCard({ post, onLike }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  function handleLike() {
    if (!liked) { setLiked(true); onLike(post.id); }
  }

  function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [...prev, { id: Date.now().toString(), authorName: 'Demo User', text: newComment.trim() }]);
    setNewComment('');
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 grid place-items-center text-white text-sm font-bold shrink-0">
          {post.authorName[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{post.authorName}</p>
          <p className="text-xs text-gray-400">{post.createdAt}</p>
        </div>
      </div>

      {/* Image */}
      <img src={post.image} alt="" className="w-full aspect-square object-cover" />

      {/* Actions */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}
            className={`flex items-center gap-1.5 transition ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
            <svg className={`w-6 h-6 ${liked ? 'fill-red-500' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button onClick={() => setShowComments(s => !s)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            <span className="text-sm font-medium">{comments.length}</span>
          </button>
        </div>

        {post.caption && <p className="text-sm text-gray-800"><span className="font-semibold">{post.authorName}</span> {post.caption}</p>}

        {showComments && (
          <div className="space-y-2 pt-1">
            {comments.map(c => (
              <p key={c.id} className="text-sm text-gray-700"><span className="font-semibold">{c.authorName}</span> {c.text}</p>
            ))}
            <form onSubmit={handleComment} className="flex gap-2 pt-1">
              <input
                type="text" value={newComment} onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 text-sm border-0 border-b border-gray-200 focus:outline-none focus:border-pink-400 bg-transparent py-1"
              />
              <button type="submit" className="text-xs font-semibold text-pink-500 hover:text-pink-600 transition">Post</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
