import { useState } from 'react';

const USERS = [
  { id: '1', name: 'Alice Chen',    email: 'alice@example.com',   role: 'Admin',  status: 'Active',   joined: '2024-01-12' },
  { id: '2', name: 'Bob Martinez',  email: 'bob@example.com',     role: 'Editor', status: 'Active',   joined: '2024-02-05' },
  { id: '3', name: 'Carol White',   email: 'carol@example.com',   role: 'Viewer', status: 'Inactive', joined: '2024-03-18' },
  { id: '4', name: 'Dan Singh',     email: 'dan@example.com',     role: 'Editor', status: 'Active',   joined: '2024-04-01' },
  { id: '5', name: 'Eva Kowalski',  email: 'eva@example.com',     role: 'Viewer', status: 'Active',   joined: '2024-05-22' },
  { id: '6', name: 'Felix Grant',   email: 'felix@example.com',   role: 'Viewer', status: 'Active',   joined: '2024-06-10' },
  { id: '7', name: 'Grace Huang',   email: 'grace@example.com',   role: 'Editor', status: 'Active',   joined: '2024-07-03' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-500 text-sm mt-1">Manage team members and permissions</p>
      </div>
      <div className="relative max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…"
          className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {['Name','Email','Role','Status','Joined'].map(h => (
                <th key={h} className={`text-left px-5 py-3 text-gray-500 font-medium ${h === 'Email' ? 'hidden sm:table-cell' : h === 'Joined' ? 'hidden md:table-cell' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 grid place-items-center text-indigo-400 text-xs font-bold">{u.name[0]}</div>
                    <span className="text-white font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.role === 'Admin' ? 'bg-indigo-500/10 text-indigo-400' : u.role === 'Editor' ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-500/10 text-gray-400'}`}>{u.role}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === 'Active' ? 'text-emerald-400' : 'text-gray-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-gray-600'}`}/>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8 text-sm">No users found.</p>}
      </div>
    </div>
  );
}
