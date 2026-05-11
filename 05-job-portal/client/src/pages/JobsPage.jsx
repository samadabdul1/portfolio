import { useState } from 'react';
import ApplyModal from '../components/ApplyModal';
import PostJobModal from '../components/PostJobModal';

const DEMO_JOBS = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'Stripe',      location: 'Remote',             type: 'Full-time', salary: '$160k–$200k', tags: ['React','TypeScript','GraphQL'], description: 'We are looking for a Senior Frontend Engineer to help build the next generation of financial products.', applicants: 24 },
  { id: '2', title: 'Product Designer',         company: 'Figma',       location: 'San Francisco, CA',  type: 'Full-time', salary: '$140k–$175k', tags: ['Figma','Prototyping','UX Research'], description: 'Join our design team to craft intuitive and beautiful product experiences.', applicants: 18 },
  { id: '3', title: 'Backend Engineer (Go)',     company: 'Cloudflare',  location: 'Austin, TX',         type: 'Full-time', salary: '$150k–$190k', tags: ['Go','Distributed Systems','Kubernetes'], description: 'Help us build the infrastructure that powers the internet.', applicants: 31 },
  { id: '4', title: 'DevOps Engineer',           company: 'Vercel',      location: 'Remote',             type: 'Contract',  salary: '$100–$130/hr', tags: ['AWS','Terraform','CI/CD'], description: 'Improve our deployment pipelines and infrastructure reliability.', applicants: 9 },
  { id: '5', title: 'iOS Developer',             company: 'Linear',      location: 'Remote',             type: 'Full-time', salary: '$130k–$160k', tags: ['Swift','SwiftUI','iOS'], description: 'Build exceptional native iOS experiences for our project management product.', applicants: 15 },
  { id: '6', title: 'Data Scientist',            company: 'Notion',      location: 'New York, NY',       type: 'Full-time', salary: '$135k–$165k', tags: ['Python','ML','SQL'], description: 'Extract insights from our data to drive product decisions.', applicants: 22 },
];

export default function JobsPage() {
  const [jobs, setJobs]         = useState(DEMO_JOBS);
  const [selected, setSelected] = useState(DEMO_JOBS[0]);
  const [applyJob, setApplyJob] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [search, setSearch]     = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const types = ['All', ...new Set(jobs.map(j => j.type))];
  const filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    return (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q))
      && (typeFilter === 'All' || j.type === typeFilter);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs, companies, locations…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
        </div>
        <div className="flex gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}>
              {t}
            </button>
          ))}
          <button onClick={() => setShowPost(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition ml-2">
            + Post job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[600px]">
        <div className="lg:col-span-2 space-y-2 overflow-auto max-h-[700px] pr-1">
          {filtered.map(job => (
            <div key={job.id} onClick={() => setSelected(job)}
              className={`p-4 rounded-xl border cursor-pointer transition ${selected?.id === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                </div>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{job.type}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">📍 {job.location}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {job.tags.slice(0,3).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12 text-sm">No jobs found.</p>}
        </div>

        {selected ? (
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selected.title}</h2>
                <p className="text-gray-600 mt-1">{selected.company} · {selected.location}</p>
                <p className="text-blue-600 font-semibold text-sm mt-1">{selected.salary}</p>
              </div>
              <button onClick={() => setApplyJob(selected)}
                className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition">
                Apply now
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${selected.type === 'Full-time' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{selected.type}</span>
              {selected.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{t}</span>)}
            </div>
            <div className="text-gray-600 space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">About the role</h3>
                <p className="leading-relaxed">{selected.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">What you'll do</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Collaborate with cross-functional teams to design and ship features</li>
                  <li>Write clean, well-tested, and maintainable code</li>
                  <li>Mentor junior team members and participate in code reviews</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selected.tags.map(t => <li key={t}>Strong experience with {t}</li>)}
                  <li>3+ years of professional experience</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-400">{selected.applicants} applicants</p>
          </div>
        ) : (
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
            Select a job to view details
          </div>
        )}
      </div>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} onApplied={() => { setJobs(prev => prev.map(j => j.id === applyJob.id ? { ...j, applicants: j.applicants + 1 } : j)); setApplyJob(null); }} />}
      {showPost && <PostJobModal onClose={() => setShowPost(false)} onPosted={(job) => { setJobs(prev => [{ id: Date.now().toString(), ...job, applicants: 0 }, ...prev]); setShowPost(false); }} />}
    </div>
  );
}
