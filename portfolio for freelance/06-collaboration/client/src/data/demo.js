export const MOCK_USER = {
  uid: 'demo-user-6',
  displayName: 'Riley Morgan',
  email: 'riley@demo.com',
  photoURL: '',
};

export const DEMO_DOCS = [
  {
    id: 'd1',
    title: 'Q2 Product Roadmap',
    content: `## Q2 2026 — Product Roadmap

### Theme: User Experience & Performance

**April**
- Redesign onboarding flow based on user feedback
- Implement lazy loading for the main dashboard
- Ship dark mode (finally!)

**May**
- Launch new analytics module
- Integrate Stripe for subscription management
- Performance audit — target sub-2s LCP

**June**
- Public API beta
- Multi-workspace support
- Quarterly retrospective + Q3 planning

### Success Metrics
- Reduce churn by 15%
- NPS > 45
- P99 latency below 200ms`,
    ownerId: 'demo-user-6',
    ownerName: 'Riley Morgan',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    comments: [
      { id: 'c1', authorName: 'Maya Lai', text: 'Dark mode is going to be huge. Prioritize it for April.', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { id: 'c2', authorName: 'Ken Rivera', text: 'Should we include mobile app milestones here too?', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { id: 'c3', authorName: 'Riley Morgan', text: 'Good point — let me add a mobile section.', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 'd2',
    title: 'Design System Notes',
    content: `# Design System v2

## Color Tokens
- Primary: #7c3aed (Violet 600)
- Surface: #ffffff, #f9fafb, #f3f4f6
- Text: #111827, #6b7280, #9ca3af

## Typography
- Headings: Inter, weight 700
- Body: Inter, weight 400
- Code: JetBrains Mono, weight 400

## Component Status
| Component | Status | Owner |
|-----------|--------|-------|
| Button    | Done   | Maya  |
| Input     | Done   | Ken   |
| Modal     | WIP    | Riley |
| Table     | Todo   | —     |
| Toast     | Done   | Maya  |`,
    ownerId: 'demo-user-6',
    ownerName: 'Riley Morgan',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    comments: [
      { id: 'c4', authorName: 'Maya Lai', text: 'Button component is ready for review.', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 'd3',
    title: 'Meeting Notes — Sprint 42',
    content: `# Sprint 42 Retrospective

**Attendees:** Riley, Maya, Ken, Priya
**Date:** April 28, 2026

## What went well
- Shipped the notification system ahead of schedule
- Zero P0 bugs this sprint
- New code review process is working great

## What to improve
- PR review turnaround time still too slow
- Integration tests need more coverage
- Documentation is lagging behind features

## Action items
- Maya: Set up automated PR reminders in Slack
- Ken: Write integration tests for auth flow
- Riley: Schedule docs sprint for next week
- Priya: Investigate test flakiness in CI`,
    ownerId: 'demo-user-6',
    ownerName: 'Riley Morgan',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    comments: [],
  },
  {
    id: 'd4',
    title: 'API Design Draft',
    content: `# REST API v2 Design

## Authentication
POST /api/v2/auth/login
POST /api/v2/auth/refresh

## Users
GET    /api/v2/users
GET    /api/v2/users/:id
PATCH  /api/v2/users/:id

## Workspaces
GET    /api/v2/workspaces
POST   /api/v2/workspaces
PATCH  /api/v2/workspaces/:id
DELETE /api/v2/workspaces/:id

## Documents
GET    /api/v2/workspaces/:wid/docs
POST   /api/v2/workspaces/:wid/docs
GET    /api/v2/docs/:id
PATCH  /api/v2/docs/:id
DELETE /api/v2/docs/:id

### Response Format
\`\`\`json
{
  "data": {},
  "meta": { "page": 1, "total": 42 },
  "errors": []
}
\`\`\``,
    ownerId: 'demo-user-6',
    ownerName: 'Riley Morgan',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    comments: [
      { id: 'c5', authorName: 'Ken Rivera', text: 'Should we use cursor-based pagination instead?', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    ],
  },
];

export const MOCK_PRESENCE = [
  { uid: 'demo-user-6', name: 'Riley Morgan', color: '#7c3aed' },
  { uid: 'seed1', name: 'Maya Lai', color: '#dc2626' },
];
