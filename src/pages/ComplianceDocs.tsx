import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Globe, CheckCircle, ArrowRight, Clock, Users, Award, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { complianceDocuments } from '@/data/sampleReports';

const ComplianceDocs = () => {
  const handleViewSampleDocs = () => {
    downloadPDFReport(complianceDocuments, 'Export-Compliance-Documents-Sample.txt');
  };

  const features = [
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "All export documents prepared according to destination country requirements"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Ensure adherence to international trade laws and regulations"
    },
    {
      icon: Globe,
      title: "Country-Specific Guidance",
      description: "Tailored compliance strategies for over 190 countries"
    },
    {
      icon: Award,
      title: "Certification Support",
      description: "Assistance with quality certifications and product standards"
    }
  ];

  const documentTypes = [
    {
      category: "Export Documentation",
      documents: [
        "Commercial Invoice",
        "Packing List", 
        "Bill of Lading/Airway Bill",
        "Certificate of Origin",
        "Export License (if required)",
        "Insurance Certificate"
      ]
    },
    {
      category: "Product Compliance",
      documents: [
        "Product Certificates",
        "Quality Test Reports", 
        "Safety Data Sheets (SDS)",
        "Material Safety Data Sheets",
        "Phytosanitary Certificates",
        "Health Certificates"
      ]
    },
    {
      category: "Regulatory Compliance",
      documents: [
        "FDA Registration",
        "CE Marking Documentation",
        "FCC Certification",
        "Customs Declarations",
        "Import Permits",
        "Excise Documentation"
      ]
    },
    {
      category: "Financial Documentation",
      documents: [
        "Letter of Credit",
        "Bank Guarantee",
        "Export Credit Insurance",
        "Foreign Exchange Documentation",
        "Tax Compliance Certificates",
        "Audit Reports"
      ]
    }
  ];

  const regions = [
    {
      name: "North America",
      countries: "USA, Canada, Mexico",
      requirements: "FDA, CPSC, Transport Canada regulations",
      speciality: "Food, pharma, and consumer goods compliance"
    },
    {
      name: "European Union",
      countries: "27 EU Member States",
      requirements: "CE marking, REACH, RoHS compliance",
      speciality: "Technical standards and environmental regulations"
    },
    {
      name: "Asia Pacific",
      countries: "Japan, Australia, Korea, ASEAN",
      requirements: "JIS, AS/NZS, KS standards",
      speciality: "Electronics and automotive compliance"
    },
    {
      name: "Middle East & Africa",
      countries: "GCC, South Africa, Nigeria",
      requirements: "SASO, SABER, NRCS standards",
      speciality: "Halal certification and regional standards"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Requirement Assessment",
      description: "Analyze destination country regulations and product-specific requirements"
    },
    {
      step: "02", 
      title: "Documentation Planning",
      description: "Create comprehensive checklist of required documents and certifications"
    },
    {
      step: "03",
      title: "Document Preparation", 
      description: "Prepare, review, and verify all compliance documents"
    },
    {
      step: "04",
      title: "Compliance Verification",
      description: "Final review and submission support for seamless clearance"
    }
  ];

  const packages = [
    {
      name: "Basic Compliance",
      price: "$800",
      period: "per shipment",
      features: [
        "Standard export documents",
        "Basic compliance check",
        "Document templates",
        "Email support",
        "7-day processing"
      ],
      popular: false
    },
    {
      name: "Professional Compliance",
      price: "$1,500",
      period: "per shipment", 
      features: [
        "Complete documentation",
        "Regulatory compliance",
        "Custom certifications",
        "Priority processing",
        "Phone support",
        "3-day processing"
      ],
      popular: true
    },
    {
      name: "Enterprise Compliance",
      price: "$2,800",
      period: "per shipment",
      features: [
        "Full compliance management",
        "Dedicated compliance officer",
        "Real-time tracking",
        "Emergency processing",
        "24/7 support",
        "Same-day processing"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      company: "TechExport Solutions",
      content: "Saved us from major compliance issues. Their documentation was perfect and cleared customs without any delays.",
      rating: 5
    },
    {
      name: "Priya Sharma", 
      company: "Organic Foods International",
      content: "Complex food export regulations made simple. Every document was accurate and compliant.",
      rating: 5
    },
    {
      name: "David Wilson",
      company: "Precision Manufacturing",
      content: "Outstanding support for CE marking and EU compliance. Highly recommended for technical products.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-primary-100">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Global Compliance Experts
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Global Export
              <span className="text-white"> Compliance & Documentation</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Navigate complex international trade regulations with confidence. Our experts ensure 
              100% compliance with destination country requirements, preventing costly delays 
              and penalties in global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white hover:bg-white text-primary-600 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Schedule Compliance Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="text-primary-700 text-lg px-8 py-3" onClick={handleViewSampleDocs}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button> */}
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-primary-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>190+ countries covered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>99.8% clearance rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Expert compliance team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Comprehensive Compliance Solutions
              </h2>
              <p className="text-xl text-primary-600">
                End-to-end support for international trade compliance
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
                    <p className="text-primary-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Document Types */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Complete Documentation Coverage</h2>
              <p className="text-xl text-primary-600">
                All export documents prepared by compliance experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {documentTypes.map((category, index) => (
                <Card key={index} className="bg-primary-100">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <FileText className="w-6 h-6 text-primary-600 mr-3" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <span className="text-primary-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Global Regulatory Expertise</h2>
              <p className="text-xl text-primary-600">
                Specialized knowledge of regional compliance requirements
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
                    <CardDescription>{region.countries}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-primary-900">Key Requirements: </span>
                        <span className="text-primary-600">{region.requirements}</span>
                      </div>
                      <div>
                        <span className="font-medium text-primary-900">Speciality: </span>
                        <span className="text-primary-600">{region.speciality}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Compliance Process</h2>
              <p className="text-xl text-primary-600">
                Systematic approach to ensure 100% compliance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-primary-100 rounded-full text-xl font-bold mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-4">{step.title}</h3>
                    <p className="text-primary-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Client Success Stories</h2>
              <p className="text-xl text-primary-600">
                Trusted by exporters worldwide for compliance excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-primary-100">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <CheckCircle key={i} className="w-4 h-4 text-primary-500" />
                      ))}
                    </div>
                    <CardDescription className="text-primary-600">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-primary-900">{testimonial.name}</div>
                    <div className="text-sm text-primary-600">{testimonial.company}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Compliance Packages</h2>
              <p className="text-xl text-primary-600">
                Choose the right level of compliance support for your exports
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-primary-100 px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary-900">{pkg.price}</span>
                      <span className="text-primary-600 ml-2">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-primary-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full mt-8 ${pkg.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ensure Compliance Success?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Don't let compliance issues derail your export success. Get expert guidance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-100 text-primary-600 hover:bg-primary-200 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Schedule Compliance Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="bg-primary-100 text-primary-600 hover:bg-primary-200 text-lg px-8 py-3" onClick={handleViewSampleDocs}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComplianceDocs;
