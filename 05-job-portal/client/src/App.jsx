import JobsPage from './pages/JobsPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Navbar />
      <JobsPage />
    </div>
  );
}
