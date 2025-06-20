import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Globe, Target, CheckCircle, ArrowRight, Users, DollarSign, Shield, Zap, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { marketResearchReport } from '@/data/sampleReports';

const MarketResearch = () => {
  const handleDownloadSampleReport = () => {
    downloadPDFReport(marketResearchReport, 'Market-Research-Sample-Report.txt');
  };

  const researchTypes = [
    {
      icon: Globe,
      title: "Country Market Analysis",
      description: "Deep dive into specific country markets with trade data, regulations, and opportunities",
      deliverables: ["Market size & growth", "Import/export trends", "Regulatory requirements", "Key players analysis"]
    },
    {
      icon: Target,
      title: "Product Demand Research",
      description: "Understand global demand patterns for your specific product category",
      deliverables: ["Demand forecasting", "Price analysis", "Seasonal trends", "Competition mapping"]
    },
    {
      icon: Users,
      title: "Buyer Behavior Study",
      description: "Insights into how international buyers source and purchase your products",
      deliverables: ["Buyer personas", "Purchase patterns", "Decision factors", "Channel preferences"]
    },
    {
      icon: TrendingUp,
      title: "Market Entry Strategy",
      description: "Complete roadmap for entering new international markets successfully",
      deliverables: ["Entry barriers", "Go-to-market plan", "Risk assessment", "Timeline & budget"]
    }
  ];

  const benefits = [
    {
      icon: BarChart,
      title: "Data-Driven Insights",
      description: "Access to premium trade databases and market intelligence platforms"
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Get comprehensive reports within 5-7 business days"
    },
    {
      icon: Shield,
      title: "Verified Information",
      description: "All data cross-verified from multiple authoritative sources"
    },
    {
      icon: DollarSign,
      title: "ROI Focused",
      description: "Actionable recommendations that drive real business results"
    }
  ];

  const popularMarkets = [
    {
      country: "United States",
      marketSize: "$21.4T",
      growthRate: "2.3%",
      topProducts: "Electronics, Textiles, Pharma",
      difficulty: "Medium"
    },
    {
      country: "European Union",
      marketSize: "$15.6T",
      growthRate: "1.8%",
      topProducts: "Automotive, Chemicals, Food",
      difficulty: "High"
    },
    {
      country: "United Kingdom",
      marketSize: "$2.8T",
      growthRate: "1.4%",
      topProducts: "Textiles, Jewelry, Ayurveda",
      difficulty: "Low"
    },
    {
      country: "UAE",
      marketSize: "$421B",
      growthRate: "3.4%",
      topProducts: "Spices, Textiles, Handicrafts",
      difficulty: "Low"
    },
    {
      country: "Singapore",
      marketSize: "$372B",
      growthRate: "3.6%",
      topProducts: "Electronics, Chemicals, Food",
      difficulty: "Medium"
    },
    {
      country: "Australia",
      marketSize: "$1.5T",
      growthRate: "2.1%",
      topProducts: "Food, Textiles, Ayurveda",
      difficulty: "Medium"
    }
  ];

  const process = [
    {
      step: "Discovery Call",
      description: "Understand your products, target markets, and specific research needs",
      duration: "30 minutes"
    },
    {
      step: "Research Design",
      description: "Create customized research framework and methodology",
      duration: "1 day"
    },
    {
      step: "Data Collection",
      description: "Gather data from premium sources and conduct market analysis",
      duration: "3-4 days"
    },
    {
      step: "Report Creation",
      description: "Compile insights into actionable recommendations",
      duration: "1-2 days"
    },
    {
      step: "Presentation",
      description: "Review findings and discuss implementation strategy",
      duration: "1 hour"
    }
  ];

  const sampleReport = {
    title: "Ayurveda Products Market Research - Germany",
    sections: [
      "Executive Summary",
      "Market Size & Growth Projections",
      "Regulatory Landscape",
      "Competitive Analysis",
      "Distribution Channels",
      "Consumer Preferences",
      "Entry Strategy Recommendations",
      "Financial Projections"
    ]
  };

  const pricing = [
    {
      type: "Single Country Research",
      price: "₹25,000",
      description: "Comprehensive analysis of one target market",
      features: [
        "Market size & trends",
        "Regulatory requirements",
        "Competition analysis",
        "Entry recommendations",
        "30-day support"
      ]
    },
    {
      type: "Multi-Country Research",
      price: "₹40,000",
      description: "Compare 2-3 markets to identify best opportunities",
      features: [
        "Comparative analysis",
        "Market prioritization",
        "Risk assessment",
        "Resource allocation plan",
        "45-day support"
      ]
    },
    {
      type: "Industry Deep Dive",
      price: "₹60,000",
      description: "Complete industry analysis across global markets",
      features: [
        "Global industry trends",
        "Technology disruptions",
        "Future opportunities",
        "Strategic roadmap",
        "60-day support",
        "Quarterly updates"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Meera Patel",
      company: "Organic Spices Co.",
      content: "The Germany market research helped us understand exactly what German buyers wanted. We increased our exports by 300% in 6 months.",
      result: "300% export growth"
    },
    {
      name: "Vikram Singh",
      company: "Handicrafts Export House",
      content: "Their research on US market regulations saved us from costly compliance mistakes. The insights were incredibly detailed.",
      result: "Avoided regulatory issues"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart className="w-4 h-4 mr-2" />
              Market Intelligence & Research
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Make Data-Driven Export Decisions with 
              <span className="text-green-600"> Expert Market Research</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get comprehensive market intelligence reports that help you identify the best export 
              opportunities, understand buyer preferences, and navigate regulatory requirements in global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Request Market Research
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" onClick={handleDownloadSampleReport}>
                <Download className="mr-2 w-5 h-5" />
                Download Sample Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Types of Market Research We Provide
              </h2>
              <p className="text-xl text-gray-600">
                Customized research solutions for every export need
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {researchTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <type.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{type.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables:</h4>
                      {type.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{deliverable}</span>
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

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Market Research</h2>
              <p className="text-xl text-gray-600">
                Professional-grade research at startup-friendly prices
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

      {/* Popular Markets */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Export Markets</h2>
              <p className="text-xl text-gray-600">
                Key markets we research for Indian exporters
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularMarkets.map((market, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{market.country}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        market.difficulty === 'Low' ? 'bg-green-100 text-green-700' :
                        market.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {market.difficulty} Entry
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Size:</span>
                      <span className="font-semibold">{market.marketSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth Rate:</span>
                      <span className="font-semibold text-green-600">{market.growthRate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Top Products:</span>
                      <p className="text-sm mt-1">{market.topProducts}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Research Process</h2>
              <p className="text-xl text-gray-600">
                From initial consultation to actionable insights in 5-7 days
              </p>
            </div>
            
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.step}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                    {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sample Report Structure</h2>
              <p className="text-xl text-gray-600">
                See what's included in our comprehensive market research reports
              </p>
            </div>
            
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-2xl text-center">{sampleReport.title}</CardTitle>
                <CardDescription className="text-center">
                  A comprehensive 45-page market analysis report
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {sampleReport.sections.map((section, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{section}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" onClick={handleDownloadSampleReport}>
                    <Download className="mr-2 w-4 h-4" />
                    Download Sample Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Client Success Stories</h2>
              <p className="text-xl text-gray-600">
                How our research helped businesses make profitable export decisions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <CardDescription className="text-gray-600 text-lg">
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
                        <div className="text-sm text-green-600 font-medium">Result</div>
                        <div className="text-lg font-bold text-green-700">{testimonial.result}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Research Packages</h2>
              <p className="text-xl text-gray-600">
                Choose the right level of market intelligence for your business
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricing.map((pkg, index) => (
                <Card key={index} className={index === 1 ? 'border-green-500 border-2 relative' : ''}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{pkg.type}</CardTitle>
                    <div className="text-3xl font-bold text-green-600 mt-4">
                      {pkg.price}
                    </div>
                    <CardDescription className="mt-2">
                      {pkg.description}
                    </CardDescription>
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
                      className={`w-full ${index === 1 ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      variant={index === 1 ? 'default' : 'outline'}
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
            Ready to Unlock Global Market Opportunities?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get expert market research that gives you the competitive edge in international trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link to="/consulting/book-free-call">
                Request Research Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600" onClick={handleDownloadSampleReport}>
              <Download className="mr-2 w-5 h-5" />
              View Sample Reports
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketResearch;
