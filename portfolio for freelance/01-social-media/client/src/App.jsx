import { Routes, Route, Navigate } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/"        element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
