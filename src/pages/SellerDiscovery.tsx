import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Target, Users, Globe, CheckCircle, ArrowRight, Star, TrendingUp, Shield, Package, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { sellerDiscoveryProfiles } from '@/data/sampleReports';

const SellerDiscovery = () => {
  const handleViewSampleProfiles = () => {
    downloadPDFReport(sellerDiscoveryProfiles, 'Indian-Supplier-Profiles-Sample.txt');
  };

  const features = [
    {
      icon: Search,
      title: "Comprehensive Supplier Database",
      description: "Access verified Indian manufacturers and suppliers across all industries"
    },
    {
      icon: Target,
      title: "Quality Verification",
      description: "All suppliers are vetted for certifications, capacity, and reliability"
    },
    {
      icon: Shield,
      title: "Due Diligence Reports",
      description: "Detailed background checks and financial stability assessments"
    },
    {
      icon: Globe,
      title: "Export-Ready Suppliers",
      description: "Connect with suppliers who have proven export capabilities"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "We understand your product specifications, quality standards, and volume needs"
    },
    {
      step: "02",
      title: "Supplier Identification",
      description: "Our team identifies and evaluates potential suppliers based on your criteria"
    },
    {
      step: "03",
      title: "Verification & Vetting",
      description: "Comprehensive verification of supplier credentials, capacity, and quality systems"
    },
    {
      step: "04",
      title: "Introduction & Support",
      description: "Facilitate introductions and provide ongoing support for successful partnerships"
    }
  ];

  const industries = [
    "Textiles & Garments", "Pharmaceuticals & APIs", "Food & Agricultural Products", "Automotive Components",
    "Chemicals & Petrochemicals", "Handicrafts & Home Decor", "Electronics & Components", "Machinery & Equipment",
    "Gems & Jewelry", "Leather Products", "Ayurveda & Herbal Products", "Engineering Goods"
  ];

  const supplierTypes = [
    {
      type: "Manufacturers",
      description: "Direct factory access with competitive pricing",
      count: "5,000+"
    },
    {
      type: "Exporters",
      description: "Experienced export houses with global reach",
      count: "2,500+"
    },
    {
      type: "Trading Houses",
      description: "Multi-product suppliers with diverse portfolios",
      count: "1,500+"
    },
    {
      type: "Cooperatives",
      description: "Farmer and artisan cooperatives with authentic products",
      count: "800+"
    }
  ];

  const verificationChecks = [
    "Company Registration & Legal Status",
    "Export Licenses & Certifications",
    "Quality Management Systems",
    "Production Capacity Assessment",
    "Financial Stability Analysis",
    "Reference Checks with Existing Clients",
    "Factory Inspection Reports",
    "Compliance with International Standards"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Imports LLC (USA)",
      content: "Found reliable spice suppliers in just 2 weeks. The verification process was thorough and saved us from potential issues.",
      rating: 5
    },
    {
      name: "Ahmed Al-Rashid",
      company: "Arabian Trading Co. (UAE)",
      content: "Excellent supplier matching for textiles. The quality and pricing exceeded our expectations.",
      rating: 5
    },
    {
      name: "Emma Schmidt",
      company: "European Organics (Germany)",
      content: "Perfect match for organic products. The suppliers were pre-verified and export-ready.",
      rating: 5
    }
  ];

  const packages = [
    {
      name: "Basic Discovery",
      price: "$500",
      period: "per search",
      features: [
        "10 verified suppliers",
        "Basic company profiles",
        "Contact information",
        "Product catalogs",
        "Email introductions"
      ],
      popular: false
    },
    {
      name: "Professional Sourcing",
      price: "$1,200",
      period: "per search",
      features: [
        "25 verified suppliers",
        "Detailed due diligence",
        "Quality assessments",
        "Price negotiations",
        "Sample coordination",
        "3 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise Partnership",
      price: "$2,500",
      period: "per search",
      features: [
        "50+ verified suppliers",
        "Factory inspections",
        "Custom agreements",
        "Quality monitoring",
        "Logistics support",
        "12 months support",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  const regions = [
    {
      name: "North India",
      states: "Delhi, Punjab, Haryana, Rajasthan",
      specialties: "Textiles, Agricultural Products, Handicrafts"
    },
    {
      name: "West India",
      states: "Gujarat, Maharashtra, Rajasthan",
      specialties: "Chemicals, Pharmaceuticals, Engineering"
    },
    {
      name: "South India",
      states: "Tamil Nadu, Karnataka, Kerala, Andhra Pradesh",
      specialties: "IT Hardware, Spices, Garments, Auto Parts"
    },
    {
      name: "East India",
      states: "West Bengal, Odisha, Jharkhand",
      specialties: "Jute Products, Steel, Handicrafts"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 to-primary-200 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Package className="w-4 h-4 mr-2" />
              Verified Indian Suppliers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Trusted Indian Suppliers & Manufacturers in 
              <span className="text-primary-600"> 72 Hours</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with verified, export-ready Indian suppliers across all industries. 
              Our comprehensive vetting process ensures you partner with reliable manufacturers 
              who can meet your quality and delivery requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Find Suppliers Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-secondary text-lg px-8 py-3" onClick={handleViewSampleProfiles}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>10,000+ verified suppliers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>All industries covered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>Export-ready partners</span>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Seller Discovery Service
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive supplier intelligence with guaranteed quality
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
                    <p className="text-secondary">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Supplier Discovery Process
              </h2>
              <p className="text-xl text-muted-foreground">
                From requirements to verified supplier connections in 4 steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-xl font-bold mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                    <p className="text-secondary">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-accent-400 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Types & Industries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Supplier Types */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Types of Suppliers</h2>
                <div className="space-y-6">
                  {supplierTypes.map((supplier, index) => (
                    <Card key={index} className="border-l-4 border-l-primary-600">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{supplier.type}</CardTitle>
                            <CardDescription className="mt-2">{supplier.description}</CardDescription>
                          </div>
                          <span className="text-primary-600 font-bold text-lg">{supplier.count}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Industries We Cover</h2>
                <div className="grid grid-cols-1 gap-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-foreground font-medium">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Comprehensive Verification Process</h2>
              <p className="text-xl text-muted-foreground">
                Every supplier undergoes rigorous verification before we recommend them
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verificationChecks.map((check, index) => (
                <Card key={index} className="bg-white text-center p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-4">
                    <CheckCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{check}</h3>
                </Card>
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
              <h2 className="text-3xl font-bold text-foreground mb-6">Pan-India Coverage</h2>
              <p className="text-xl text-muted-foreground">
                Access suppliers from all major manufacturing hubs across India
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {regions.map((region, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Globe className="w-6 h-6 text-primary-600 mr-3" />
                      {region.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {region.states}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Key Specialties: </span>
                      <span className="text-muted-foreground">{region.specialties}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">What Global Buyers Say</h2>
              <p className="text-xl text-muted-foreground">
                Success stories from international businesses sourcing from India
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
                    <CardDescription className="text-muted-foreground">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
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
              <h2 className="text-3xl font-bold text-foreground mb-6">Choose Your Package</h2>
              <p className="text-xl text-muted-foreground">
                Flexible pricing for businesses of all sizes
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
                      <span className="text-sm text-muted-foreground font-normal">/{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
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
            Ready to Find Your Perfect Indian Supplier?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join hundreds of global buyers who've successfully sourced from India through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-accent-100">
              <Link to="/consulting/book-free-call">
                Start Supplier Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-accent-100" onClick={handleViewSampleProfiles}>
              <Eye className="mr-2 w-5 h-5" />
              View Sample Reports
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerDiscovery;
