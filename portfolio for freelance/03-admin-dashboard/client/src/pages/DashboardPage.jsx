const USERS = [
  { id: '1', name: 'Alice Chen',    email: 'alice@example.com',   role: 'Admin',  status: 'Active',   joined: '2024-01-12' },
  { id: '2', name: 'Bob Martinez',  email: 'bob@example.com',     role: 'Editor', status: 'Active',   joined: '2024-02-05' },
  { id: '3', name: 'Carol White',   email: 'carol@example.com',   role: 'Viewer', status: 'Inactive', joined: '2024-03-18' },
  { id: '4', name: 'Dan Singh',     email: 'dan@example.com',     role: 'Editor', status: 'Active',   joined: '2024-04-01' },
  { id: '5', name: 'Eva Kowalski',  email: 'eva@example.com',     role: 'Viewer', status: 'Active',   joined: '2024-05-22' },
];

const ACTIVITY = [
  { user: 'Alice Chen',   action: 'Published new post "Q1 Report"',  time: '2 min ago'  },
  { user: 'Bob Martinez', action: 'Updated user permissions',         time: '14 min ago' },
  { user: 'Carol White',  action: 'Uploaded 3 new media files',       time: '1 hr ago'   },
  { user: 'Dan Singh',    action: 'Deleted draft "Old Proposal"',     time: '3 hrs ago'  },
  { user: 'Eva Kowalski', action: 'Logged in from new device',        time: '5 hrs ago'  },
];

const KPI = [
  { label: 'Total Users',     value: '12,483', delta: '+8.2%',  positive: true  },
  { label: 'Revenue (MoM)',   value: '$94,210', delta: '+12.4%', positive: true  },
  { label: 'Active Sessions', value: '1,842',  delta: '-3.1%',  positive: false },
  { label: 'Bounce Rate',     value: '24.6%',  delta: '-1.8%',  positive: true  },
];

const CHART_DATA = [42, 58, 51, 67, 73, 89, 76, 95, 88, 102, 118, 131];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const max = Math.max(...CHART_DATA);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back — here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(k => (
          <div key={k.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{k.label}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${k.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{k.delta}</span>
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Revenue (K) — 2024</h3>
          <div className="flex items-end gap-1.5 h-32">
            {CHART_DATA.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-indigo-600 rounded-t-sm hover:bg-indigo-400 transition" style={{ height: `${(v / max) * 100}%` }} title={`$${v}K`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {MONTHS.map(m => <span key={m} className="text-xs text-gray-600">{m}</span>)}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 grid place-items-center shrink-0 text-indigo-400 text-xs font-bold">{a.user[0]}</div>
                <div>
                  <p className="text-sm text-gray-200 leading-snug">{a.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.user} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="font-semibold text-white">Users</h3>
          <span className="text-xs text-gray-500">{USERS.length} total</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {['Name','Email','Role','Status','Joined'].map(h => (
                <th key={h} className={`text-left px-5 py-3 text-gray-500 font-medium ${h === 'Email' ? 'hidden sm:table-cell' : h === 'Joined' ? 'hidden md:table-cell' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="px-5 py-3 text-white font-medium">{u.name}</td>
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
      </div>
    </div>
  );
}
