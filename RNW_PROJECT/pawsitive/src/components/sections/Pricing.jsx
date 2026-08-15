import pricingPlans from '../../data/pricingPlans'
import Button from '../ui/Button'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

function Pricing() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionHeading eyebrow="SIMPLE STAY PACKAGES" title="Room to relax" text="Choose a stay that fits your plans. Every package includes loving, reliable care." />
        <div className="row pricing-cards justify-content-center">
          {pricingPlans.map((plan) => (
            <div className="col-12 col-sm-6 col-lg-4" key={plan.duration}>
              <Card className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                <h3>{plan.duration}</h3>
                <span className="pricing-card__icon">{plan.icon}</span>
                <ul>{plan.features.map((feature) => <li key={feature}>{feature}<span>✓</span></li>)}</ul>
                <p className="pricing-card__price">{plan.price}</p>
                <Button>Purchase</Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
