export const MOCK_USER = {
  uid: 'demo-user-5',
  displayName: 'Taylor Kim',
  email: 'taylor@demo.com',
  photoURL: '',
};

export const SEED_JOBS = [
  { id: 'j1', title: 'Senior Frontend Engineer', company: 'Stripe', location: 'Remote', type: 'Full-time', salary: '$160k–$200k', tags: ['React', 'TypeScript', 'GraphQL'], description: 'We are looking for a Senior Frontend Engineer to help build the next generation of financial products.', postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), applicants: 12 },
  { id: 'j2', title: 'Product Designer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$140k–$175k', tags: ['Figma', 'Prototyping', 'UX Research'], description: 'Join our design team to craft intuitive and beautiful product experiences.', postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), applicants: 8 },
  { id: 'j3', title: 'Backend Engineer (Go)', company: 'Cloudflare', location: 'Austin, TX', type: 'Full-time', salary: '$150k–$190k', tags: ['Go', 'Distributed Systems', 'Kubernetes'], description: 'Help us build the infrastructure that powers the internet.', postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), applicants: 5 },
  { id: 'j4', title: 'DevOps Engineer', company: 'Vercel', location: 'Remote', type: 'Contract', salary: '$100–$130/hr', tags: ['AWS', 'Terraform', 'CI/CD'], description: 'Improve our deployment pipelines and infrastructure reliability.', postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), applicants: 3 },
  { id: 'j5', title: 'iOS Developer', company: 'Linear', location: 'Remote', type: 'Full-time', salary: '$130k–$160k', tags: ['Swift', 'SwiftUI', 'iOS'], description: 'Build exceptional native iOS experiences for our project management product.', postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), applicants: 7 },
  { id: 'j6', title: 'Data Scientist', company: 'Notion', location: 'New York, NY', type: 'Full-time', salary: '$135k–$165k', tags: ['Python', 'ML', 'SQL'], description: 'Extract insights from our data to drive product decisions.', postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), applicants: 15 },
];
