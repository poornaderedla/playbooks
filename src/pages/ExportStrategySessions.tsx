import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, MessageCircle, Calendar, ArrowRight, CheckCircle, Clock, Star, Video, Phone, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExportStrategySessions = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Work directly with seasoned export professionals who've built successful global businesses"
    },
    {
      icon: Target,
      title: "Customized Strategy",
      description: "Personalized roadmap tailored to your specific products, markets, and business goals"
    },
    {
      icon: MessageCircle,
      title: "Problem Solving",
      description: "Get immediate solutions to your specific export challenges and roadblocks"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Sessions scheduled at your convenience with options for multiple time zones"
    }
  ];

  const sessionTypes = [
    {
      type: "Strategy Development Session",
      duration: "90 minutes",
      price: "$300",
      description: "Comprehensive session to develop your export strategy from scratch",
      includes: [
        "Market selection guidance",
        "Product positioning strategy",
        "Entry strategy development",
        "Competitive analysis",
        "Action plan creation",
        "Resource requirements"
      ]
    },
    {
      type: "Problem-Solving Session",
      duration: "60 minutes", 
      price: "$200",
      description: "Focused session to address specific export challenges",
      includes: [
        "Issue diagnosis",
        "Solution brainstorming",
        "Implementation roadmap",
        "Risk mitigation",
        "Next steps planning",
        "Follow-up guidance"
      ]
    },
    {
      type: "Market Entry Planning",
      duration: "120 minutes",
      price: "$400",
      description: "Deep-dive session for entering new international markets",
      includes: [
        "Market analysis review",
        "Entry strategy options",
        "Partner identification",
        "Regulatory requirements",
        "Timeline development",
        "Budget planning"
      ]
    }
  ];

  const expertiseAreas = [
    "Market Research & Selection",
    "Export Documentation",
    "International Marketing",
    "Pricing & Costing Strategy",
    "Supply Chain Optimization",
    "Compliance & Regulations",
    "Buyer & Seller Discovery",
    "Digital Marketing for Exports",
    "Trade Finance Solutions",
    "Risk Management",
    "Partnership Development",
    "Export Operations"
  ];

  const consultants = [
    {
      name: "Dr. Priya Sharma",
      title: "International Trade Strategist",
      experience: "15+ years",
      expertise: "Market Entry, Compliance, Asia-Pacific",
      languages: "English, Hindi, Mandarin",
      rating: 4.9,
      sessions: 250
    },
    {
      name: "Michael Chen",
      title: "Export Marketing Expert", 
      experience: "12+ years",
      expertise: "Digital Marketing, B2B Sales, North America",
      languages: "English, Spanish, Portuguese",
      rating: 4.8,
      sessions: 180
    },
    {
      name: "Ahmed Al-Rashid",
      title: "MENA Market Specialist",
      experience: "10+ years", 
      expertise: "Middle East, Africa, Islamic Markets",
      languages: "English, Arabic, French",
      rating: 4.9,
      sessions: 150
    }
  ];

  const process = [
    {
      step: "01",
      title: "Book Your Session",
      description: "Choose your preferred consultant, session type, and convenient time slot"
    },
    {
      step: "02",
      title: "Pre-Session Preparation",
      description: "Complete brief questionnaire to help consultant prepare for your specific needs"
    },
    {
      step: "03", 
      title: "Strategy Session",
      description: "One-on-one video call with detailed discussion and strategy development"
    },
    {
      step: "04",
      title: "Action Plan Delivery",
      description: "Receive detailed action plan and resources within 24 hours of session"
    }
  ];

  const packages = [
    {
      name: "Single Session",
      sessions: "1 Session",
      price: "$200-400",
      period: "per session",
      features: [
        "Choose any session type",
        "Expert consultant match",
        "Video or phone call",
        "Session recording",
        "Action plan document",
        "Email follow-up"
      ],
      popular: false
    },
    {
      name: "Strategy Package",
      sessions: "3 Sessions", 
      price: "$750",
      period: "save $150",
      features: [
        "Comprehensive strategy development",
        "Multiple session types",
        "Same consultant continuity",
        "Priority scheduling",
        "Detailed implementation guide",
        "90-day email support"
      ],
      popular: true
    },
    {
      name: "Mentorship Program",
      sessions: "6 Sessions",
      price: "$1,400",
      period: "save $400",
      features: [
        "Complete export mentorship",
        "Quarterly strategy reviews",
        "Dedicated consultant",
        "Unlimited email support",
        "Resource library access",
        "Monthly check-in calls"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Organic Wellness Products",
      content: "The strategy session was incredibly valuable. My consultant helped me avoid costly mistakes and provided a clear roadmap for entering European markets.",
      rating: 5,
      consultant: "Dr. Priya Sharma"
    },
    {
      name: "Carlos Rodriguez",
      company: "Artisan Crafts Exports",
      content: "Excellent guidance on digital marketing strategies. Increased our export inquiries by 300% following the session recommendations.",
      rating: 5,
      consultant: "Michael Chen"
    },
    {
      name: "Fatima Al-Zahra",
      company: "Spice Trading Company", 
      content: "Perfect match for entering Middle Eastern markets. The cultural insights and market knowledge were invaluable.",
      rating: 5,
      consultant: "Ahmed Al-Rashid"
    }
  ];

  const sessionFormats = [
    {
      format: "Video Call",
      icon: Video,
      description: "Face-to-face interaction via Zoom/Teams",
      benefits: "Screen sharing, visual aids, recording"
    },
    {
      format: "Phone Call",
      icon: Phone,
      description: "Traditional phone consultation",
      benefits: "Flexible, no tech requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Expert Mentorship Available
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              1-on-1 Export Strategy
              <span className="text-primary-600"> Mentorship Sessions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get personalized guidance from seasoned export professionals. Our experts have 
              helped thousands of businesses successfully enter and scale in international markets. 
              Skip the learning curve and accelerate your export success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Book Your Strategy Session
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-gray-700 text-lg px-8 py-3">
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Expert consultants</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Personalized strategy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Actionable roadmap</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose 1-on-1 Mentorship
              </h2>
              <p className="text-xl text-gray-600">
                Personalized guidance that accelerates your export success
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Types */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Session Types</h2>
              <p className="text-xl text-gray-600">
                Choose the right session format for your specific needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {sessionTypes.map((session, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl">{session.type}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.duration}
                          </span>
                          <span className="text-primary-600 font-bold text-lg">{session.price}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{session.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {session.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultants */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Expert Consultants</h2>
              <p className="text-xl text-gray-600">
                Work with industry veterans who've been in your shoes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {consultants.map((consultant, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{consultant.name}</CardTitle>
                    <CardDescription className="font-medium text-primary-600">
                      {consultant.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Experience: </span>
                        <span className="text-gray-600">{consultant.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium">Expertise: </span>
                        <span className="text-gray-600">{consultant.expertise}</span>
                      </div>
                      <div>
                        <span className="font-medium">Languages: </span>
                        <span className="text-gray-600">{consultant.languages}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-4 pt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{consultant.rating}</span>
                        </div>
                        <span className="text-gray-600">{consultant.sessions} sessions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-gradient-to-r from-primary-100 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
              <p className="text-xl text-gray-600">
                Comprehensive support across all aspects of international trade
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexible Session Formats</h2>
              <p className="text-xl text-gray-600">
                Choose the format that works best for you
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sessionFormats.map((format, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                      <format.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{format.format}</CardTitle>
                    <CardDescription>{format.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{format.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
              <p className="text-xl text-gray-600">
                Simple process to get expert guidance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-xl font-bold mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Client Success Stories</h2>
              <p className="text-xl text-gray-600">
                Real results from our mentorship sessions
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-600">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-sm text-primary-600 mt-1">
                      Consultant: {testimonial.consultant}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-r from-primary-100 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mentorship Packages</h2>
              <p className="text-xl text-gray-600">
                Flexible options to match your needs and budget
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-sm text-gray-600">{pkg.sessions}</div>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-gray-600 ml-2 text-sm">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full mt-8 ${pkg.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      <Link to="/consulting/book-free-call">
                        Book Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Accelerate Your Export Success?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Don't navigate the complex world of international trade alone. Get expert guidance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-100 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Book Your Strategy Session
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-primary-100 text-lg px-8 py-3"
              >
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExportStrategySessions;
