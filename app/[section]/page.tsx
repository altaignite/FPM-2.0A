import { notFound } from 'next/navigation'
import { sectionLabels } from '@/lib/demo-data'
import Page from '../page'

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!['overview', 'help', 'support', 'settings', 'search'].includes(section) && !Object.hasOwn(sectionLabels, section)) notFound()
  return <Page />
}
