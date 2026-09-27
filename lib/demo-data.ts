export type RecordItem = { id: string; reference: string; title: string; meta: string; status: string; value: string; date: string }

export const records: Record<string, RecordItem[]> = {
  projects: [
    { id: 'project-1', reference: 'PRJ-82374101', title: 'Organic growth programme', meta: 'SEO and content', status: 'In progress', value: '18.5 credits', date: '30 Apr 2025' },
    { id: 'project-2', reference: 'PRJ-82374102', title: 'Paid social launch', meta: 'Paid media', status: 'In review', value: '12 credits', date: '15 Apr 2025' },
  ],
  tasks: [
    { id: 'task-1', reference: 'TSK-82374101', title: 'SEO content brief and keyword research', meta: 'SEO', status: 'In progress', value: '4.5 hrs', date: 'Today' },
    { id: 'task-2', reference: 'TSK-82374102', title: 'Landing page design revisions', meta: 'Design', status: 'In review', value: '3 hrs', date: 'Yesterday' },
    { id: 'task-3', reference: 'TSK-82374103', title: 'Paid social campaign setup', meta: 'Paid media', status: 'Completed', value: '6 hrs', date: '18 Mar 2025' },
  ],
  subscriptions: [{ id: 'growth', reference: 'MBR-82374116', title: 'Growth', meta: '30 monthly credits', status: 'Active', value: '$2,400 / month', date: '29 Mar 2025' }],
  credits: [{ id: 'credit-1', reference: 'CRD-82374109', title: 'March 2025 credit allowance', meta: '1 credit = 1 hour completed', status: 'Available', value: '18.5 credits', date: 'Resets 29 Mar 2025' }],
  tickets: [{ id: 'ticket-1', reference: 'TKT-82374114', title: 'Campaign reporting question', meta: 'General support', status: 'Open', value: 'Normal', date: '2 hours ago' }, { id: 'ticket-2', reference: 'TKT-82374115', title: 'Brief clarification needed', meta: 'Task support', status: 'Waiting on you', value: 'Normal', date: 'Yesterday' }],
  invoices: [{ id: 'invoice-1', reference: 'INV-82374103', title: 'Growth plan subscription', meta: 'Growth plan subscription', status: 'Paid', value: '$2,400.00', date: '28 Feb 2025' }],
}

export const sectionLabels: Record<string, string> = { projects: 'Projects', tasks: 'Tasks', subscriptions: 'Subscriptions', credits: 'Credits', tickets: 'Support tickets', invoices: 'Invoices' }

export function getRecord(section: string, id: string) { return records[section]?.find((record) => record.id === id) }
