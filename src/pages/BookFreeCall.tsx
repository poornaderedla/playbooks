
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, CheckCircle, Users, Globe, ArrowRight, Phone, Video, MessageSquare } from 'lucide-react';

const BookFreeCall = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    products: '',
    targetMarkets: '',
    experience: '',
    challenges: '',
    preferredTime: '',
    callType: 'video'
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with Calendly or booking system
    console.log('Booking request:', formData);
  };

  const benefits = [
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Speak directly with our experienced export consultants"
    },
    {
      icon: Globe,
      title: "Market Insights",
      description: "Get preliminary insights about your target markets"
    },
    {
      icon: CheckCircle,
      title: "Custom Roadmap",
      description: "Receive a personalized export strategy outline"
    },
    {
      icon: ArrowRight,
      title: "Next Steps",
      description: "Clear action plan for your export journey"
    }
  ];

  const callTypes = [
    {
      type: 'video',
      icon: Video,
      title: 'Video Call',
      description: 'Face-to-face consultation via Zoom/Teams',
      duration: '30 minutes'
    },
    {
      type: 'phone',
      icon: Phone,
      title: 'Phone Call',
      description: 'Voice consultation at your convenience',
      duration: '20 minutes'
    },
    {
      type: 'chat',
      icon: MessageSquare,
      title: 'WhatsApp Call',
      description: 'Quick consultation via WhatsApp',
      duration: '15 minutes'
    }
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM IST",
    "10:00 AM - 11:00 AM IST", 
    "11:00 AM - 12:00 PM IST",
    "2:00 PM - 3:00 PM IST",
    "3:00 PM - 4:00 PM IST",
    "4:00 PM - 5:00 PM IST",
    "5:00 PM - 6:00 PM IST"
  ];

  const whatToExpect = [
    {
      title: "Business Overview",
      description: "We'll discuss your products, current operations, and export goals",
      duration: "5 minutes"
    },
    {
      title: "Market Assessment", 
      description: "Quick analysis of your target markets and opportunities",
      duration: "10 minutes"
    },
    {
      title: "Challenge Identification",
      description: "Identify key barriers and challenges you're facing",
      duration: "10 minutes"
    },
    {
      title: "Roadmap Discussion",
      description: "Outline next steps and how we can help you succeed",
      duration: "5 minutes"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Spice Exports Ltd",
      content: "The free consultation gave me clarity on export documentation. Within 3 months, we started exporting to 2 new countries!",
      result: "Now exporting to 5 countries"
    },
    {
      name: "Priya Sharma", 
      company: "Handicrafts Global",
      content: "They helped me understand the real potential of my products in international markets. The guidance was invaluable.",
      result: "200% growth in exports"
    },
    {
      name: "Arjun Patel",
      company: "Ayurveda Exports",
      content: "The consultation call helped me avoid costly mistakes in EU regulations. Their expertise saved me thousands.",
      result: "Avoided regulatory issues"
    }
  ];

  const faqs = [
    {
      question: "Is the consultation really free?",
      answer: "Yes, absolutely! This is a genuine 15-30 minute consultation with no hidden costs. We believe in providing value upfront."
    },
    {
      question: "What if I'm a complete beginner to exporting?",
      answer: "Perfect! We specialize in helping first-time exporters. We'll explain everything in simple terms and guide you through the basics."
    },
    {
      question: "Do I need to prepare anything for the call?",
      answer: "Just basic information about your products and target markets. We'll guide you through everything else during the call."
    },
    {
      question: "What happens after the free consultation?",
      answer: "You'll receive a summary email with key insights and recommended next steps. There's no obligation to purchase our services."
    },
    {
      question: "Can you help with any type of product?",
      answer: "Yes! We have experience across all industries - from textiles and food products to pharmaceuticals and machinery."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Free Export Consultation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Book Your Free 
              <span className="text-blue-600"> Export Strategy Call</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get expert guidance on taking your products global. Our consultants will assess your export readiness, 
              identify opportunities, and create a personalized roadmap for international success.
            </p>
            
            <div className="flex items-center justify-center space-x-8 mb-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% Free consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Expert export advice</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Personalized roadmap</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Call</h3>
              
              {/* Multi-step form would go here - simplified for demo */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What products do you want to export?
                  </label>
                  <Input
                    value={formData.products}
                    onChange={(e) => setFormData({...formData, products: e.target.value})}
                    placeholder="e.g., Textiles, Spices, Handicrafts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Markets (if known)
                  </label>
                  <Input
                    value={formData.targetMarkets}
                    onChange={(e) => setFormData({...formData, targetMarkets: e.target.value})}
                    placeholder="e.g., USA, UAE, Germany"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Experience Level
                  </label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  >
                    <option value="">Select your experience</option>
                    <option value="beginner">Complete beginner</option>
                    <option value="some">Some experience</option>
                    <option value="experienced">Experienced exporter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Call Time
                  </label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  >
                    <option value="">Select preferred time</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  Book My Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Consultation Format</h2>
              <p className="text-xl text-gray-600">
                We offer flexible consultation options to suit your preferences
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {callTypes.map((type, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                      <type.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{type.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect in Your Call</h2>
              <p className="text-xl text-gray-600">
                Here's how we'll make the most of our time together
              </p>
            </div>
            
            <div className="space-y-6">
              {whatToExpect.map((item, index) => (
                <div key={index} className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
                    {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Your Free Consultation</h2>
              <p className="text-xl text-gray-600">
                Get immediate value from our expert guidance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <benefit.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories</h2>
              <p className="text-xl text-gray-600">
                See how our free consultations have helped businesses grow
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <CardDescription className="text-gray-600">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-600 font-medium">Result</div>
                        <div className="text-sm font-bold text-blue-700">{testimonial.result}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our free consultation
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Export Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your free consultation now and take the first step toward global success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Book Free Call Now
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              <Phone className="mr-2 w-5 h-5" />
              Call +91 98765 43210
            </Button>
          </div>
          
          <div className="mt-8 text-blue-100">
            <p className="text-sm">Available Monday-Friday, 9 AM - 6 PM IST</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookFreeCall;
