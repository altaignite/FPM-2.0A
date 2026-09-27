import type { RecordItem } from './demo-data'

export const taskServices = ['SEO', 'Design', 'Paid media', 'Content', 'Other'] as const
export type TaskRequest = { title: string; service: string; brief: string; deliverables: string[]; requestedDate: string }
export type TaskDetail = { owner: string; due: string; estimate: number | null; brief: string; deliverables: string[]; requestedDate?: string; activity: string[] }
export type LocalTask = { record: RecordItem; details: TaskDetail }
const key = 'fpm-client-tasks'

export function readLocalTasks(): LocalTask[] {
  const stored = JSON.parse(localStorage.getItem(key) ?? '[]')
  if (!Array.isArray(stored)) throw new Error('Invalid task storage')
  return stored
}

export function createTaskRequest(request: TaskRequest) {
  if (!request.title.trim() || !request.brief.trim() || !request.deliverables.some(item => item.trim()) || !taskServices.includes(request.service as typeof taskServices[number])) throw new Error('Complete the required fields.')
  const id = `task-local-${crypto.randomUUID()}`
  const reference = `TSK-${Math.floor(10_000_000 + Math.random() * 90_000_000)}`
  const task: LocalTask = {
    record: { id, reference, title: request.title.trim(), meta: request.service, status: 'Draft', value: '0 hrs', date: new Date().toISOString().slice(0, 10) },
    details: { brief: request.brief.trim(), deliverables: request.deliverables.map(item => item.trim()).filter(Boolean), requestedDate: request.requestedDate, due: 'Not confirmed', owner: 'Not assigned', estimate: null, activity: ['Request saved in this browser. Not yet sent to your team.'] },
  }
  localStorage.setItem(key, JSON.stringify([...readLocalTasks(), task]))
  window.dispatchEvent(new Event('fpm-record-change'))
  return id
}
