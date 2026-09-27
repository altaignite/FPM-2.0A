'use client'

import {
  Activity,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  CreditCard,
  Grid2X2,
  Headphones,
  House,
  Laptop,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  PanelLeft,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  SlidersHorizontal,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const domains = [
  { name: 'Sublance.digital', plan: 'Protection Plan : Full Privacy', color: '#a933ac', icon: '∞', action: 'Change Protection' },
  { name: 'Domora-Design.agency', plan: '', color: '#6258e8', icon: '△', action: 'Set up' },
  { name: 'Merava.tech', plan: 'Protection Plan : None', color: '#111827', icon: '⬢', action: 'Upgrade Protection' },
  { name: 'Cloudover.com', plan: 'Protection Plan : None', color: '#ed8b42', icon: '◆', action: 'Upgrade Protection' },
]

const groups = [
  { label: 'General', items: [{ icon: House, label: 'Dashboard', active: true }, { icon: CircleUserRound, label: 'Clients', arrow: true }] },
  { label: 'Notifications', items: [{ icon: Bell, label: 'Activity Feed', arrow: true }, { icon: Activity, label: 'Pending Renewals', arrow: true }] },
  { label: 'Services', items: [{ icon: GlobeIcon, label: 'Domain', arrow: true }, { icon: Server, label: 'Server', arrow: true }, { icon: Laptop, label: 'Web Hosting', arrow: true }] },
  { label: 'Others', items: [{ icon: CreditCard, label: 'Billing', arrow: true }, { icon: Headphones, label: 'Support', arrow: true }, { icon: Wrench, label: 'Tools', arrow: true }, { icon: Activity, label: 'Statistics', arrow: true }, { icon: PanelLeft, label: 'Workspace', arrow: true }] },
]

function GlobeIcon(props: React.ComponentProps<typeof CircleUserRound>) { return <CircleUserRound {...props} /> }

function Logo() {
  return <div className="logo"><span className="logo-mark">▽</span><span>Zygenet</span></div>
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <>
    {open && <button className="sidebar-overlay" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Logo /><button className="mobile-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button></div>
      <nav className="sidebar-nav">
        {groups.map((group) => <div className="nav-group" key={group.label}>
          <p className="group-label">{group.label}</p>
          {group.items.map(({ icon: Icon, label, active, arrow }) => <button className={`nav-item ${active ? 'active' : ''}`} key={label}><Icon size={17} strokeWidth={1.5} /><span>{label}</span>{arrow && <ChevronRight className="nav-arrow" size={15} />}</button>)}
        </div>)}
      </nav>
      <div className="sidebar-bottom"><button className="nav-item"><SlidersHorizontal size={17} strokeWidth={1.5} /><span>Preferences</span></button><button className="nav-item"><Settings size={17} strokeWidth={1.5} /><span>Settings</span></button></div>
    </aside>
  </>
}

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="header">
    <button className="menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
    <div className="search"><Search size={17} /><span>Search...</span></div>
    <div className="header-actions"><span className="help">Help Center</span><span className="divider" /><Grid2X2 size={20} /><span className="cart">⌑</span><span className="divider" /><button className="round-button"><Bell size={17} /><i /></button><div className="avatar">JS</div><ChevronDown size={14} /></div>
  </header>
}

function DomainCard({ domain }: { domain: typeof domains[number] }) {
  return <div className="domain-row"><div className="domain-name"><span className="domain-icon" style={{ color: domain.color }}>{domain.icon}</span><div><strong>{domain.name}</strong>{domain.plan && <small>{domain.plan}</small>}</div></div><div className="domain-actions"><span className="dns">DNS</span><button>Manage</button><button className={domain.action === 'Set up' ? 'setup' : ''}>{domain.action}{domain.action === 'Set up' && <ChevronDown size={14} />}</button></div></div>
}

function Domains() {
  return <section className="domains card"><div className="tabs"><button className="tab active"><GlobeIcon size={16} />Domains</button><button className="tab"><Laptop size={16} />Websites</button><button className="tab"><Server size={16} />Hosting</button><button className="tab"><LockKeyhole size={16} />SSL Certificates</button></div><div className="domain-content"><div className="section-heading"><h2>All Domains</h2><button>Manage All <ChevronRight size={16} /></button></div><div className="domain-list">{domains.map((domain) => <DomainCard domain={domain} key={domain.name} />)}</div></div></section>
}

function ActivityCard({ title, children, type }: { title: string; children: React.ReactNode; type: 'notifications' | 'activities' }) {
  return <section className="activity-card card"><div className="activity-heading"><h2>{title}</h2><RefreshCw size={16} /></div><div className="activity-list">{children}</div><button className="view-all">View all {type} <ArrowRight size={17} /></button></section>
}

function ActivityItem({ kind, children, time }: { kind: string; children: React.ReactNode; time: string }) { return <div className="activity-item"><span className={`activity-icon ${kind}`}><RefreshCw size={16} /></span><div><p>{children}</p><small>{time}</small></div></div> }

function Products() { return <aside className="right-column"><section className="products card"><h2>Manage Your Products</h2><div className="product-search"><span>Search for a domain name...</span><Search size={17} /></div>{[['VPS', Server], ['Web Hosting', Laptop], ['Domains', GlobeIcon], ['Backups', Zap]].map(([name, Icon], i) => <div className="product-line" key={name as string}><Icon size={17} /><span>{name as string}</span><small className={i === 3 ? '' : 'online'}>{i === 3 ? 'Enabled' : 'Online'}</small></div>)}<div className="explore">Explore All Products <ArrowRight size={17} /></div></section><section className="help-card card"><h2>Need Help?</h2><p>Receive exclusive ticketing support through the hub.</p><button>Contact Support</button></section><section className="help-card card"><h2>Provide Feedback?</h2><p>Tell us what you think about the hub experience and help us make it better.</p><button>Leave Feedback</button></section><button className="more-services">Explore More Services <ArrowRight size={17} /></button></aside> }

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main className="dashboard"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="main-shell"><Header onMenu={() => setMenuOpen(true)} /><div className="welcome"><h1>Welcome Back, Jane!</h1><div className="welcome-actions"><button className="primary"><Plus size={18} />Add New Product</button><button><RefreshCw size={16} />Renew Now</button></div></div><div className="content"><div className="center-column"><Domains /><div className="activity-grid"><ActivityCard title="Notifications" type="notifications"><ActivityItem kind="green" time="2 hours ago · 15:12 PM">Renewal payment for premium hosting plan is due soon.</ActivityItem><ActivityItem kind="dark" time="2 days ago · 10:01 AM"><strong>Sublance.digital</strong> expires on March 29, 2025.</ActivityItem><ActivityItem kind="light" time="1 week ago · 12:00 PM">2 domains will expire in next 30 days.</ActivityItem></ActivityCard><ActivityCard title="Recent Activities" type="activities"><ActivityItem kind="purple" time="2 hours ago · 10:22 AM"><b className="tag purple">SSL</b> Purchased new SSL certificate</ActivityItem><ActivityItem kind="blue" time="2 hours ago · 10:22 AM"><b className="tag blue">Auto-renew</b> Auto-renew is enabled for vidona.com</ActivityItem><ActivityItem kind="green" time="2 hours ago · 10:22 AM"><b className="tag green">Websites</b> Domain forwarded to websites.</ActivityItem></ActivityCard></div></div><Products /></div></div></main>
}
