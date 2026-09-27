'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Bell, BriefcaseBusiness, CheckCircle2, CircleHelp, CreditCard, FileText, House, Menu, Search, Settings, Ticket, UserRound, X, Zap } from 'lucide-react'
const nav = [{ label: 'Overview', href: '/', icon: House }, { label: 'Subscriptions', href: '/subscriptions', icon: CreditCard }, { label: 'Projects', href: '/projects', icon: BriefcaseBusiness }, { label: 'Tasks', href: '/tasks', icon: CheckCircle2 }, { label: 'Credits', href: '/credits', icon: Zap }, { label: 'Support tickets', href: '/tickets', icon: Ticket }, { label: 'Invoices', href: '/invoices', icon: FileText }]

function Brand() { return <div className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1712-DPupM5FLesuxf6YstfDbnd9g8opHU7.png" alt="First Person Marketing" /></div> }
function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  const pathname = usePathname()
  const linkProps = (href: string) => {
    const selected = href === '/' ? pathname === '/' || pathname === '/overview' : pathname === href || pathname.startsWith(`${href}/`)
    return { className: `nav-link${selected ? ' selected' : ''}`, 'aria-current': selected ? 'page' as const : undefined }
  }
  return <><button className={`overlay ${open ? 'show' : ''}`} onClick={close} aria-label="Close navigation" /><aside className={`sidebar ${open ? 'open' : ''}`}><div className="side-head"><Brand /><button className="close" onClick={close} aria-label="Close navigation"><X size={20} /></button></div><nav className="sidebar-nav">{nav.slice(0, 2).map(({ label, href, icon: Icon }) => <Link {...linkProps(href)} href={href} key={label} onClick={close}><Icon key="icon" size={18} /><span key="label">{label}</span></Link>)}{nav.slice(2, 6).map(({ label, href, icon: Icon }) => <Link {...linkProps(href)} href={href} key={label} onClick={close}><Icon key="icon" size={18} /><span key="label">{label}</span></Link>)}<Link {...linkProps('/invoices')} href="/invoices" onClick={close}><FileText size={18} /><span>Invoices</span></Link></nav><div className="side-footer"><Link {...linkProps('/help')} href="/help" onClick={close}><CircleHelp size={18} /><span>Help center</span></Link><Link {...linkProps('/settings')} href="/settings" onClick={close}><Settings size={18} /><span>Settings</span></Link><div className="user"><span className="avatar">JD</span><div><strong>Jane Doe</strong><small>Client</small></div></div></div></aside></> }
function Header({ onMenu }: { onMenu: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<'notifications' | 'profile' | null>(null)
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`)
  }
  return <header className="header"><button className="menu" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button><form className="search" role="search" onSubmit={search}><Search size={17} aria-hidden="true" /><input aria-label="Search workspace records" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tasks, invoices, tickets..." /><button type="submit" className="sr-only">Search</button></form><div className="header-right"><div className="header-menu"><button className="icon-button notification" onClick={() => setPanel(panel === 'notifications' ? null : 'notifications')} aria-label="Open notifications" aria-expanded={panel === 'notifications'}><Bell size={19} /><i /></button>{panel === 'notifications' && <div className="header-popover notifications-popover"><p>Notifications</p><Link href="/tickets/ticket-1" onClick={() => setPanel(null)}>Support reply received</Link><Link href="/tasks/task-2" onClick={() => setPanel(null)}>Task ready for review</Link></div>}</div><div className="header-menu"><button className="profile-trigger" onClick={() => setPanel(panel === 'profile' ? null : 'profile')} aria-label="Open profile menu" aria-expanded={panel === 'profile'}><span className="header-user">Jane Doe</span><span className="avatar small">JD</span></button>{panel === 'profile' && <div className="header-popover profile-popover"><div className="profile-summary"><span className="avatar">JD</span><div><strong>Jane Doe</strong><small>Client account</small></div></div><Link href="/settings" onClick={() => setPanel(null)}><UserRound size={15} />Account settings</Link><Link href="/help" onClick={() => setPanel(null)}><CircleHelp size={15} />Help center</Link></div>}</div></div></header>
}

export default function WorkspaceShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return <div className="app">
    <Sidebar open={open} close={() => setOpen(false)} />
    <div className="shell">
      <Header onMenu={() => setOpen(true)} />
      <main className="page">{children}</main>
    </div>
  </div>
}
