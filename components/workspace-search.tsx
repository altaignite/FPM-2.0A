'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { records, sectionLabels } from '@/lib/demo-data'

export default function WorkspaceSearch() {
  const params = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const matches = Object.entries(records).flatMap(([section, rows]) => rows.filter(row => `${row.reference} ${row.title} ${row.meta} ${row.status}`.toLowerCase().includes(query.toLowerCase())).map(row => ({ section, row })))
  return <><div className="welcome"><div><p className="eyebrow">WORKSPACE SEARCH</p><h1>{query ? 'Search results' : 'Search your workspace'}</h1><p className="welcome-sub">{query ? `Results for “${query}”` : 'Search by reference number, title, service, or status.'}</p></div></div><section className="card workspace-content search-results"><h2>{matches.length} {matches.length === 1 ? 'record' : 'records'} found</h2>{matches.length ? <div className="table-wrap" role="region" aria-label="Search results" tabIndex={0}><table className="data-table"><thead><tr><th>Reference</th><th>Area</th><th>Description</th><th>Status</th></tr></thead><tbody>{matches.map(({ section, row }) => <tr key={`${section}/${row.id}`}><th scope="row"><Link className="record-title record-reference" href={`/${section}/${row.id}`}>{row.reference}</Link></th><td>{sectionLabels[section]}</td><td>{row.title}</td><td><span className={`status ${row.status.toLowerCase().replaceAll(' ', '-')}`}><span className="status-dot" aria-hidden="true" />{row.status}</span></td></tr>)}</tbody></table></div> : <p className="welcome-sub">Enter a reference, task name, service, invoice, or ticket term in the search field.</p>}</section></>
}
