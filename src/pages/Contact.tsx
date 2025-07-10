import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    message: '',
    serviceInterest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // In a real app, this would send to your backend
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@drehill.com",
      description: "Get a response within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 7901050607",
      description: "Mon-Fri, 9 AM - 6 PM IST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Chhatrapati Sambhajinagar, Maharashtra 431001",
      description: "Schedule an in-person meeting"
    },
    {
      icon: Globe,
      title: "Global Reach",
      details: "25+ Countries",
      description: "We serve clients worldwide"
    }
  ];

  const offices = [
    // {
    //   city: "Mumbai",
    //   country: "India",
    //   address: "Bandra Kurla Complex, Mumbai 400051",
    //   phone: "+91 98765 43210",
    //   email: "mumbai@eximpro.com",
    //   isHQ: true
    // },
    // {
    //   city: "Dubai",
    //   country: "UAE",
    //   address: "DIFC, Dubai, UAE",
    //   phone: "+971 50 123 4567",
    //   email: "dubai@eximpro.com",
    //   isHQ: false
    // },
    // {
    //   city: "Singapore",
    //   country: "Singapore",
    //   address: "Marina Bay, Singapore",
    //   phone: "+65 8123 4567",
    //   email: "singapore@eximpro.com",
    //   isHQ: false
    // }
  ];

  const faqs = [
    {
      question: "What industries do you serve?",
      answer: "We work with exporters across all industries including textiles, pharmaceuticals, food & beverages, automotive parts, chemicals, handicrafts, and more."
    },
    {
      question: "Do you offer services for first-time exporters?",
      answer: "Absolutely! We specialize in helping first-time exporters navigate the complexities of international trade with our step-by-step guidance and affordable pricing."
    },
    {
      question: "What countries do you have experience with?",
      answer: "We have helped clients export to 25+ countries including USA, UK, Germany, UAE, Singapore, Australia, Canada, and many others across different continents."
    },
    {
      question: "How quickly can we start the export process?",
      answer: "After our initial consultation, we can typically help you start the export process within 2-4 weeks, depending on your product and target market requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Ready to expand your business globally? Our export consultants are here to help you 
              navigate international markets and grow your exports.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground mb-2">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Quick Actions */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-foreground mb-2">
                      Country/Market of Interest
                    </label>
                    <Input
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      placeholder="e.g., USA, UAE, Germany"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-foreground mb-2">
                      Service Interest
                    </label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      <option value="export-readiness">Export Readiness Audit</option>
                      <option value="market-research">Market Research</option>
                      <option value="buyer-discovery">Buyer Discovery</option>
                      <option value="seller-discovery">Seller Discovery</option>
                      <option value="compliance">Compliance & Documentation</option>
                      <option value="pricing">Pricing Strategy</option>
                      <option value="strategy-session">Strategy Session</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your export goals and how we can help..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* Quick Actions & Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <Clock className="w-8 h-8 text-primary-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Book a Free Call</h4>
                          <p className="text-sm text-muted-foreground">15-minute consultation call</p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/consulting/book-free-call">Book Now</Link>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-8 h-8 text-primary-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Export Readiness Check</h4>
                          <p className="text-sm text-muted-foreground">Quick product assessment</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/consulting/export-readiness">Start Check</Link>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <Globe className="w-8 h-8 text-primary-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Market Research</h4>
                          <p className="text-sm text-muted-foreground">Country-specific insights</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/consulting/market-research">Learn More</Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Response Time */}
                <Card className="p-6 bg-primary-100 border-primary-200">
                  <h4 className="font-semibold text-foreground mb-2">Our Response Commitment</h4>
                  <ul className="space-y-2 text-sm text-primary-800">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Email responses within 24 hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Phone calls returned same day</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free consultation within 48 hours</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Global Presence</h2>
              <p className="text-xl text-muted-foreground">
                Serving clients across continents with local expertise
              </p>
            </div> */}

            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className={`relative ${office.isHQ ? 'border-primary-500 border-2' : ''}`}>
                  {office.isHQ && (
                    <div className="absolute -top-3 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Headquarters
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span>{office.city}, {office.country}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{office.address}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-accent-400" />
                        <span className="text-sm">{office.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-accent-400" />
                        <span className="text-sm">{office.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about our services
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
