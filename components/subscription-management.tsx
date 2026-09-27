'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle2, CreditCard, XCircle } from 'lucide-react'

export type PlanKey = 'Starter' | 'Growth' | 'Scale'
type BillingFrequency = 'Monthly' | 'Annual'
export type SubscriptionPreferences = { plan: PlanKey; frequency: BillingFrequency; paymentMethod: string; ending: string; cancelAtPeriodEnd: boolean }

export const plans: Record<PlanKey, { monthlyPrice: number; credits: number; description: string }> = {
  Starter: { monthlyPrice: 1200, credits: 15, description: 'For focused monthly marketing support.' },
  Growth: { monthlyPrice: 2400, credits: 30, description: 'For ongoing multi-channel marketing delivery.' },
  Scale: { monthlyPrice: 4500, credits: 60, description: 'For higher-volume marketing operations.' },
}
export const subscriptionStorageKey = 'fpm-subscription-preferences'
export const initialSubscriptionPreferences: SubscriptionPreferences = { plan: 'Growth', frequency: 'Monthly', paymentMethod: 'Visa', ending: '4242', cancelAtPeriodEnd: false }

function currency(value: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value) }

export default function SubscriptionManagement({ view = 'all' }: { view?: 'all' | 'plan' }) {
  const [preferences, setPreferences] = useState(initialSubscriptionPreferences)
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')
  const [confirmCancel, setConfirmCancel] = useState(false)
  const plan = plans[preferences.plan]
  const price = preferences.frequency === 'Annual' ? plan.monthlyPrice * 12 * 0.9 : plan.monthlyPrice
  const nextPayment = preferences.frequency === 'Annual' ? '29 Mar 2026' : '29 Mar 2025'
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(subscriptionStorageKey) ?? 'null')
      if (saved && plans[saved.plan as PlanKey] && ['Monthly', 'Annual'].includes(saved.frequency) && typeof saved.paymentMethod === 'string' && /^\d{4}$/.test(saved.ending)) setPreferences(saved)
    } catch { setMessage('Your subscription preferences could not be loaded.') }
    setReady(true)
  }, [])
  function update(next: SubscriptionPreferences, note: string) {
    try { localStorage.setItem(subscriptionStorageKey, JSON.stringify(next)); setPreferences(next); setMessage(note) }
    catch { setMessage('Your change could not be saved. Check browser storage and try again.') }
  }
  if (view === 'plan') return <div className="ops-layout subscription-layout"><div className="ops-stack"><section className="card ops-panel"><h2>Current plan</h2><div className="table-wrap subscription-table-wrap"><table className="data-table subscription-table"><tbody><tr><th scope="row">Plan</th><td>{preferences.plan}</td></tr><tr><th scope="row">Billing frequency</th><td>Monthly</td></tr><tr><th scope="row">Credit allowance</th><td>{plan.credits} credits per month</td></tr><tr><th scope="row">Next payment</th><td>{currency(price)} on {nextPayment}</td></tr></tbody></table></div></section><section className="card ops-panel"><h2>Select a monthly plan</h2><p className="ops-copy">Your selected plan will apply to the next billing period.</p><div className="plan-options">{(Object.keys(plans) as PlanKey[]).map(key => <label className={`plan-option${preferences.plan === key ? ' selected' : ''}`} key={key}><input type="radio" name="plan" checked={preferences.plan === key} disabled={!ready || preferences.cancelAtPeriodEnd} onChange={() => update({ ...preferences, plan: key }, `${key} plan selected.`)} /><span><strong>{key}</strong><small>{plans[key].credits} credits / month</small></span><b>{currency(plans[key].monthlyPrice)}<small>/ month</small></b></label>)}</div></section></div><aside className="ops-stack"><section className="card ops-panel"><h2>Before you change</h2><p className="ops-copy">Plan changes affect your next monthly billing cycle. Your current credit balance remains available through the current period.</p></section><p role="status" className="ops-feedback">{message}</p></aside></div>
  return <><nav className="subscription-actions" aria-label="Subscription management"><a href="#plan">Change plan</a><a href="#billing">Billing frequency</a><a href="#payment">Payment method</a><a href="#cancellation">Cancellation</a></nav><div className="ops-layout subscription-layout"><div className="ops-stack">
    <section className="card ops-panel"><h2>Current subscription</h2><div className="table-wrap subscription-table-wrap"><table className="data-table subscription-table"><tbody><tr><th scope="row">Plan</th><td>{preferences.plan}</td></tr><tr><th scope="row">Billing frequency</th><td>{preferences.frequency}</td></tr><tr><th scope="row">Credit allowance</th><td>{plan.credits} credits per month</td></tr><tr><th scope="row">Next payment</th><td>{currency(price)} on {nextPayment}</td></tr></tbody></table></div></section>
    <section className="card ops-panel" id="plan"><h2>Change plan</h2><p className="ops-copy">Choose a plan to upgrade or downgrade your monthly credit allowance.</p><div className="plan-options">{(Object.keys(plans) as PlanKey[]).map(key => <label className={`plan-option${preferences.plan === key ? ' selected' : ''}`} key={key}><input type="radio" name="plan" checked={preferences.plan === key} disabled={!ready || preferences.cancelAtPeriodEnd} onChange={() => update({ ...preferences, plan: key }, `${key} plan selected.`)} /><span><strong>{key}</strong><small>{plans[key].credits} credits / month</small></span><b>{currency(plans[key].monthlyPrice)}<small>/ month</small></b></label>)}</div></section>
    <section className="card ops-panel" id="billing"><h2>Billing frequency</h2><div className="billing-options">{(['Monthly', 'Annual'] as BillingFrequency[]).map(frequency => <label key={frequency}><input type="radio" name="frequency" checked={preferences.frequency === frequency} disabled={!ready || preferences.cancelAtPeriodEnd} onChange={() => update({ ...preferences, frequency }, `${frequency} billing selected.`)} /><span><strong>{frequency}</strong><small>{frequency === 'Annual' ? 'Save 10% on your plan' : 'Pay each month'}</small></span></label>)}</div></section>
    <section className="card ops-panel"><h2>Credit allowance</h2><div className="subscription-allowance"><strong>{plan.credits}</strong><span>monthly credits</span></div><p className="ops-copy">One credit represents one hour of completed work. Your allowance resets with each billing period.</p><Link className="ops-related" href="/credits">View credit transactions</Link></section>
    <section className="card ops-panel"><h2>Billing history</h2><div className="table-wrap ops-table-wrap" role="region" aria-label="Billing history" tabIndex={0}><table className="data-table ops-table"><thead><tr><th>Reference</th><th>Issued</th><th>Status</th><th className="table-value">Amount</th></tr></thead><tbody><tr><td><Link className="record-reference" href="/invoices/invoice-1">INV-82374103</Link></td><td>28 Feb 2025</td><td>Paid</td><td className="table-value">$2,400.00</td></tr></tbody></table></div></section>
  </div><aside className="ops-stack">
    <section className="card ops-panel" id="payment"><h2>Payment method</h2><label className="ops-field">Card type<select value={preferences.paymentMethod} disabled={!ready} onChange={event => update({ ...preferences, paymentMethod: event.target.value }, 'Payment method updated.')}><option>Visa</option><option>Mastercard</option><option>American Express</option><option>Bank debit</option></select></label><label className="ops-field">Last four digits<input inputMode="numeric" pattern="[0-9]{4}" maxLength={4} value={preferences.ending} disabled={!ready} onChange={event => setPreferences({ ...preferences, ending: event.target.value.replace(/\D/g, '') })} onBlur={() => /^\d{4}$/.test(preferences.ending) && update(preferences, 'Payment details updated.')} /></label><p className="ops-caption"><CreditCard size={14} /> {preferences.paymentMethod} ending in {preferences.ending || '••••'}</p></section>
    <section className="card ops-panel" id="cancellation"><h2>Cancellation</h2><p className={`subscription-state${preferences.cancelAtPeriodEnd ? ' cancellation' : ''}`}>{preferences.cancelAtPeriodEnd ? 'Cancels at period end' : 'Active'}</p><p className="ops-copy">{preferences.cancelAtPeriodEnd ? 'Your subscription remains available until 28 Mar 2025. You can resume it before then.' : 'Your subscription renews automatically on the next payment date.'}</p>{!preferences.cancelAtPeriodEnd ? <>{confirmCancel ? <div className="cancel-confirm"><p>Cancel your subscription at the end of the current period?</p><button className="outline-button" onClick={() => update({ ...preferences, cancelAtPeriodEnd: true }, 'Your subscription will end on 28 Mar 2025.')}>Confirm cancellation</button><button className="text-button" onClick={() => setConfirmCancel(false)}>Keep subscription</button></div> : <button className="text-button danger-action" onClick={() => setConfirmCancel(true)}><XCircle size={15} />Cancel at period end</button>}</> : <button className="primary" onClick={() => update({ ...preferences, cancelAtPeriodEnd: false }, 'Your subscription is active again.')}>Resume subscription</button>}</section>
    <section className="card ops-panel"><h2>What’s included</h2><ul className="ops-inclusions">{['SEO and content production', 'Design and landing page work', 'Paid media campaign operations', 'Task tracking and client support'].map(item => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></section>
  </aside><p role="status" className="ops-feedback subscription-feedback">{message}</p></div></>
}
