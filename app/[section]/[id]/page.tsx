import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRecord, sectionLabels } from '@/lib/demo-data'

export default async function DetailPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params
  const record = getRecord(section, id)
  if (!record) notFound()
  return <main className="detail-page"><Link className="back-link" href={`/${section}`}>← Back to {sectionLabels[section]}</Link><div className="detail-card card"><p className="eyebrow">{sectionLabels[section]}</p><h1>{record.title}</h1><p className="detail-meta">{record.meta}</p><div className="detail-grid"><div><span>Status</span><strong>{record.status}</strong></div><div><span>Value</span><strong>{record.value}</strong></div><div><span>Updated</span><strong>{record.date}</strong></div></div><div className="detail-actions"><Link className="primary" href={`/${section}`}>Done</Link><Link className="outline-button" href="/support">Contact support</Link></div></div></main>
}
