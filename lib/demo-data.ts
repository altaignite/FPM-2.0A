export type RecordItem = { id: string; title: string; meta: string; status: string; value: string; date: string }

export const records: Record<string, RecordItem[]> = {
  tasks: [
    { id: 'task-1', title: 'SEO content brief and keyword research', meta: 'SEO', status: 'In progress', value: '4.5 hrs', date: 'Today' },
    { id: 'task-2', title: 'Landing page design revisions', meta: 'Design', status: 'In review', value: '3 hrs', date: 'Yesterday' },
    { id: 'task-3', title: 'Paid social campaign setup', meta: 'Paid media', status: 'Completed', value: '6 hrs', date: '18 Mar 2025' },
  ],
  subscriptions: [{ id: 'growth', title: 'Growth plan', meta: '30 monthly credits', status: 'Active', value: '$2,400 / month', date: 'Renews 29 Mar 2025' }],
  credits: [{ id: 'credit-1', title: 'March 2025 credit allowance', meta: '1 credit = 1 hour completed', status: 'Available', value: '18.5 credits', date: 'Resets 29 Mar 2025' }],
  tickets: [{ id: 'ticket-1', title: 'Campaign reporting question', meta: 'General support', status: 'Open', value: 'Priority: Normal', date: 'Updated 2 hours ago' }, { id: 'ticket-2', title: 'Brief clarification needed', meta: 'Task support', status: 'Waiting on you', value: 'Priority: Normal', date: 'Updated yesterday' }],
  invoices: [{ id: 'invoice-1', title: 'INV-2025-003', meta: 'Growth plan subscription', status: 'Paid', value: '$2,400.00', date: '29 Feb 2025' }],
}

export const sectionLabels: Record<string, string> = { tasks: 'Tasks', subscriptions: 'Subscriptions', credits: 'Credits', tickets: 'Support tickets', invoices: 'Invoices' }

export function getRecord(section: string, id: string) { return records[section]?.find((record) => record.id === id) }
