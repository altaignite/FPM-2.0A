'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react'
import { sectionLabels } from '@/lib/demo-data'
import { useWorkspaceRecords } from '@/lib/use-workspace-records'

const columns: Record<string, [string, string, string]> = {
  projects: ['Project', 'Credit allocation', 'Delivery date'],
  tasks: ['Task', 'Time logged', 'Updated'],
  subscriptions: ['Plan', 'Monthly price', 'Renewal'],
  credits: ['Allocation', 'Balance', 'Reset date'],
  tickets: ['Department', 'Priority', 'Last activity'],
  invoices: ['Description', 'Amount', 'Issued'],
}

export default function RecordsTable({ section }: { section: string }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [direction, setDirection] = useState<'asc' | 'desc' | null>(null)
  const { rows } = useWorkspaceRecords(section)
  const [titleLabel, valueLabel, dateLabel] = columns[section] ?? ['Details', 'Value', 'Updated']
  const label = sectionLabels[section] ?? 'Records'
  const visible = rows.filter(row => (!status || row.status === status) && `${row.reference} ${row.title} ${row.meta} ${row.status}`.toLowerCase().includes(query.trim().toLowerCase()))
  if (direction) visible.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }) * (direction === 'asc' ? 1 : -1))
  const SortIcon = direction === 'asc' ? ArrowUp : direction === 'desc' ? ArrowDown : ArrowUpDown

  return <div className="records-table">
    <div className="table-toolbar">
      <label className="table-search"><Search size={16} aria-hidden="true" /><input type="search" aria-label={`Search ${label.toLowerCase()}`} placeholder={`Search ${label.toLowerCase()}...`} value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label className="table-filter"><span>Status</span><select aria-label="Filter by status" value={status} onChange={event => setStatus(event.target.value)}><option value="">All statuses</option>{[...new Set(rows.map(row => row.status))].map(value => <option key={value}>{value}</option>)}</select></label>
    </div>
    <div className="table-wrap" role="region" aria-label={`${label} table — scroll horizontally for more columns`} tabIndex={0}>
      <table className={`data-table records-${section}`}>
        <caption className="sr-only">{label}</caption>
        <thead><tr>
          <th scope="col" aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'}><button className="table-sort" onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}>Reference<SortIcon size={14} aria-hidden="true" /></button></th>
          {section !== 'tickets' && <th scope="col">{titleLabel}</th>}{section === 'tickets' && <th scope="col">Department</th>}<th scope="col">Status</th><th scope="col" className="table-value">{valueLabel}</th><th scope="col">{dateLabel}</th>
        </tr></thead>
        <tbody>{visible.map(row => <tr key={row.id}>
          <th scope="row"><Link className="record-title record-reference" href={`/${section}/${row.id}`} aria-label={`View ${row.reference}`}>{row.reference}</Link></th>
          {section !== 'tickets' && <td>{row.title}</td>}{section === 'tickets' && <td>{row.meta}</td>}
          <td><span className={`status ${row.status.toLowerCase().replaceAll(' ', '-')}`}><span className="status-dot" aria-hidden="true" />{row.status}</span></td>
          <td className="table-value">{row.value}</td><td className="table-date">{row.date}</td>
        </tr>)}</tbody>
      </table>
      {visible.length === 0 && <div className="table-empty"><strong>No matching records</strong><p>Try another search or status.</p><button onClick={() => { setQuery(''); setStatus('') }}>Clear filters</button></div>}
    </div>
    <div className="table-footer" role="status">Showing {visible.length} of {rows.length} {rows.length === 1 ? 'record' : 'records'}</div>
  </div>
}
