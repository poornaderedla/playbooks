import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileCheck, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ExportKickstartPackge = () => {
  const packageIncludes = [
    {
      title: "IEC (Import Export Code) Registration",
      description: "Complete assistance with IEC application and approval process",
      icon: <Globe className="w-6 h-6 text-primary-600" />
    },
    {
      title: "GST Registration & Compliance",
      description: "GST setup for export business with compliance guidelines",
      icon: <FileCheck className="w-6 h-6 text-primary-600" />
    },
    {
      title: "RCMC (Registration-cum-Membership Certificate)",
      description: "Registration with relevant Export Promotion Council",
      icon: <Shield className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Basic Target Market Report",
      description: "Initial market research for your top 3 target countries",
      icon: <Target className="w-6 h-6 text-primary-600" />
    }
  ];

  const benefits = [
    "Complete legal compliance for export business",
    "Fast-track registration process (15-20 business days)",
    "Expert guidance on documentation",
    "Market insights to start your export journey",
    "Ongoing support for 30 days post-registration"
  ];

  const testimonials = [
    {
      quote: "The Export Kickstart Package saved us months of paperwork confusion. Everything was handled professionally and we got our registrations quickly.",
      author: "Amit Patel",
      company: "Textile Exports Ltd",
      rating: 5
    },
    {
      quote: "Perfect for first-time exporters. The team guided us through every step and the market report helped us focus on the right countries.",
      author: "Priya Singh",
      company: "Spice Garden Exports",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-primary-600 hover:bg-gray-100">
              Complete Export Setup Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Export Kickstart Package
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              All-in-one solution for export business setup. Get your IEC, GST, RCMC registrations 
              plus a basic market report to kickstart your global journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white hover:bg-white text-primary-600 px-8 py-4 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button> 
              {/* <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg text-primary-600 border-primary-600">
                <Link to="/consulting/book-free-call">
                  Book Consultation
                </Link> */}
              {/* </Button> */}
            </div>
            {/* Pricing */}
            <div className="text-center mt-8">
              <div className="text-3xl font-bold text-white mb-2">₹40,000 - ₹60,000</div>
              <div className="text-white">Complete Package</div>
              <div className="text-sm text-white mt-2 flex items-center justify-center">
                <Clock className="w-4 h-4 inline mr-1 text-white" />
                15-20 business days delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What's Included in Your Package</h2>
            <p className="text-xl text-primary-600">
              Everything you need to start exporting legally and strategically
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packageIncludes.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-6">{React.cloneElement(item.icon, { className: item.icon.props.className.replace(/text-(blue|green|purple|orange)-600/, 'text-primary-600') })}</div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary-600 transition-colors">
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

      {/* Benefits */}
      <section className="py-20 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Package Benefits</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle className="w-6 h-6 text-accent-600 mr-4 flex-shrink-0" />
                  <span className="text-lg text-primary-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-xl text-primary-600">
              Streamlined 4-step process to get you export-ready
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Document Collection", desc: "Gather required documents and information" },
              { step: "02", title: "Registration Filing", desc: "Submit applications for IEC, GST, RCMC" },
              { step: "03", title: "Approval Processing", desc: "Follow up with authorities for quick approvals" },
              { step: "04", title: "Market Report", desc: "Deliver target market analysis and next steps" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-primary-100 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Client Success Stories</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Export Journey?</h2>
          <p className="text-xl mb-8 text-white mx-auto">
            Get legally compliant and market-ready with our comprehensive kickstart package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-100 px-8 py-3">
              Start Your Package
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button asChild variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-primary-100 px-8 py-3">
              <Link to="/consulting/book-free-call">
                Book  Consultation
              </Link>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExportKickstartPackge;