import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Users, TrendingUp, Award, ArrowRight, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: "500+", label: "Exporters Advised", icon: Users },
    { number: "25+", label: "Countries Reached", icon: Globe },
    { number: "₹50Cr+", label: "Export Value Generated", icon: TrendingUp },
    { number: "95%", label: "Client Success Rate", icon: Award }
  ];

  const values = [
    {
      title: "Innovation-First Approach",
      description: "We leverage AI and modern technology to make export consulting accessible and efficient for businesses of all sizes."
    },
    {
      title: "Global Perspective",
      description: "Our team understands international markets, compliance requirements, and cultural nuances across 25+ countries."
    },
    {
      title: "Startup Agility",
      description: "Founded in 2023, we combine the flexibility of a startup with deep industry expertise to deliver rapid results."
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs. Our services are designed to be affordable for first-time exporters and scaling businesses alike."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Lead Consultant",
      experience: "15+ years in International Trade",
      specialization: "Export Strategy & Compliance"
    },
    {
      name: "Priya Sharma",
      role: "Market Research Director",
      experience: "12+ years in Global Markets",
      specialization: "Buyer Discovery & Market Analysis"
    },
    {
      name: "Arjun Patel",
      role: "Technology Head",
      experience: "10+ years in AI & Data",
      specialization: "AI-Powered Trade Solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta would be handled by React Helmet in a real app */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 to-primary-200 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Empowering Indian Businesses to 
              <span className="text-accent-600"> Export Globally</span>
            </h1>
            <p className="text-xl text-primary-600 mb-8 leading-relaxed">
              Founded in 2023, EXIM Pro is India's most innovative export consulting firm, 
              combining cutting-edge AI technology with deep trade expertise to help businesses 
              scale internationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary-600 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="text-primary-700 text-lg px-8 py-3 flex items-center">
                <Link to="/consulting">
                  <Eye className="mr-2 w-5 h-5" />
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-2">{stat.number}</div>
                <div className="text-primary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Our Story</h2>
              <p className="text-xl text-primary-600">
                Born from the vision to democratize global trade for Indian businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-primary-900 mb-6">The Challenge We Saw</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                    <p className="text-primary-600">Traditional export consulting was expensive and slow</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                    <p className="text-primary-600">Small manufacturers struggled to find reliable buyers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                    <p className="text-primary-600">Complex compliance requirements deterred new exporters</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                    <p className="text-primary-600">Market research was fragmented and outdated</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-primary-900 mb-6">Our Solution</h3>
                <p className="text-primary-600 mb-6">
                  We created an AI-powered consulting platform that makes export guidance accessible, 
                  affordable, and actionable. Our technology-first approach combined with human expertise 
                  delivers results that traditional consulting firms can't match.
                </p>
                <p className="text-primary-600">
                  Today, we're proud to have helped over 500 Indian businesses successfully enter 
                  international markets, generating over ₹50 crores in export value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Our Values</h2>
              <p className="text-xl text-primary-600">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-l-4 border-l-accent-500">
                  <CardHeader>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Leadership Team</h2>
              <p className="text-xl text-primary-600">
                Experienced professionals driving innovation in global trade
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-accent-600" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-accent-600 font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary-600 mb-2">{member.experience}</p>
                    <p className="text-sm font-medium text-primary-900">{member.specialization}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent-600 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Your Business Global?
          </h2>
          <p className="text-xl mb-8 text-black">
            Join hundreds of successful exporters who trust EXIM Pro for their international expansion.
          </p>
          <Button asChild className="bg-primary-600 text-lg px-8 py-3">
            <Link to="/consulting/book-free-call">
              Start Your Export Journey Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
