import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName]   = useState('Demo User');
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Display name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input type="email" value="demo@example.com" readOnly
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-gray-500 cursor-not-allowed"/>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition">Save changes</button>
            {saved && <span className="text-sm text-emerald-400 font-medium">Saved!</span>}
          </div>
        </form>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Notifications</h2>
        {[
          { label: 'Email alerts for new sign-ups', desc: 'Get notified when a new user registers', on: true },
          { label: 'Weekly digest', desc: 'Summary of activity sent every Monday', on: false },
          { label: 'Security alerts', desc: 'Alerts for suspicious login attempts', on: true },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between py-3 border-b border-gray-800 last:border-0">
            <div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
              <input type="checkbox" defaultChecked={item.on} className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600 transition"/>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"/>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
