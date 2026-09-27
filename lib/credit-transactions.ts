export type CreditTransaction = {
  id: string
  date: string
  description: string
  related: string
  reference: string
  type: 'Credit' | 'Debit'
  amount: number
  status: 'Posted' | 'Pending'
}

// Entries are in posting order. Pending entries do not affect the balance.
export const creditTransactions: CreditTransaction[] = [
  { id: 'CRD-82374109', date: '2025-03-01', description: 'Monthly allowance', related: 'Growth plan · March 2025', reference: '/subscriptions/growth', type: 'Credit', amount: 30, status: 'Posted' },
  { id: 'CRD-82374110', date: '2025-03-18', description: 'Task time charged', related: 'Paid social campaign setup', reference: '/tasks/task-3', type: 'Debit', amount: 6, status: 'Posted' },
  { id: 'CRD-82374111', date: '2025-03-23', description: 'Task time charged', related: 'Landing page design revisions', reference: '/tasks/task-2', type: 'Debit', amount: 3, status: 'Posted' },
  { id: 'CRD-82374112', date: '2025-03-24', description: 'Task time charged', related: 'SEO content brief and keyword research', reference: '/tasks/task-1', type: 'Debit', amount: 2.5, status: 'Posted' },
  { id: 'CRD-82374113', date: '2025-03-24', description: 'Task time awaiting review', related: 'SEO content brief and keyword research', reference: '/tasks/task-1', type: 'Debit', amount: 2, status: 'Pending' },
]

export function buildCreditLedger(transactions: CreditTransaction[]) {
  let balance = 0
  return transactions.map(transaction => {
    if (transaction.status === 'Posted') balance += transaction.type === 'Credit' ? transaction.amount : -transaction.amount
    return { ...transaction, balance: transaction.status === 'Posted' ? balance : null }
  })
}
