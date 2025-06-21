
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Target, Users, Globe, CheckCircle, ArrowRight, Star, TrendingUp, Shield, Package, Download, Eye, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { globalSellerDiscoveryProfiles } from '@/data/sampleReports';

const GlobalSellerDiscovery = () => {
  const handleViewSampleProfiles = () => {
    downloadPDFReport(globalSellerDiscoveryProfiles, 'Global-Supplier-Profiles-Sample.txt');
  };

  const features = [
    {
      icon: Search,
      title: "Worldwide Supplier Network",
      description: "Access verified manufacturers and suppliers from 50+ countries globally"
    },
    {
      icon: Target,
      title: "Multi-Tier Verification",
      description: "Rigorous vetting process including certifications, capacity, and compliance checks"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Comprehensive risk analysis including political, economic, and operational factors"
    },
    {
      icon: Globe,
      title: "Cross-Border Expertise",
      description: "Navigate international trade regulations and cultural business practices"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Global Requirements Analysis",
      description: "Define product specifications, quality standards, volume needs, and preferred regions"
    },
    {
      step: "02",
      title: "Worldwide Supplier Mapping",
      description: "Identify and evaluate suppliers across multiple countries and regions"
    },
    {
      step: "03",
      title: "International Verification",
      description: "Multi-layer verification including certifications, compliance, and on-ground validation"
    },
    {
      step: "04",
      title: "Strategic Partnership",
      description: "Facilitate introductions and provide ongoing support for international partnerships"
    }
  ];

  const industries = [
    "Electronics & Technology", "Automotive & Transportation", "Pharmaceuticals & Healthcare", "Food & Beverages",
    "Textiles & Fashion", "Chemicals & Materials", "Machinery & Industrial Equipment", "Consumer Goods",
    "Energy & Renewable Resources", "Agriculture & Commodities", "Aerospace & Defense", "Construction Materials"
  ];

  const supplierRegions = [
    {
      region: "Asia-Pacific",
      countries: "China, Japan, South Korea, Thailand, Vietnam, Malaysia, Singapore",
      specialties: "Electronics, Textiles, Automotive Parts, Consumer Goods",
      count: "15,000+"
    },
    {
      region: "Europe",
      countries: "Germany, Italy, Netherlands, France, Poland, Czech Republic",
      specialties: "Machinery, Automotive, Chemicals, Precision Engineering",
      count: "8,500+"
    },
    {
      region: "North America",
      countries: "USA, Canada, Mexico",
      specialties: "Technology, Aerospace, Pharmaceuticals, Advanced Materials",
      count: "6,200+"
    },
    {
      region: "Latin America",
      countries: "Brazil, Argentina, Chile, Colombia",
      specialties: "Agriculture, Mining, Food Processing, Textiles",
      count: "3,800+"
    }
  ];

  const verificationStandards = [
    "ISO 9001 Quality Management",
    "ISO 14001 Environmental Standards",
    "OHSAS 18001 Safety Compliance",
    "Fair Trade Certifications",
    "Industry-Specific Certifications",
    "Financial Stability Assessment",
    "Supply Chain Transparency",
    "Ethical Sourcing Verification"
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      company: "TechGlobal Inc. (USA)",
      content: "Found exceptional electronics suppliers in Vietnam and Taiwan. The global network saved us months of research.",
      rating: 5
    },
    {
      name: "Isabella Rodriguez",
      company: "Fashion Forward (Spain)",
      content: "Connected with sustainable textile suppliers across 4 countries. Perfect for our ethical sourcing needs.",
      rating: 5
    },
    {
      name: "James Wilson",
      company: "Industrial Solutions (UK)",
      content: "Excellent machinery suppliers from Germany and Italy. The verification process was incredibly thorough.",
      rating: 5
    }
  ];

  const packages = [
    {
      name: "Regional Focus",
      price: "$800",
      period: "per search",
      features: [
        "15 verified suppliers",
        "Single region coverage",
        "Basic company profiles",
        "Contact information",
        "Compliance verification"
      ],
      popular: false
    },
    {
      name: "Global Explorer",
      price: "$1,800",
      period: "per search",
      features: [
        "35 verified suppliers",
        "Multi-region coverage",
        "Detailed risk assessments",
        "Cultural guidance",
        "Sample coordination",
        "6 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise Global",
      price: "$3,500",
      period: "per search",
      features: [
        "75+ verified suppliers",
        "Worldwide coverage",
        "On-site inspections",
        "Custom agreements",
        "Supply chain optimization",
        "12 months support",
        "Dedicated global manager"
      ],
      popular: false
    }
  ];

  const tradingBlocs = [
    {
      name: "ASEAN",
      description: "Southeast Asian Economic Community",
      advantages: "Low costs, growing economies, strategic location"
    },
    {
      name: "European Union",
      description: "Single market with harmonized standards",
      advantages: "High quality, regulatory alignment, innovation"
    },
    {
      name: "NAFTA/USMCA",
      description: "North American trade agreement",
      advantages: "Proximity, advanced technology, stable supply"
    },
    {
      name: "Mercosur",
      description: "South American common market",
      advantages: "Natural resources, agricultural products, cost efficiency"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Global Supplier Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Verified Global Suppliers & Manufacturers in 
              <span className="text-green-600"> 96 Hours</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access our worldwide network of verified suppliers across 50+ countries. 
              From Asian manufacturers to European precision engineering, find the perfect 
              international partners for your sourcing needs with comprehensive risk assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Find Global Suppliers
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" onClick={handleViewSampleProfiles}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Profiles
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>50+ countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>35,000+ suppliers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Risk-assessed partners</span>
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
                Why Choose Our Global Seller Discovery
              </h2>
              <p className="text-xl text-gray-600">
                Navigate international sourcing with confidence and expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-green-600" />
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Global Discovery Process
              </h2>
              <p className="text-xl text-gray-600">
                From requirements to verified international partnerships in 4 steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full text-xl font-bold mb-6">
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

      {/* Regional Coverage */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Regional Coverage</h2>
              <p className="text-xl text-gray-600">
                Access suppliers from major manufacturing regions worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {supplierRegions.map((region, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          <MapPin className="w-6 h-6 text-green-600 mr-3" />
                          {region.region}
                        </CardTitle>
                        <CardDescription className="mt-2 text-gray-600">
                          {region.countries}
                        </CardDescription>
                      </div>
                      <span className="text-green-600 font-bold text-lg">{region.count}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Key Specialties: </span>
                      <span className="text-gray-600">{region.specialties}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Trading Blocs */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Industries */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Global Industries</h2>
                <div className="grid grid-cols-1 gap-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Blocs */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Trading Blocs</h2>
                <div className="space-y-6">
                  {tradingBlocs.map((bloc, index) => (
                    <Card key={index} className="bg-white">
                      <CardHeader>
                        <CardTitle className="text-lg">{bloc.name}</CardTitle>
                        <CardDescription>{bloc.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Advantages: </span>
                          <span className="text-gray-600">{bloc.advantages}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Verification Standards</h2>
              <p className="text-xl text-gray-600">
                Every global supplier meets our rigorous international standards
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verificationStandards.map((standard, index) => (
                <Card key={index} className="bg-gray-50 text-center p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{standard}</h3>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Success Stories</h2>
              <p className="text-xl text-gray-600">
                How businesses worldwide benefit from our global supplier network
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Sourcing Packages</h2>
              <p className="text-xl text-gray-600">
                Tailored solutions for international supplier discovery
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-green-500 border-2' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-green-600 mt-4">
                      {pkg.price}
                      <span className="text-sm text-gray-500 font-normal">/{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full ${pkg.popular ? 'bg-green-600 hover:bg-green-700' : ''}`}
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
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore Global Suppliers?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of businesses sourcing globally with confidence through our verified supplier network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link to="/consulting/book-free-call">
                Start Global Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600" onClick={handleViewSampleProfiles}>
              <Eye className="mr-2 w-5 h-5" />
              Download Global Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalSellerDiscovery;
