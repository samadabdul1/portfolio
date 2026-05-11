export const MOCK_USER = {
  uid: 'demo-user-3',
  displayName: 'Admin Demo',
  email: 'admin@demo.com',
  photoURL: '',
};

export const KPI = [
  { label: 'Total Users', value: '12,483', delta: '+8.2%', positive: true, icon: 'users' },
  { label: 'Revenue (MoM)', value: '$94,210', delta: '+12.4%', positive: true, icon: 'dollar' },
  { label: 'Active Sessions', value: '1,842', delta: '-3.1%', positive: false, icon: 'activity' },
  { label: 'Bounce Rate', value: '24.6%', delta: '-1.8%', positive: true, icon: 'bounce' },
];

export const SEED_USERS = [
  { id: 'u1', name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-12' },
  { id: 'u2', name: 'Bob Martinez', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-05' },
  { id: 'u3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-18' },
  { id: 'u4', name: 'Dan Singh', email: 'dan@example.com', role: 'Editor', status: 'Active', joined: '2024-04-01' },
  { id: 'u5', name: 'Eva Kowalski', email: 'eva@example.com', role: 'Viewer', status: 'Active', joined: '2024-05-22' },
];

export const SEED_ACTIVITY = [
  { user: 'Alice Chen', action: 'Published new post "Q1 Report"', time: '2 min ago', type: 'publish' },
  { user: 'Bob Martinez', action: 'Updated user permissions', time: '14 min ago', type: 'settings' },
  { user: 'Carol White', action: 'Uploaded 3 new media files', time: '1 hr ago', type: 'upload' },
  { user: 'Dan Singh', action: 'Deleted draft "Old Proposal"', time: '3 hrs ago', type: 'delete' },
  { user: 'Eva Kowalski', action: 'Logged in from new device', time: '5 hrs ago', type: 'login' },
];

export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const CHART_DATA = [42, 58, 51, 67, 73, 89, 76, 95, 88, 102, 118, 131];
