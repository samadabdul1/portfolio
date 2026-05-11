import { useState, useRef } from 'react';

export default function CreatePost({ onSubmit, onCancel }) {
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      {preview && <img src={preview} alt="preview" className="w-full rounded-xl aspect-square object-cover" />}
      <button onClick={() => inputRef.current?.click()}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-pink-300 transition">
        {preview ? 'Change photo' : '+ Add photo'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <textarea rows={3} value={caption} onChange={e => setCaption(e.target.value)}
        placeholder="Write a caption…"
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"/>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition">Cancel</button>
        <button onClick={() => onSubmit(caption, preview)}
          disabled={!caption.trim()}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition">
          Share
        </button>
      </div>
    </div>
  );
}
