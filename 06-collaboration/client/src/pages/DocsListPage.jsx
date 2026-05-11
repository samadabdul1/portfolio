import { useState } from 'react';

const INITIAL_DOCS = [
  { id: '1', title: 'Product Roadmap Q3 2025',   owner: 'Demo User', updated: '2 hours ago',  content: 'This document outlines our product strategy and key milestones for Q3 2025...' },
  { id: '2', title: 'Engineering Onboarding Guide', owner: 'Demo User', updated: '1 day ago',  content: 'Welcome to the engineering team! This guide will help you get set up...' },
  { id: '3', title: 'Design System Principles',   owner: 'Demo User', updated: '3 days ago', content: 'Our design system is built on four core principles: clarity, consistency, efficiency...' },
  { id: '4', title: 'API Documentation Draft',    owner: 'Demo User', updated: '1 week ago', content: 'This document covers the REST API endpoints available in version 2.0...' },
];

export default function DocsListPage({ onOpen }) {
  const [docs, setDocs] = useState(INITIAL_DOCS);

  function createDoc() {
    const newDoc = { id: Date.now().toString(), title: 'Untitled document', owner: 'Demo User', updated: 'just now', content: '' };
    setDocs(prev => [newDoc, ...prev]);
    onOpen(newDoc);
  }

  function deleteDoc(id, e) {
    e.stopPropagation();
    if (!confirm('Delete this document?')) return;
    setDocs(prev => prev.filter(d => d.id !== id));
  }

  return (
    <div className="min-h-screen bg-violet-50/50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 grid place-items-center text-white text-sm font-bold">Co</div>
            <span className="text-xl font-bold text-gray-900">Co</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={createDoc} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm transition">
              + New document
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-600 grid place-items-center text-white text-sm font-bold">D</div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Documents</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {docs.map(d => (
            <div key={d.id} onClick={() => onOpen(d)}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-sm transition cursor-pointer group">
              <div className="aspect-[3/4] bg-violet-50 rounded-lg mb-3 flex items-start p-3 overflow-hidden">
                <p className="text-xs text-gray-400 line-clamp-6 leading-relaxed">{d.content || 'Empty document'}</p>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{d.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.updated}</p>
                </div>
                <button onClick={(e) => deleteDoc(d.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg transition shrink-0 text-red-400">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
