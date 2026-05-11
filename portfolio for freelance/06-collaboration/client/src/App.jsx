import { useState } from 'react';
import DocsListPage from './pages/DocsListPage';
import EditorPage from './pages/EditorPage';

export default function App() {
  const [openDoc, setOpenDoc] = useState(null);

  if (openDoc) return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-200">
        <button onClick={() => setOpenDoc(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 font-medium transition">
          <div className="w-6 h-6 rounded bg-violet-600 grid place-items-center text-white text-xs">Co</div>
          Documents
        </button>
        <span className="text-gray-300">›</span>
        <span className="text-sm text-gray-600 truncate">{openDoc.title}</span>
      </div>
      <div className="flex-1 min-h-0">
        <EditorPage doc={openDoc} onChange={updated => setOpenDoc(updated)} />
      </div>
    </div>
  );

  return <DocsListPage onOpen={setOpenDoc} />;
}
