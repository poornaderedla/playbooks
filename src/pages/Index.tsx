
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  FileCheck,
  Search,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      title: "Export Readiness Audit",
      description: "Complete assessment of your product's global readiness",
      icon: <FileCheck className="w-8 h-8 text-blue-600" />,
      link: "/consulting/export-readiness"
    },
    {
      title: "Market Research",
      description: "Data-driven insights for optimal market selection",
      icon: <Search className="w-8 h-8 text-green-600" />,
      link: "/consulting/market-research"
    },
    {
      title: "Pricing Strategy",
      description: "Optimize pricing for global competitiveness",
      icon: <Calculator className="w-8 h-8 text-purple-600" />,
      link: "/consulting/pricing-strategy"
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
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Trusted EXIM Consulting Since 2023
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Scale Your Business Globally
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Expert EXIM consulting for Indian exporters and global buyers. 
              Navigate international trade with confidence and accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/consulting">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Book Free Consultation
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Core Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive EXIM consulting solutions for your global expansion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link to={service.link}>
                    <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/consulting">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Choose EXIM Pro?</h2>
              <p className="text-xl text-gray-600">
                A modern consulting firm built for today's global trade challenges
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Tech-Forward Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Combining AI tools with expert consultation for smarter, faster export decisions.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">SME Focused</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accessible pricing and tailored solutions for first-time exporters and growing businesses.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  Trusted by clients exporting to 12+ countries across US, EU, UAE, and Asia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                "EXIM Pro transformed our export approach. Their tech-savvy team helped us identify the right markets and avoid costly compliance mistakes. We're now successfully exporting to 5 countries with 200% revenue growth."
              </blockquote>
              <div className="border-t pt-6">
                <div className="font-semibold text-lg">Rahul Agarwal</div>
                <div className="text-gray-600">CEO, Global Spices Ltd</div>
                <div className="text-blue-600 font-medium mt-1">🌍 Exporting to US, EU, UAE, Singapore</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 100+ successful exporters who trust EXIM Pro for their international expansion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consulting">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Start Your Export Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
