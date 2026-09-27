'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewProjectPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  return <div className="detail-page"><Link className="back-link" href="/projects">← Back to projects</Link><div className="detail-card card"><p className="eyebrow">PROJECT REQUEST</p><h1>Add a project</h1><p className="detail-meta">Create a concise project request for your account team to review and scope.</p><form className="request-form" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); const id = `project-local-${crypto.randomUUID()}`; const reference = `PRJ-${Math.floor(10_000_000 + Math.random() * 90_000_000)}`; localStorage.setItem('fpm-client-projects', JSON.stringify([...(JSON.parse(localStorage.getItem('fpm-client-projects') ?? '[]')), { id, reference, title: String(data.get('title')), meta: String(data.get('service')), status: 'Draft', value: 'To be scoped', date: String(data.get('targetDate')) || 'Not confirmed' }])); window.dispatchEvent(new Event('fpm-record-change')); setMessage('Project request saved.'); router.push('/projects') }}><label>Project title<input required name="title" maxLength={15} placeholder="Up to 15 characters" /><small>Use a short operational title of 15 characters or fewer.</small></label><label>Service<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>SEO and content</option><option>Design</option><option>Paid media</option><option>Campaign delivery</option></select></label><label>Project brief<textarea required name="brief" rows={4} placeholder="Describe the objective, expected outcome, and key deliverables." /></label><label>Target delivery date<input type="date" name="targetDate" /></label><button className="primary" type="submit">Save project request</button><p role="status">{message}</p></form></div></div>
}
