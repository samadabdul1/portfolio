import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/"         element={<DashboardPage />} />
          <Route path="/users"    element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*"         element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
