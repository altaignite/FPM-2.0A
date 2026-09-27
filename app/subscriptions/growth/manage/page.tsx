import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SubscriptionManagementHub from '@/components/subscription-management-hub'

export default function ManageSubscriptionPage() {
  return <div className="ops-detail"><Link className="ops-back" href="/subscriptions/growth"><ArrowLeft size={14} />Subscription details</Link><header className="ops-heading"><div><p className="eyebrow">GROWTH PLAN</p><h1>Manage subscription</h1><p className="welcome-sub">Manage your plan, payment method, or cancellation settings.</p></div></header><SubscriptionManagementHub /></div>
}
