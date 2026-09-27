'use client'

import Link from 'next/link'
import CreditsLedger from './credits-ledger'
import SubscriptionManagement from './subscription-management'
import SubscriptionOverview from './subscription-overview'
import { useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Download } from 'lucide-react'
import type { TaskDetail } from '@/lib/task-requests'
import { type RecordItem, sectionLabels } from '@/lib/demo-data'
import { taskDetails, ticketDetails } from '@/lib/operations-data'
import { useWorkspaceRecords, type RecordUpdates } from '@/lib/use-workspace-records'

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="card ops-panel"><h2>{title}</h2>{children}</section>
}
function Facts({ items }: { items: [string, string][] }) {
  return <dl className="ops-facts">{items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
}
function Related({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="ops-related" href={href}>{children}<ArrowUpRight size={15} /></Link>
}
function Ledger({ children, headers }: { children: ReactNode; headers: string[] }) {
  return <div className="table-wrap ops-table-wrap" role="region" aria-label={headers.join(', ')} tabIndex={0}><table className="data-table ops-table"><thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>
}

export default function RecordDetail({ section, record, taskOverride }: { section: string; record: RecordItem; taskOverride?: TaskDetail }) {
  const { rows, updates, save, ready } = useWorkspaceRecords(section)
  const status = rows.find(row => row.id === record.id)?.status ?? record.status
  const saved = updates[`${section}/${record.id}`] ?? {}
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const task = section === 'tasks' ? taskOverride ?? taskDetails[record.id] : undefined
  const ticket = section === 'tickets' ? ticketDetails[record.id] : undefined
  const notes = saved.notes ?? []
  function update(value: RecordUpdates) {
    try { save(record.id, value); setMessage('Saved in this browser.'); return true }
    catch { setMessage('Changes could not be saved. Your browser storage may be unavailable.'); return false }
  }
  function downloadInvoice() {
    const blob = new Blob(['INVOICE SUMMARY\nINV-82374103\nIssued: 28 Feb 2025\nService period: 01–28 Mar 2025\nGrowth plan — 30 credits\nSubtotal: USD 2,400.00\nTax: USD 0.00\nTotal: USD 2,400.00\nPaid: USD 2,400.00\nBalance: USD 0.00\n'], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'INV-82374103-summary.txt'; anchor.click()
    URL.revokeObjectURL(url)
  }
  return <div className="ops-detail">
    <Link className="ops-back" href={`/${section}`}><ArrowLeft size={14} />{sectionLabels[section]}</Link>
    <header className="ops-heading"><div><p className="eyebrow">{record.reference} · {record.meta}</p><h1>{record.title}</h1></div><span className={`ops-status ${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span></header>
    <div role="status" className="ops-feedback">{message}</div>

    {(task || ticket) && <div className="ops-layout"><div className="ops-stack">
      {task && <>
        <Panel title="Brief"><p className="ops-copy">{task.brief}</p><div className="ops-callout"><strong>Next step</strong><p>{status === 'Draft' ? 'Your request is saved locally. It has not been sent to your team or scheduled.' : status === 'Completed' ? 'Your request is complete. Contact your team below if you need follow-up work.' : status === 'In review' ? 'Your team has marked this request ready for review. Use the feedback section below to prepare your comments.' : 'Your team is working on this request. You can review the scope and prepare additional feedback below.'}</p></div></Panel>
        <Panel title="Requested deliverables"><ul className="ops-inclusions">{task.deliverables.map(item => <li key={item}><CheckCircle2 size={16} /><span>{item}</span></li>)}</ul><p className="ops-caption">Delivery files will appear here when shared by your team.</p></Panel>
        <Panel title="Time & credits"><Facts items={[["Logged", record.value], ['Estimate', task.estimate === null ? 'Not estimated' : `${task.estimate} hrs`], ['Remaining estimate', task.estimate === null ? 'Not estimated' : `${Math.max(0, task.estimate - parseFloat(record.value))} hrs`]]} /><p className="ops-caption">Logged time and posted credit deductions can differ while work is being reviewed.</p></Panel>
        <Panel title="Progress updates"><ol className="ops-timeline">{task.activity.map(item => <li key={item}><Clock3 size={14} /><span>{item}</span></li>)}</ol></Panel>
      </>}
      {ticket && <Panel title="Conversation"><div className="ops-conversation">{ticket.messages.map((item, index) => <article key={index}><div><strong>{item.author}</strong><time>{item.time}</time></div><p>{item.text}</p></article>)}</div></Panel>}
      <Panel title={ticket ? 'Your reply' : 'Your feedback'}>
        {notes.length === 0 ? <p className="ops-caption">{ticket ? 'No reply drafts yet. Drafts are not sent to the support team.' : 'Share questions, clarify your brief, or prepare feedback for your team.'}</p> : <div className="ops-conversation">{notes.map((item, index) => <article key={index}><div><strong>Jane Doe · {ticket ? 'Unsent reply' : 'Unsent feedback'}</strong><time>{item.time}</time></div><p>{item.text}</p></article>)}</div>}
        <form className="request-form" onSubmit={event => { event.preventDefault(); if (note.trim() && update({ notes: [...notes, { text: note.trim(), time: new Date().toISOString() }] })) setNote('') }}><label>{ticket ? 'Draft a reply' : 'Draft feedback'}<textarea rows={3} required value={note} onChange={event => setNote(event.target.value)} placeholder={ticket ? 'Write your response for the support team…' : 'Tell your team what you think or what needs to change…'} /></label><button className="primary" disabled={!ready || !note.trim()}>{ticket ? 'Save reply draft' : 'Save feedback draft'}</button></form>
      </Panel>
    </div><aside className="ops-stack">
      <Panel title={task ? 'Request details' : 'Support details'}><Facts items={task ? [['Your contact', task.owner], ['Requested by', 'Jane Doe'], ['Preferred delivery date', task.requestedDate || 'Not specified'], ['Confirmed delivery date', task.due], ['Service', record.meta]] : [['Your contact', ticket!.owner], ['Requested by', 'Jane Doe'], ['Department', record.meta], ['Priority', record.value], ['Last activity', record.date]]} /></Panel>
      <Panel title="Related work">{task ? <><Related href="/credits/credit-1">Credit allowance</Related><Related href="/subscriptions/growth">Growth subscription</Related><Related href="/tickets">Support tickets</Related></> : <Related href={ticket!.related}>Related task</Related>}</Panel>
    </aside></div>}

    {section === 'projects' && <div className="ops-layout"><div className="ops-stack"><Panel title="Project overview"><p className="ops-copy">{record.id === 'project-1' ? 'A coordinated SEO and content programme focused on improving organic visibility and producing high-priority content assets.' : 'A paid social launch programme covering campaign setup, audience definition, creative mapping, and reporting readiness.'}</p><dl className="ops-facts"><div><dt>Service</dt><dd>{record.meta}</dd></div><div><dt>Delivery date</dt><dd>{record.date}</dd></div><div><dt>Credit allocation</dt><dd>{record.value}</dd></div></dl></Panel><Panel title="Milestones"><Ledger headers={['Milestone', 'Status', 'Target date']}><tr><td>Discovery and scope</td><td>Completed</td><td>05 Mar 2025</td></tr><tr><td>Delivery in progress</td><td>{record.status}</td><td>{record.date}</td></tr><tr><td>Client review and approval</td><td>Pending</td><td>{record.date}</td></tr></Ledger></Panel><Panel title="Deliverables"><Ledger headers={['Deliverable', 'Version', 'Status']}><tr><td>{record.id === 'project-1' ? 'Content strategy and keyword brief' : 'Campaign structure and tracking checklist'}</td><td>v1.0</td><td>In review</td></tr></Ledger></Panel></div><aside className="ops-stack"><Panel title="Project controls"><Related href="/tasks">View linked tasks</Related><Related href="/tickets">View support tickets</Related><Related href="/credits">View credit transactions</Related></Panel><Panel title="Files"><p className="ops-caption">Project files and approval history will appear here when shared by your account team.</p></Panel></aside></div>}

    {section === 'subscriptions' && <SubscriptionOverview />}

    {section === 'credits' && <CreditsLedger embedded />}

    {section === 'invoices' && <div className="ops-layout"><div className="ops-stack">
      <Panel title="Invoice breakdown"><div className="ops-invoice-parties"><div><span className="ops-caption">Issued by</span><strong>First Person Marketing</strong></div><div><span className="ops-caption">Billed to</span><strong>Jane Doe</strong></div></div><Ledger headers={['Description', 'Quantity', 'Unit price', 'Amount']}><tr><td>Growth plan · March 2025 · 30 monthly credits</td><td>1</td><td>$2,400.00</td><td>$2,400.00</td></tr></Ledger><dl className="ops-totals"><div><dt>Subtotal</dt><dd>$2,400.00</dd></div><div><dt>Tax</dt><dd>$0.00</dd></div><div><dt>Total · USD</dt><dd>$2,400.00</dd></div><div><dt>Paid</dt><dd>$2,400.00</dd></div><div><dt>Balance due</dt><dd>$0.00</dd></div></dl></Panel>
      <Panel title="Payment record"><Facts items={[["Status", 'Paid'], ['Recorded on', '28 Feb 2025'], ['Amount', 'USD 2,400.00']]} /><p className="ops-caption">Payment status and invoice totals are shown above.</p></Panel>
    </div><aside className="ops-stack"><Panel title="Invoice details"><Facts items={[["Invoice number", record.reference], ['Issued', '28 Feb 2025'], ['Due date', '01 Mar 2025'], ['Service period', '01–28 Mar 2025'], ['Currency', 'USD']]} /><button className="outline-button" onClick={downloadInvoice}><Download size={15} />Export summary</button><p className="ops-caption">Text summary for review.</p></Panel><Panel title="Related records"><Related href="/subscriptions/growth">Growth subscription</Related><Related href="/support">Billing support</Related></Panel></aside></div>}
  </div>
}
