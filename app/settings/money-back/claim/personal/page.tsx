'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClaimPersonalInformationPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  return <div className="ops-detail"><Link className="ops-back" href="/settings/money-back/claim"><ArrowLeft size={14} />Claim information notice</Link><header className="ops-heading"><div><p className="eyebrow">90 DAY MONEY BACK · STEP 1 OF 4</p><h1>Personal information</h1><p className="welcome-sub">Confirm the person authorised to submit this claim.</p></div></header><form className="card ops-panel claim-personal-form request-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); router.push('/settings/money-back/claim/service') }}><div className="claim-account-fields"><label>Client number<input value="CLT-82374101" readOnly aria-readonly="true" /></label><label>Account email<input type="email" value="jane@example.com" readOnly aria-readonly="true" /></label><label>Service<input value="Growth monthly service" readOnly aria-readonly="true" /></label><label>Agreement reference<input value="AGR-82374101" readOnly aria-readonly="true" /></label></div><div className="address-fields"><label>Full name<input required defaultValue="Jane Doe" /></label><label>Company name<input required defaultValue="First Person Marketing" /></label><label>Job title<input required placeholder="e.g. Managing Director" /></label><label>Phone number<input required inputMode="tel" /></label><label>Account email<input type="email" value="jane@example.com" readOnly aria-readonly="true" /></label><label>Claim contact preference<select defaultValue="Email"><option>Email</option><option>Phone</option></select></label></div><label>Authority to act<select required defaultValue=""><option value="" disabled>Select authority</option><option>Account owner</option><option>Director or authorised officer</option><option>Authorised representative</option></select></label><div className="claim-actions"><Link className="outline-button" href="/settings/money-back/claim">Back</Link><button className="primary" type="submit">Save and continue</button></div>{submitted && <p role="status" className="ops-feedback">Personal information saved for this claim.</p>}</form></div>
}
