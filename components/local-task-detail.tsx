'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { readLocalTasks, type LocalTask } from '@/lib/task-requests'
import RecordDetail from './record-detail'

export default function LocalTaskDetail({ id }: { id: string }) {
  const [task, setTask] = useState<LocalTask | null>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    try { setTask(readLocalTasks().find(item => item.record.id === id) ?? null) } catch { setTask(null) }
    setLoaded(true)
  }, [id])
  if (!loaded) return <p role="status">Loading your request…</p>
  if (!task) return <section className="card workspace-content"><h1>Request unavailable</h1><p>This request is not saved in this browser.</p><Link className="text-button" href="/tasks">Back to tasks</Link></section>
  return <RecordDetail section="tasks" record={task.record} taskOverride={task.details} />
}
