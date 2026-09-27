'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const memberships = [{ id: 'MBR-82374116', service: 'Growth monthly service', activated: '01 Dec 2024', creditsUsed: '30 of 30', conversions: '0 recorded', eligible: true }, { id: 'MBR-82374117', service: 'SEO content service', activated: '15 Feb 2025', creditsUsed: '4.5 of 10', conversions: '0 recorded', eligible: false }]

export default function ClaimServicePage() {
  const router = useRouter()
  const [membershipId, setMembershipId] = useState('MBR-82374116')
  const [checked, setChecked] = useState(false)
  const membership = memberships.find(item => item.id === membershipId) ?? memberships[0]
  function submitClaim() { localStorage.setItem('fpm-money-back-claim', JSON.stringify({ reference: 'TKT-82374118', membership: membership.id, service: membership.service, status: 'Open' })); router.push('/tickets') }
  return <div className="ops-detail"><Link className="ops-back" href="/settings/money-back/claim/personal"><ArrowLeft size={14} />Personal information</Link><header className="ops-heading"><div><p className="eyebrow">90 DAY MONEY BACK · STEP 2 OF 4</p><h1>Membership eligibility</h1><p className="welcome-sub">Select the membership record to check its guarantee requirements.</p></div></header><section className="card ops-panel claim-personal-form"><label className="ops-field">Membership number<select value={membershipId} onChange={event => { setMembershipId(event.target.value); setChecked(false) }}>{memberships.map(item => <option value={item.id} key={item.id}>{item.id}</option>)}</select></label><button className="primary" type="button" onClick={() => setChecked(true)}>Check eligibility</button>{checked && <div className="eligibility-result"><h2>{membership.eligible ? 'Eligible to submit' : 'Not eligible'}</h2><dl className="ops-facts"><div><dt>Covered service</dt><dd>{membership.service}</dd></div><div><dt>Activation date</dt><dd>{membership.activated}</dd></div><div><dt>Current date</dt><dd>24 Mar 2025</dd></div><div><dt>Credits used</dt><dd>{membership.creditsUsed}</dd></div><div><dt>Performance record</dt><dd>{membership.conversions}</dd></div><div><dt>Guarantee finding</dt><dd>{membership.eligible ? '90 days complete · no success recorded' : '90-day period has not elapsed'}</dd></div></dl><div className="claim-actions"><Link className="outline-button" href="/settings">Close</Link>{membership.eligible && <button className="primary" type="button" onClick={submitClaim}>Submit claim</button>}</div></div>}</section></div>
}
