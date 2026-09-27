'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { buildCreditLedger, creditTransactions } from '@/lib/credit-transactions'

const ledger = buildCreditLedger(creditTransactions)
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function CreditsLedger({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const rows = [...ledger].reverse().filter(row => (!type || row.type === type) && (!status || row.status === status) && `${row.id} ${row.description} ${row.related}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <>
    {!embedded && <div className="welcome"><div><p className="eyebrow">YOUR ACCOUNT</p><h1>Credits</h1><p className="welcome-sub">Track credits added to your account and allocated to your tasks.</p></div><div className="page-actions"><Link className="outline-button" href="/subscriptions/growth">View subscription</Link><Link className="primary" href="/credits/top-up">Top up credits</Link></div></div>}
    <section className="panel card records-table">
      <div className="panel-head"><div><h2>Credit transactions</h2><p>Credits are applied when task time is posted.</p></div></div>
      <div className="table-toolbar credit-toolbar">
        <label className="table-search"><Search size={16} aria-hidden="true" /><input type="search" aria-label="Search credit transactions" placeholder="Search reference, transaction, or task…" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label className="table-filter">Type<select aria-label="Transaction type" value={type} onChange={event => setType(event.target.value)}><option value="">All types</option><option>Credit</option><option>Debit</option></select></label>
        <label className="table-filter">Status<select aria-label="Transaction status" value={status} onChange={event => setStatus(event.target.value)}><option value="">All statuses</option><option>Posted</option><option>Pending</option></select></label>
      </div>
      <div className="table-wrap" role="region" aria-label="Credit transactions — scroll horizontally for more columns" tabIndex={0}>
        <table className="data-table credit-ledger"><caption className="sr-only">Credit and debit transaction history. Amounts and balances are in credits.</caption>
          <thead><tr><th scope="col">Date</th><th scope="col">Reference</th><th scope="col">Description</th><th scope="col">Task / source</th><th scope="col">Type</th><th scope="col" className="table-value">Amount</th><th scope="col">Status</th><th scope="col" className="table-value">Balance</th></tr></thead>
          <tbody>{rows.map(row => <tr key={row.id}>
            <td className="table-date">{dateFormat.format(new Date(`${row.date}T00:00:00Z`))}</td>
            <th scope="row">{row.id}</th>
            <td>{row.description}</td>
            <td><Link className="credit-related" href={row.reference}>{row.related}</Link></td>
            <td>{row.type}</td>
            <td className={`table-value ${row.type === 'Credit' ? 'credit-addition' : ''}`}>{row.type === 'Credit' ? '+' : '−'}{row.amount.toFixed(1)}</td>
            <td><span className={`status ${row.status === 'Posted' ? 'completed' : 'in-progress'}`}><span className="status-dot" aria-hidden="true" />{row.status}</span></td>
            <td className="table-value">{row.balance === null ? <span aria-label="Not posted">—</span> : row.balance.toFixed(1)}</td>
          </tr>)}</tbody>
        </table>
        {!rows.length && <div className="table-empty"><strong>No matching transactions</strong><p>Try another task, transaction ID, or filter.</p><button onClick={() => { setQuery(''); setType(''); setStatus('') }}>Clear filters</button></div>}
      </div>
      <div className="table-footer" role="status">Showing {rows.length} of {ledger.length} transactions</div>
    </section>
    <p className="ops-caption">Balances reflect posted transactions only. Pending debits do not reduce your available credits.</p>
  </>
}
