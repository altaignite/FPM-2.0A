'use client'

import Link from 'next/link'
import { ArrowLeft, CreditCard } from 'lucide-react'
import { useState } from 'react'

const packages = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100].map(credits => ({ credits, price: credits * 5 }))
const currency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

export default function TopUpCreditsPage() {
  const [selected, setSelected] = useState(20)
  const [message, setMessage] = useState('')
  const chosen = packages.find(item => item.credits === selected) ?? packages[1]
  return <div className="ops-detail"><Link className="ops-back" href="/credits"><ArrowLeft size={14} />Credits</Link><header className="ops-heading"><div><p className="eyebrow">CREDIT ACCOUNT</p><h1>Top up credits</h1><p className="welcome-sub">Add credits to your account for upcoming work.</p></div></header><div className="ops-layout"><div className="ops-stack"><section className="card ops-panel"><h2>Select credits</h2><label className="ops-field">Credit quantity<select value={selected} onChange={event => setSelected(Number(event.target.value))}>{packages.map(item => <option value={item.credits} key={item.credits}>{item.credits} credits — {currency(item.price)}</option>)}</select></label><p className="ops-caption">Choose from 5 to 100 credits. One credit equals one hour of completed work.</p></section><section className="card ops-panel"><h2>Payment</h2><p className="ops-copy">Your selected package will be charged to the payment method on file.</p><button className="primary" type="button" onClick={() => setMessage(`${selected} credits are ready for payment review.`)}><CreditCard size={16} />Continue to payment</button><p className="ops-feedback" role="status">{message}</p></section></div><aside className="ops-stack"><section className="card ops-panel"><h2>Order summary</h2><dl className="ops-facts"><div><dt>Credits</dt><dd>{chosen.credits}</dd></div><div><dt>Amount</dt><dd>{currency(chosen.price)}</dd></div><div><dt>Availability</dt><dd>After payment</dd></div></dl></section></aside></div></div>
}
