import { useState } from 'react';

export default function PostJobModal({ onClose, onPosted }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', type: 'Full-time', salary: '', tags: '', description: '' });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onPosted({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
    }, 500);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-bold text-gray-900">Post a job</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Job title *</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company *</label>
              <input type="text" value={form.company} onChange={e => set('company', e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input type="text" placeholder="Remote / City" value={form.location} onChange={e => set('location', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Salary / Rate</label>
            <input type="text" placeholder="e.g. $120k–$150k" value={form.salary} onChange={e => set('salary', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
            <input type="text" placeholder="React, TypeScript, Node.js" value={form.tags} onChange={e => set('tags', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description *</label>
            <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm disabled:opacity-60 transition">{loading ? 'Posting…' : 'Post job'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
