import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileCheck, 
  CheckCircle, 
  ArrowRight, 
  Globe,
  Shield,
  Package,
  DollarSign,
  Clock,
  Star,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { exportReadinessAuditReport } from '@/data/sampleReports';

const ExportReadiness = () => {
  const handleDownloadSampleReport = () => {
    downloadPDFReport(exportReadinessAuditReport, 'Export-Readiness-Audit-Sample-Report.txt');
  };

  const auditChecklist = [
    {
      category: "Product Classification",
      items: [
        "HS Code identification and verification",
        "Product category compliance requirements",
        "Import duty calculations for target markets"
      ],
      icon: <FileCheck className="w-6 h-6 text-primary-600" />
    },
    {
      category: "Regulatory Requirements", 
      items: [
        "FDA, CE, BIS and other certification needs",
        "Country-specific regulations and standards",
        "Quality control and testing requirements"
      ],
      icon: <Shield className="w-6 h-6 text-accent-500" />
    },
    {
      category: "Packaging & Labeling",
      items: [
        "Export packaging standards review",
        "Labeling requirements for each market",
        "Shelf life and storage guidelines"
      ],
      icon: <Package className="w-6 h-6 text-secondary-600" />
    },
    {
      category: "Pricing Analysis",
      items: [
        "Export price benchmarking",
        "Cost optimization opportunities",
        "Competitive pricing strategy"
      ],
      icon: <DollarSign className="w-6 h-6 text-accent-600" />
    }
  ];

  const useCases = [
    {
      scenario: "Ayurveda founder unsure if her wellness kit meets EU compliance requirements",
      solution: "Complete regulatory audit identifying required certifications and packaging modifications",
      outcome: "Successfully launched in Germany and Netherlands within 3 months",
      icon: "🌿"
    },
    {
      scenario: "Handicraft seller needs export packaging advice for fragile items",
      solution: "Packaging optimization study with cost-effective protection solutions", 
      outcome: "Reduced shipping damage by 80% and cut packaging costs by 30%",
      icon: "🎨"
    },
    {
      scenario: "Food processor wanting to export spices to multiple countries",
      solution: "Multi-country compliance matrix with certification roadmap",
      outcome: "Streamlined certification process, now exporting to 5 countries",
      icon: "🌶️"
    }
  ];

  const benefits = [
    "Avoid costly compliance mistakes",
    "Accelerate time-to-market",
    "Optimize export pricing strategy", 
    "Identify market opportunities",
    "Build buyer confidence",
    "Reduce regulatory risks"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-primary-100 py-4">
        <div className="container mx-auto px-4">
          {/* <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/consulting" className="hover:text-blue-600">Consulting</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Export Readiness Audit</span>
          </nav> */}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-primary-600 hover:bg-gray-100">
              Export Readiness Assessment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Is Your Product <span className="text-white">Global-Ready</span>?
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Comprehensive audit to assess your product's readiness for international markets. 
              Identify compliance gaps, optimize pricing, and accelerate your export journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-white text-primary-600">
                <Link to="/consulting/book-free-call">
                  Book Export Audit Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" onClick={handleDownloadSampleReport}>
                <Eye className="mr-2 w-5 h-5" />
                view Sample Report
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Hidden Costs of Being Unprepared</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>72% of first-time exporters face compliance issues that delay shipments</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Average cost of regulatory non-compliance: ₹2-5 lakhs per incident</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Incorrect HS codes can result in 15-25% higher duties</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Poor packaging leads to 20-30% higher damage rates</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-accent-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-center">Our Solution</h3>
                <p className="text-foreground text-center mb-6">
                  Comprehensive Export Readiness Audit that identifies and resolves these issues before they become costly problems.
                </p>
                <div className="flex justify-center">
                  <div className="bg-accent-100 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-accent-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Export Audit Includes</h2>
              <p className="text-xl text-muted-foreground">
                Thorough assessment across all critical export readiness dimensions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {auditChecklist.map((category, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h3 className="text-xl font-semibold ml-3">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
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

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Export Readiness Matters</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Get global-ready with confidence and avoid costly mistakes
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center p-4 bg-gradient-to-r from-primary-100 to-accent-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-accent-600 mr-3 flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real-World Success Stories</h2>
              <p className="text-xl text-muted-foreground">
                How our Export Readiness Audit has helped businesses like yours
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 text-center">{useCase.icon}</div>
                    <h3 className="font-semibold mb-3 text-center">Challenge</h3>
                    <p className="text-foreground mb-4 text-sm leading-relaxed">{useCase.scenario}</p>
                    
                    <h4 className="font-semibold mb-2 text-primary-600">Our Solution</h4>
                    <p className="text-foreground mb-4 text-sm">{useCase.solution}</p>
                    
                    <h4 className="font-semibold mb-2 text-accent-600">Result</h4>
                    <p className="text-foreground text-sm">{useCase.outcome}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Our Audit Process</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Product Analysis", duration: "Day 1-2", description: "HS code verification and classification" },
                { step: "2", title: "Compliance Review", duration: "Day 3-5", description: "Regulatory requirements for target markets" },
                { step: "3", title: "Market Assessment", duration: "Day 6-7", description: "Pricing and competitive analysis" },
                { step: "4", title: "Report Delivery", duration: "Day 8-10", description: "Comprehensive findings and action plan" }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="font-semibold mb-2">{phase.title}</h3>
                  <div className="text-sm text-primary-600 mb-2 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {phase.duration}
                  </div>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-r from-primary-100 to-accent-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-foreground mb-6 italic leading-relaxed">
                "The export readiness audit was a game-changer for our business. They identified compliance issues we never knew existed and helped us avoid what could have been a ₹3 lakh mistake. Now we're confidently exporting to 3 EU countries."
              </blockquote>
              <div className="border-t pt-6">
                <div className="font-semibold text-lg">Priya Sharma</div>
                {/* <div className="text-gray-600">Founder, Ayurveda Essentials</div> */}
                <div className="text-primary-600 font-medium mt-1">🇩🇪 Exporting to Germany, Netherlands, France</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Export-Ready?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book your Export Readiness Audit today and take the first step towards successful global expansion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-100">
              <Link to="/consulting/book-free-call">
                Book Export Audit Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* <Button 
              size="lg" 
              className="bg-white text-primary-600 hover:bg-primary-100"
              onClick={handleDownloadSampleReport}
            >
              <Eye className="mr-2 w-5 h-5" />
              View Sample Report
            </Button> */}
          </div>
          <p className="text-sm mt-6 opacity-75">
            Starting at ₹15,000 | 7-10 business days delivery | 100% satisfaction guarantee
          </p>
        </div>
      </section>

      {/* Sticky CTA - Mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <Button asChild className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg">
          <Link to="/consulting/book-free-call">
            Book Export Audit
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ExportReadiness;
