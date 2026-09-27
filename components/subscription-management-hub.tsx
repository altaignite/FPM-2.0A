import { CreditCard, SlidersHorizontal, XCircle } from 'lucide-react'

export default function SubscriptionManagementHub() {
  const actions = [
    { icon: SlidersHorizontal, title: 'Plan changes', copy: 'Review plan options for your monthly subscription.', button: 'Manage plan' },
    { icon: CreditCard, title: 'Payment methods', copy: 'Review the payment method used for your monthly subscription.', button: 'Manage payment method' },
    { icon: XCircle, title: 'Cancellation', copy: 'Review cancellation options and billing-period access.', button: 'Manage cancellation' },
  ]
  return <div className="subscription-management-hub">{actions.map(({ icon: Icon, title, copy, button }) => <section className="card subscription-action-card" key={title}><Icon size={20} /><div><h2>{title}</h2><p>{copy}</p></div><button className="primary subscription-action-button" type="button" aria-label={button}>{button}</button></section>)}</div>
}
