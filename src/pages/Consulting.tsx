import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  FileCheck, 
  Search, 
  Calculator,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Consulting = () => {
  const services = [
    {
      title: "Export Readiness Audit",
      description: "Complete assessment of your product's global readiness - from compliance to pricing.",
      icon: <FileCheck className="w-8 h-8 text-primary-600" />,
      slug: "export-readiness",
      features: ["HS Code Classification", "Regulatory Check", "Packaging Review"]
    },
    {
      title: "Market Research & Country Selection",
      description: "Data-driven insights to identify your most profitable export markets.",
      icon: <Search className="w-8 h-8 text-accent-400" />,
      slug: "market-research",
      features: ["Market Analysis", "Competition Study", "Entry Strategy"]
    },
    {
      title: "Buyer Discovery (AI-Powered)",
      description: "Find verified international buyers using our AI-enhanced database.",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      slug: "buyer-discovery",
      features: ["Buyer Verification", "Contact Details", "Match Scoring"]
    },
    {
      title: "Global Compliance & Documentation",
      description: "Navigate complex international trade regulations with expert guidance.",
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      slug: "compliance-docs",
      features: ["Documentation", "Certification", "Legal Compliance"]
    },
    {
      title: "Export Pricing & Costing Strategy",
      description: "Optimize your pricing strategy for global competitiveness and profitability.",
      icon: <Calculator className="w-8 h-8 text-teal-600" />,
      slug: "pricing-strategy",
      features: ["Cost Analysis", "Price Benchmarking", "Margin Optimization"]
    },
    {
      title: "1-on-1 Export Strategy Sessions",
      description: "Personalized consulting calls to accelerate your export journey.",
      icon: <MessageCircle className="w-8 h-8 text-red-600" />,
      slug: "export-strategy-sessions",
      features: ["Personal Advisor", "Custom Roadmap", "Ongoing Support"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "15-minute consultation to understand your export goals and challenges."
    },
    {
      step: "02", 
      title: "Custom Roadmap",
      description: "Tailored strategy and action plan based on your specific needs."
    },
    {
      step: "03",
      title: "Execution Support",
      description: "Ongoing guidance and support as you implement your export strategy."
    }
  ];

  const testimonials = [
    {
      quote: "Their export readiness audit saved us months of trial and error. We're now successfully exporting to 3 EU countries.",
      author: "Priya Sharma",
      company: "Ayurveda Essentials",
      country: "🇩🇪 Germany"
    },
    {
      quote: "The buyer discovery service connected us with verified importers in the US. Our export revenue grew 300% in 6 months.",
      author: "Rajesh Kumar",
      company: "Handicrafts Unlimited", 
      country: "🇺🇸 USA"
    },
    {
      quote: "Professional, tech-savvy, and incredibly supportive. They made global trade accessible for our small business.",
      author: "Meera Patel",
      company: "Spice Route Exports",
      country: "🇦🇪 UAE"
    }
  ];

  const stats = [
    { label: "SMEs Advised", value: "100+" },
    { label: "Countries Reached", value: "12+" },
    { label: "Success Rate", value: "95%" },
    { label: "Founded", value: "2023" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 via-white to-primary-200 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary-100 text-primary-800 hover:bg-primary-100">
              AI-Powered EXIM Consulting
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent">
              Export Smarter. Scale Faster.
            </h1>
            <p className="text-xl text-foreground mb-8 leading-relaxed">
              AI-Powered EXIM Consulting for Indian Exporters & Global Buyers. 
              Navigate international trade with confidence and accelerate your global growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3">
                <Link to="/consulting/book-free-call">   
                  Book Free Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="px-8 py-3">
                View Our Services
              </Button> */}
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">A Startup Built for Global Trade</h2>
            <p className="text-xl text-muted-foreground">
              Founded in 2023 with innovation and agility at our core
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tech-Forward Approach</h3>
              <p className="text-muted-foreground">Combining AI tools with personalized advisory for smarter export decisions.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SME Focused</h3>
              <p className="text-muted-foreground">Accessible pricing and tailored solutions for first-time exporters and growing businesses.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">Trusted by clients exporting to 12+ countries across US, EU, UAE, and Asia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our EXIM Consulting Services</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions to accelerate your global trade journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-primary-500">
                        <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link to={`/consulting/${service.slug}`}>
                    <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our 3-Step Process</h2>
            <p className="text-xl text-muted-foreground">
              Simple, structured approach to export success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-200 z-0" 
                       style={{ transform: 'translateX(10px)', width: 'calc(100% - 20px)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-primary-100 to-primary-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by Global Exporters</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from businesses we've helped scale globally
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    <div className="text-sm font-medium text-primary-600 mt-1">{testimonial.country}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Exports?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free 15-minute discovery call and let's discuss your global trade goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-100 px-8 py-3">
              <Link to="/consulting/book-free-call">
                Book Free Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3">
              View Case Studies
            </Button> */}
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg">
          Book Free Call
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Consulting;
