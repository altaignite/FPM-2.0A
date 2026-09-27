import type { TaskDetail } from './task-requests'

export const taskDetails: Record<string, TaskDetail> = {
  'task-1': { owner: 'Alex Morgan · SEO specialist', due: '26 Mar 2025', estimate: 6, brief: 'Prepare an actionable organic search brief for the next content cycle. Group target keywords by intent and translate the research into article outlines for the content team.', deliverables: ['Keyword clusters and search intent mapping', 'Competitor content gap analysis', 'Three prioritized article outlines'], activity: ['Research scope confirmed with Jane Doe', 'Keyword discovery started', '4.5 hours logged against the research brief'] },
  'task-2': { owner: 'Sam Rivera · Designer', due: '25 Mar 2025', estimate: 4, brief: 'Refine the campaign landing page hierarchy and mobile layout. Review the revised hero, proof points, and lead capture flow before implementation.', deliverables: ['Revised desktop layout', 'Mobile layout and interaction notes', 'Client approval of the design direction'], activity: ['Initial design feedback received', 'Desktop and mobile revisions prepared', 'Moved to client review'] },
  'task-3': { owner: 'Taylor Chen · Paid media specialist', due: '18 Mar 2025', estimate: 6, brief: 'Prepare the paid social campaign structure, audience definitions, and tracking checklist for the approved campaign brief.', deliverables: ['Campaign and ad set structure', 'Audience and creative mapping', 'Tracking and launch checklist'], activity: ['Campaign scope approved', 'Campaign configuration completed', 'Delivery accepted on 18 Mar 2025'] },
}

export const ticketDetails: Record<string, { owner: string; related: string; messages: { author: string; time: string; text: string }[] }> = {
  'ticket-1': { owner: 'Morgan Lee · Client support', related: '/tasks/task-3', messages: [
    { author: 'Jane Doe', time: '24 Mar 2025 · 09:15', text: 'Can you clarify which conversion events are included in the paid social campaign report?' },
    { author: 'Morgan Lee', time: '24 Mar 2025 · 10:00', text: 'We are checking the reporting configuration with the paid media team. We will confirm the event definitions and attribution window here.' },
  ] },
  'ticket-2': { owner: 'Alex Morgan · SEO specialist', related: '/tasks/task-1', messages: [
    { author: 'Alex Morgan', time: '23 Mar 2025 · 14:30', text: 'Before finalizing the article outlines, could you confirm the priority audience and the three services you want to emphasize?' },
  ] },
}
