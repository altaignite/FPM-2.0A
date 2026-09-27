'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createTaskRequest, taskServices } from '@/lib/task-requests'

export default function NewTaskPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  return <div className="detail-page"><Link className="back-link" href="/tasks">← Back to Tasks</Link><div className="detail-card card"><p className="eyebrow">TASK REQUEST</p><h1>Request a task</h1><p className="detail-meta">Tell your team what you need. Your contact, delivery date, and time estimate will be confirmed after review.</p>
    <form className="request-form" onSubmit={event => {
      event.preventDefault()
      if (saving) return
      setError(''); setSaving(true)
      const data = new FormData(event.currentTarget)
      try {
        const id = createTaskRequest({ title: String(data.get('title')), service: String(data.get('service')), brief: String(data.get('brief')), deliverables: String(data.get('deliverables')).split('\n'), requestedDate: String(data.get('requestedDate')) })
        router.push(`/tasks/${id}`)
      } catch { setError('Could not save your request. Check the required fields and browser storage, then try again.'); setSaving(false) }
    }}>
      <label>Task title<input required maxLength={160} name="title" placeholder="e.g. Create a monthly performance report" /></label>
      <label>Service<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{taskServices.map(service => <option key={service}>{service}</option>)}</select></label>
      <label>Brief<textarea required name="brief" rows={4} placeholder="Describe your goal, audience, and relevant context." /></label>
      <label>Requested deliverables<textarea required name="deliverables" rows={3} placeholder="List one deliverable per line" /><small>List one deliverable per line.</small></label>
      <label>Preferred delivery date (optional)<input type="date" name="requestedDate" /><small>Your team will confirm whether this date is achievable.</small></label>
      {error && <p role="alert">{error}</p>}
      <button className="primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save request'}</button>
    </form>
  </div></div>
}
