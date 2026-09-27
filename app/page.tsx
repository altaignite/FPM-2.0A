'use client'

import { useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, Bell, CheckCircle2, ChevronRight,
  CircleHelp, Clock3, CreditCard, FileText, Grid2X2, Headphones, House,
  Menu, Plus, Search, Settings, Ticket, Users, WalletCards, X, Zap,
} from 'lucide-react'

const nav = [
  { label: 'Overview', icon: House },
  { label: 'Subscriptions', icon: CreditCard },
  { label: 'Tasks', icon: CheckCircle2 },
  { label: 'Credits', icon: Zap },
  { label: 'Support tickets', icon: Ticket },
  { label: 'Invoices', icon: FileText },
]

const tasks = [
  { title: 'SEO content brief and keyword research', type: 'SEO', status: 'In progress', hours: '4.5 hrs', date: 'Today' },
  { title: 'Landing page design revisions', type: 'Design', status: 'In review', hours: '3 hrs', date: 'Yesterday' },
  { title: 'Paid social campaign setup', type: 'Paid media', status: 'Completed', hours: '6 hrs', date: 'Mar 18, 2025' },
  { title: 'Monthly performance report', type: 'Reporting', status: 'Completed', hours: '2 hrs', date: 'Mar 16, 2025' },
]

function Brand() {
  return <div className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1712-DPupM5FLesuxf6YstfDbnd9g8opHU7.png" alt="First Person Marketing" /></div>
}

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <><button className={`overlay ${open ? 'show' : ''}`} onClick={close} aria-label="Close navigation" /><aside className={`sidebar ${open ? 'open' : ''}`}><div className="side-head"><Brand /><button className="close" onClick={close} aria-label="Close navigation"><X size={20} /></button></div><nav><p className="nav-section">GENERAL</p>{nav.slice(0, 2).map(({ label, icon: Icon }, index) => <button className={`nav-link ${index === 0 ? 'selected' : ''}`} key={label}><Icon size={18} /><span>{label}</span></button>)}<p className="nav-section">WORK MANAGEMENT</p>{nav.slice(2, 5).map(({ label, icon: Icon }) => <button className="nav-link" key={label}><Icon size={18} /><span>{label}</span>{label === 'Support tickets' && <em>2</em>}</button>)}<p className="nav-section">ACCOUNT</p>{nav.slice(5).map(({ label, icon: Icon }) => <button className="nav-link" key={label}><Icon size={18} /><span>{label}</span></button>)}</nav><div className="side-footer"><button className="nav-link"><CircleHelp size={18} /><span>Help center</span></button><button className="nav-link"><Settings size={18} /><span>Settings</span></button><div className="user"><span className="avatar">JD</span><div><strong>Jane Doe</strong><small>Admin</small></div><ChevronRight size={15} /></div></div></aside></>
}

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="header"><button className="menu" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button><div className="search"><Search size={17} /><span>Search tasks, invoices, tickets...</span></div><div className="header-right"><button className="icon-button"><Grid2X2 size={19} /></button><button className="icon-button notification"><Bell size={19} /><i /></button><span className="header-user">Jane Doe</span><span className="avatar small">JD</span></div></header>
}

function Stat({ title, value, detail, icon: Icon, accent }: { title: string; value: string; detail: string; icon: typeof WalletCards; accent: string }) {
  return <div className="stat card"><div className={`stat-icon ${accent}`}><Icon size={19} /></div><div><p>{title}</p><strong>{value}</strong><small>{detail}</small></div></div>
}

function Dashboard() {
  return <><div className="welcome"><div><p className="eyebrow">MONDAY, 24 MARCH 2025</p><h1>Good morning, Jane</h1><p className="welcome-sub">Here&apos;s what&apos;s happening with your marketing workspace.</p></div><button className="primary"><Plus size={18} /> Request a task</button></div><div className="stats"><Stat title="Active subscription" value="Growth plan" detail="Renews 29 Mar 2025" icon={CreditCard} accent="red" /><Stat title="Credits remaining" value="18.5 credits" detail="of 30 credits this month" icon={Zap} accent="orange" /><Stat title="Tasks in progress" value="4 tasks" detail="2 awaiting your review" icon={Activity} accent="blue" /><Stat title="Open tickets" value="2 tickets" detail="Latest reply 2 hours ago" icon={Headphones} accent="purple" /></div><div className="main-grid"><section className="panel card"><div className="panel-head"><div><h2>Recent tasks</h2><p>1 credit = 1 hour of completed work</p></div><button className="text-button">View all <ArrowRight size={16} /></button></div><div className="table-wrap"><table><thead><tr><th>Task</th><th>Status</th><th>Hours</th><th>Due</th><th /></tr></thead><tbody>{tasks.map((task) => <tr key={task.title}><td><div className="task-name"><span className="task-dot" /><div><strong>{task.title}</strong><small>{task.type}</small></div></div></td><td><span className={`status ${task.status.toLowerCase().replaceAll(' ', '-')}`}>{task.status}</span></td><td>{task.hours}</td><td>{task.date}</td><td><ChevronRight size={16} /></td></tr>)}</tbody></table></div><button className="mobile-view">View all tasks <ArrowRight size={16} /></button></section><section className="panel card credit-panel"><div className="panel-head"><div><h2>Credit usage</h2><p>Growth plan · 30 credits monthly</p></div><button className="more">···</button></div><div className="credit-number"><strong>11.5</strong><span>/ 30 credits used</span></div><div className="progress"><span /></div><div className="credit-meta"><span>18.5 remaining</span><span>Renews in 5 days</span></div><div className="usage-row"><span className="usage-dot red-dot" />Tasks completed <strong>9.5 hrs</strong></div><div className="usage-row"><span className="usage-dot gray-dot" />In progress <strong>2 hrs</strong></div><button className="outline-button">Manage subscription <ArrowRight size={16} /></button></section></div><div className="lower-grid"><section className="panel card"><div className="panel-head"><div><h2>Recent activity</h2><p>Updates from your workspace</p></div><button className="text-button">View all <ArrowRight size={16} /></button></div><div className="activity"><span className="activity-icon green"><CheckCircle2 size={16} /></span><div><strong>Task marked as completed</strong><p>Paid social campaign setup · 6 credits</p><small>Today, 10:42 AM</small></div></div><div className="activity"><span className="activity-icon red"><CreditCard size={16} /></span><div><strong>Subscription renewed</strong><p>Growth plan · 30 credits added</p><small>Mar 19, 2025</small></div></div></section><section className="panel card support-panel"><div className="panel-head"><div><h2>Support tickets</h2><p>We&apos;re here to help</p></div><button className="text-button">View all <ArrowRight size={16} /></button></div><div className="ticket"><span className="ticket-icon"><Headphones size={17} /></span><div><strong>#1048 · Campaign reporting question</strong><small><span className="status open-status">Open</span> Last reply 2 hours ago</small></div><ChevronRight size={16} /></div><button className="outline-button"><Plus size={16} /> Open a new ticket</button></section></div></>
}

export default function Page() { const [open, setOpen] = useState(false); return <main className="app"><Sidebar open={open} close={() => setOpen(false)} /><div className="shell"><Header onMenu={() => setOpen(true)} /><div className="page"><Dashboard /></div></div></main> }
