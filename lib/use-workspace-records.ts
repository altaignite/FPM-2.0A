'use client'

import { useEffect, useState } from 'react'
import { records, type RecordItem } from './demo-data'
import { readLocalTasks } from './task-requests'

export type RecordUpdates = { status?: string; completed?: string[]; notes?: { text: string; time: string }[] }
const storageKey = 'fpm-record-updates'
type Updates = Record<string, RecordUpdates>

function readUpdates(): Updates {
  try { return JSON.parse(localStorage.getItem(storageKey) ?? '{}') ?? {} } catch { return {} }
}

export function useWorkspaceRecords(section: string) {
  const [updates, setUpdates] = useState<Updates>({})
  const [ready, setReady] = useState(false)
  const [localRows, setLocalRows] = useState<RecordItem[]>([])
  const [localProjectRows, setLocalProjectRows] = useState<RecordItem[]>([])
  const [localTicketRows, setLocalTicketRows] = useState<RecordItem[]>([])
  useEffect(() => {
    const refresh = () => { setUpdates(readUpdates()); try { setLocalRows(readLocalTasks().map(task => task.record)) } catch { setLocalRows([]) } try { setLocalProjectRows(JSON.parse(localStorage.getItem('fpm-client-projects') ?? '[]')) } catch { setLocalProjectRows([]) } try { const claim = JSON.parse(localStorage.getItem('fpm-money-back-claim') ?? 'null'); setLocalTicketRows(claim?.reference ? [{ id: 'money-back-claim', reference: claim.reference, title: '90 Day Money Back claim', meta: 'Claims support', status: claim.status ?? 'Open', value: 'High', date: 'Submitted today' }] : []) } catch { setLocalTicketRows([]) } setReady(true) }
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('fpm-record-change', refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('fpm-record-change', refresh) }
  }, [])
  function save(id: string, value: RecordUpdates) {
    const all = readUpdates()
    const key = `${section}/${id}`
    const next = { ...all, [key]: { ...all[key], ...value } }
    localStorage.setItem(storageKey, JSON.stringify(next))
    setUpdates(next)
    window.dispatchEvent(new Event('fpm-record-change'))
  }
  return { ready, save, updates, rows: [...(records[section] ?? []), ...(section === 'tasks' ? localRows : section === 'projects' ? localProjectRows : section === 'tickets' ? localTicketRows : [])].map(row => ({ ...row, status: updates[`${section}/${row.id}`]?.status ?? row.status })) }
}
