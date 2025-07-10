import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock,
  FileText,
  Truck,
  CreditCard,
  Globe,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FirstShipmentHandholding = () => {
  const serviceIncludes = [
    {
      title: "Order Processing & Documentation",
      description: "Complete order management from confirmation to shipping documents",
      icon: <FileText className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Export Documentation",
      description: "Invoice, packing list, shipping bill, and all required certificates",
      icon: <Package className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Logistics Coordination",
      description: "Freight forwarding, shipping arrangements, and cargo tracking",
      icon: <Truck className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Payment Processing",
      description: "LC/payment terms guidance and receipt confirmation",
      icon: <CreditCard className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Customs Clearance",
      description: "Both origin and destination customs clearance support",
      icon: <Shield className="w-6 h-6 text-primary-600" />
    },
    {
      title: "24/7 Support",
      description: "Dedicated project manager and round-the-clock assistance",
      icon: <Phone className="w-6 h-6 text-primary-600" />
    }
  ];

  const processSteps = [
    {
      phase: "Pre-Shipment",
      steps: ["Order confirmation review", "Documentation preparation", "Quality checks", "Packaging standards"]
    },
    {
      phase: "Shipment",
      steps: ["Freight booking", "Customs clearance", "Loading supervision", "Document courier"]
    },
    {
      phase: "Transit",
      steps: ["Shipment tracking", "Status updates", "Issue resolution", "Delivery coordination"]
    },
    {
      phase: "Post-Shipment",
      steps: ["Payment follow-up", "Delivery confirmation", "Feedback collection", "Next steps planning"]
    }
  ];

  const testimonials = [
    {
      quote: "Our first export was seamless thanks to EXIM Pro's handholding service. They managed everything from documentation to payment receipt. Couldn't have done it without them!",
      author: "Rajesh Kumar",
      company: "Handicrafts International",
      country: "🇺🇸 USA",
      value: "$25,000",
      rating: 5
    },
    {
      quote: "The team's expertise saved us from costly mistakes on our first shipment to Germany. Their 24/7 support gave us confidence throughout the process.",
      author: "Meera Patel",
      company: "Organic Spices Ltd",
      country: "🇩🇪 Germany", 
      value: "€18,000",
      rating: 5
    }
  ];

  const benefits = [
    "Zero export experience required",
    "End-to-end transaction management",
    "Risk mitigation and compliance assurance",
    "Real-time updates and transparency",
    "Cost optimization and vendor negotiation",
    "Knowledge transfer for future shipments"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-primary-600 hover:bg-gray-100">
              Complete Export Transaction Management
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              First Shipment Handholding
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              End-to-end management of your first export transaction. From order confirmation 
              to payment receipt, we handle everything so you can focus on your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white hover:bg-white text-primary-600 px-8 py-4 text-lg">
                Start Your First Export
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
                  {/* <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg text-primary-600 border-primary-600">
                    <Link to="/consulting/book-free-call">
                      Schedule Discussion
                    </Link>
                  </Button> */}
            </div>
            <div className="text-center mt-8">
              <div className="text-3xl font-bold text-white mb-2">₹1,00,000 - ₹1,50,000</div>
              <div className="text-white">Per Transaction</div>
              <div className="text-sm text-white mt-2 flex items-center justify-center">
                <Shield className="w-4 h-4 inline mr-1 text-white" />
                100% Success Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Includes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Complete Transaction Coverage</h2>
            <p className="text-xl text-primary-600">
              Every aspect of your export transaction handled by experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceIncludes.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="mb-6">{React.cloneElement(item.icon, { className: item.icon.props.className.replace(/text-(blue|green|purple|orange|red|teal)-600/, 'text-primary-600') })}</div>
                  <h3 className="text-lg font-semibold mb-4 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our 4-Phase Process</h2>
            <p className="text-xl text-primary-600">
              Systematic approach to ensure smooth export execution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processSteps.map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-600">{phase.phase}</h3>
                  </div>
                  <ul className="space-y-3">
                    {phase.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-primary-600">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Handholding Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-accent-50 p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary-600 mr-4 flex-shrink-0" />
                  <span className="text-lg text-primary-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-r from-primary-100 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">First Export Success Stories</h2>
            <p className="text-xl text-primary-600">
              Real businesses, real results with our handholding service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-primary-700 mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-primary-700">{testimonial.author}</div>
                    <div className="text-sm text-primary-600">{testimonial.company}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-medium text-primary-600">{testimonial.country}</div>
                      <div className="text-sm font-bold text-accent-600">{testimonial.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your First Export Success?</h2>
          <p className="text-xl mb-8 text-white mx-auto">
            Let our experts handle your first shipment while you focus on growing your business. 
            100% success rate with complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-100 px-8 py-3">
              Start Your First Export
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button asChild variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-primary-100 px-8 py-3">
              <Link to="/consulting/book-free-call">
                Schedule Discussion 
              </Link>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstShipmentHandholding;