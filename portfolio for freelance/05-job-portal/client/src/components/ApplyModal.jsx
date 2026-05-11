import { useState } from 'react';

export default function ApplyModal({ job, onClose, onApplied }) {
  const [name,    setName]    = useState('Demo User');
  const [email,   setEmail]   = useState('demo@example.com');
  const [cover,   setCover]   = useState('');
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setDone(true); setTimeout(onApplied, 1200); }, 600);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Apply for {job.title}</h2>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">✕</button>
        </div>
        {done ? (
          <div className="text-center py-12 px-6">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h3 className="font-bold text-gray-900 mb-2">Application submitted!</h3>
            <p className="text-gray-500 text-sm">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cover letter</label>
              <textarea rows={5} placeholder="Tell us why you're a great fit…" value={cover} onChange={e => setCover(e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Cancel</button>
              <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm disabled:opacity-60 transition">
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
