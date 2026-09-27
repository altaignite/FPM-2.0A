'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Settings2 } from 'lucide-react'
import { initialSubscriptionPreferences, plans, subscriptionStorageKey, type PlanKey, type SubscriptionPreferences } from './subscription-management'

export default function SubscriptionOverview() {
  const [preferences, setPreferences] = useState<SubscriptionPreferences>(initialSubscriptionPreferences)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(subscriptionStorageKey) ?? 'null')
      if (saved && plans[saved.plan as PlanKey] && ['Monthly', 'Annual'].includes(saved.frequency) && typeof saved.paymentMethod === 'string' && /^\d{4}$/.test(saved.ending)) setPreferences(saved)
    } catch { /* Retain the current subscription shown in the record. */ }
  }, [])
  const plan = plans[preferences.plan]
  const price = preferences.frequency === 'Annual' ? plan.monthlyPrice * 12 * 0.9 : plan.monthlyPrice
  const nextPayment = preferences.frequency === 'Annual' ? '29 Mar 2026' : '29 Mar 2025'
  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
  return <div className="ops-layout"><div className="ops-stack">
    <section className="card ops-panel"><h2>Subscription overview</h2><div className="table-wrap subscription-table-wrap"><table className="data-table subscription-table"><tbody><tr><th scope="row">Plan</th><td>{preferences.plan}</td></tr><tr><th scope="row">Billing frequency</th><td>{preferences.frequency}</td></tr><tr><th scope="row">Credit allowance</th><td>{plan.credits} credits per month</td></tr><tr><th scope="row">Next payment</th><td>{amount} on {nextPayment}</td></tr></tbody></table></div></section>
    <section className="card ops-panel"><h2>Current billing cycle</h2><dl className="ops-facts"><div><dt>Service period</dt><dd>01–28 Mar 2025</dd></div><div><dt>Available credits</dt><dd>18.5 credits</dd></div></dl><Link className="ops-related" href="/credits">View credit transactions <ArrowRight size={15} /></Link></section>
    <section className="card ops-panel"><h2>Billing history</h2><div className="table-wrap ops-table-wrap" role="region" aria-label="Billing history" tabIndex={0}><table className="data-table ops-table"><thead><tr><th>Reference</th><th>Issued</th><th>Status</th><th className="table-value">Amount</th></tr></thead><tbody><tr><td><Link className="record-reference" href="/invoices/invoice-1">INV-82374103</Link></td><td>28 Feb 2025</td><td>Paid</td><td className="table-value">$2,400.00</td></tr></tbody></table></div></section>
  </div><aside className="ops-stack"><section className="card ops-panel"><h2>Subscription</h2><dl className="ops-facts"><div><dt>Membership number</dt><dd className="record-reference">MBR-82374116</dd></div><div><dt>Account owner</dt><dd>Jane Doe</dd></div><div><dt>Billing frequency</dt><dd>{preferences.frequency}</dd></div><div><dt>Payment method</dt><dd>{preferences.paymentMethod} ending in {preferences.ending}</dd></div></dl></section><section className="card ops-panel manage-card"><Settings2 size={20} /><h2>Manage subscription</h2><p className="ops-copy">Change your plan, billing frequency, payment method, or cancellation settings.</p><Link className="primary" href="/subscriptions/growth/manage">Manage plan</Link></section><section className="card ops-panel"><h2>Need help?</h2><p className="ops-copy">Contact your account team about billing or your subscription.</p><Link className="ops-related" href="/support">Open support center <ArrowRight size={15} /></Link></section></aside></div>
}
