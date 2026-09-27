import { notFound } from 'next/navigation'
import { getRecord } from '@/lib/demo-data'
import RecordDetail from '@/components/record-detail'
import LocalTaskDetail from '@/components/local-task-detail'

export default async function DetailPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params
  const record = getRecord(section, id)
  if (!record && section === 'tasks' && /^task-local-[0-9a-f-]{36}$/.test(id)) return <LocalTaskDetail key={id} id={id} />
  if (!record) notFound()
  return <RecordDetail key={`${section}/${id}`} section={section} record={record} />
}
