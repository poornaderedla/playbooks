import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Target, Users, Globe, CheckCircle, ArrowRight, Star, TrendingUp, Shield, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { buyerDiscoveryReport } from '@/data/sampleReports';

const BuyerDiscovery = () => {
  const handleDownloadSampleReport = () => {
    downloadPDFReport(buyerDiscoveryReport, 'Buyer-Discovery-Sample-Report.txt');
  };

  const features = [
    {
      icon: Search,
      title: "AI-Powered Search",
      description: "Our advanced algorithms scan millions of trade records to find verified buyers"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Match your products with buyers who have purchased similar items recently"
    },
    {
      icon: Shield,
      title: "Verified Contacts",
      description: "All buyer information is verified and updated regularly for accuracy"
    },
    {
      icon: Globe,
      title: "Global Database",
      description: "Access buyers from 25+ countries across all major industries"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Product Analysis",
      description: "We analyze your product specifications, HS codes, and target markets"
    },
    {
      step: "02",
      title: "Market Scanning",
      description: "Our AI scans global trade databases and buyer networks"
    },
    {
      step: "03",
      title: "Buyer Profiling",
      description: "We create detailed profiles of potential buyers with contact information"
    },
    {
      step: "04",
      title: "Direct Outreach",
      description: "Get personalized introduction emails and connection strategies"
    }
  ];

  const industries = [
    "Textiles & Apparel", "Pharmaceuticals", "Food & Beverages", "Automotive Parts",
    "Chemicals", "Handicrafts", "Electronics", "Machinery", "Gems & Jewelry",
    "Home Decor", "Ayurveda & Cosmetics", "Agricultural Products"
  ];

  const countries = [
    { name: "United States", buyers: "2,500+" },
    { name: "United Kingdom", buyers: "1,800+" },
    { name: "Germany", buyers: "2,200+" },
    { name: "UAE", buyers: "1,500+" },
    { name: "Singapore", buyers: "900+" },
    { name: "Australia", buyers: "1,200+" },
    { name: "Canada", buyers: "1,000+" },
    { name: "Netherlands", buyers: "800+" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Textile Exports Ltd",
      content: "Found 15 verified buyers in just 2 weeks. The AI matching was incredibly accurate!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      company: "Ayurveda Global",
      content: "Connected with buyers from 3 countries. Our export revenue increased by 200%.",
      rating: 5
    },
    {
      name: "Arjun Patel",
      company: "Handicrafts India",
      content: "The buyer profiles were detailed and accurate. Saved months of research time.",
      rating: 5
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "₹15,000",
      period: "one-time",
      features: [
        "25 verified buyers",
        "Basic company profiles",
        "Contact information",
        "Industry analysis",
        "Email templates"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹25,000",
      period: "one-time",
      features: [
        "50 verified buyers",
        "Detailed buyer profiles",
        "Purchase history data",
        "Market insights",
        "Personalized outreach",
        "3 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹45,000",
      period: "one-time",
      features: [
        "100+ verified buyers",
        "Premium buyer intelligence",
        "Trade pattern analysis",
        "Competitive insights",
        "Custom outreach strategy",
        "6 months support",
        "Monthly updates"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Buyer Discovery
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Global Buyers for Your Products in 
              <span className="text-white"> 48 Hours</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Our AI technology scans millions of trade records to find verified international buyers 
              actively purchasing products like yours. No more cold calling or endless searching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-white text-primary-600 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Start Buyer Discovery
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="text-gray-700 text-lg px-8 py-3" onClick={handleDownloadSampleReport}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Report
              </Button> */}
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-primary-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>48-hour delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Verified contacts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>25+ countries</span>
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
                Why Our Buyer Discovery Works
              </h2>
              <p className="text-xl text-gray-600">
                Advanced technology meets deep market expertise
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

      {/* Process Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Discovery Process
              </h2>
              <p className="text-xl text-gray-600">
                From product analysis to verified buyer contacts in 4 simple steps
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Countries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Industries */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Industries We Cover</h2>
                <div className="grid grid-cols-2 gap-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Buyer Markets</h2>
                <div className="space-y-4">
                  {countries.map((country, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
                      <span className="font-medium text-gray-900">{country.name}</span>
                      <span className="text-primary-600 font-semibold">{country.buyers}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories</h2>
              <p className="text-xl text-gray-600">
                See how our buyer discovery has transformed businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-600">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Package</h2>
              <p className="text-xl text-gray-600">
                Transparent pricing with no hidden costs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-primary-500 border-2' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary-600 mt-4">
                      {pkg.price}
                      <span className="text-sm text-gray-500 font-normal">/{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full ${pkg.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      <Link to="/consulting/book-free-call">
                        Get Started
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
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Global Buyers?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join hundreds of exporters who've discovered new markets with our AI-powered buyer discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-100 text-lg px-8 py-3">
              <Link to="/consulting/book-free-call">
                Start Discovery Process
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* <Button variant="outline" size="lg" className="text-gray-700 text-lg px-8 py-3" onClick={handleDownloadSampleReport}>
              <Eye className="mr-2 w-5 h-5" />
              View Sample Report
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerDiscovery;
