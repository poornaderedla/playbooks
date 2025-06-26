import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, Target, DollarSign, ArrowRight, CheckCircle, BarChart, PieChart, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDFReport } from '@/utils/downloadUtils';
import { pricingStrategy } from '@/data/sampleReports';

const PricingStrategy = () => {
  const handleViewSampleAnalysis = () => {
    downloadPDFReport(pricingStrategy, 'Export-Pricing-Analysis-Sample.txt');
  };

  const features = [
    {
      icon: Calculator,
      title: "Cost Analysis",
      description: "Comprehensive breakdown of all export costs and pricing components"
    },
    {
      icon: TrendingUp,
      title: "Market Pricing",
      description: "Competitive analysis and market-based pricing recommendations"
    },
    {
      icon: Target,
      title: "Profit Optimization",
      description: "Strategic pricing to maximize profitability while staying competitive"
    },
    {
      icon: BarChart,
      title: "Scenario Planning",
      description: "Multiple pricing scenarios based on different market conditions"
    }
  ];

  const costComponents = [
    {
      category: "Product Costs",
      items: [
        "Raw material costs",
        "Manufacturing expenses", 
        "Quality control & testing",
        "Packaging & labeling",
        "Product development costs",
        "Research & development"
      ]
    },
    {
      category: "Export Costs",
      items: [
        "Export documentation",
        "Freight & shipping",
        "Insurance coverage",
        "Customs clearance",
        "Port handling charges",
        "Export licenses & permits"
      ]
    },
    {
      category: "Marketing & Sales",
      items: [
        "Marketing & promotion",
        "Sales commissions",
        "Trade show participation",
        "Sample costs",
        "Buyer visit expenses",
        "After-sales support"
      ]
    },
    {
      category: "Financial Costs",
      items: [
        "Currency hedging",
        "Banking charges",
        "Credit insurance",
        "Working capital costs",
        "Payment processing",
        "Foreign exchange risks"
      ]
    }
  ];

  const pricingStrategies = [
    {
      strategy: "Cost-Plus Pricing",
      description: "Adding markup to total costs",
      advantages: "Ensures profit margin, simple calculation",
      bestFor: "Commodities, bulk products"
    },
    {
      strategy: "Market-Based Pricing", 
      description: "Based on competitor analysis",
      advantages: "Competitive positioning, market acceptance",
      bestFor: "Established markets, similar products"
    },
    {
      strategy: "Value-Based Pricing",
      description: "Based on customer perceived value",
      advantages: "Premium pricing, higher margins",
      bestFor: "Unique products, specialized solutions"
    },
    {
      strategy: "Penetration Pricing",
      description: "Low initial price for market entry",
      advantages: "Quick market share, volume growth",
      bestFor: "New markets, competitive products"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Cost Assessment",
      description: "Detailed analysis of all direct and indirect costs involved in exporting"
    },
    {
      step: "02",
      title: "Market Analysis", 
      description: "Competitor pricing research and market demand assessment"
    },
    {
      step: "03",
      title: "Strategy Development",
      description: "Custom pricing strategy based on costs, market, and business objectives"
    },
    {
      step: "04",
      title: "Implementation Support",
      description: "Guidance on pricing execution and performance monitoring"
    }
  ];

  const packages = [
    {
      name: "Basic Pricing Analysis",
      price: "$600",
      period: "per product",
      features: [
        "Cost breakdown analysis",
        "Basic competitor research",
        "Pricing recommendations",
        "Excel pricing calculator",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Strategic Pricing Plan",
      price: "$1,200",
      period: "per product line",
      features: [
        "Comprehensive cost analysis",
        "Market pricing research",
        "Multiple pricing scenarios",
        "Profit optimization model",
        "Implementation roadmap",
        "Phone consultations"
      ],
      popular: true
    },
    {
      name: "Enterprise Pricing Strategy",
      price: "$2,500", 
      period: "portfolio-wide",
      features: [
        "Multi-product analysis",
        "Dynamic pricing models",
        "Market intelligence dashboard",
        "Quarterly strategy reviews",
        "Dedicated pricing consultant",
        "Priority support"
      ],
      popular: false
    }
  ];

  const marketFactors = [
    {
      factor: "Competition Analysis",
      description: "Detailed study of competitor pricing across target markets"
    },
    {
      factor: "Demand Elasticity",
      description: "Understanding price sensitivity in different market segments"
    },
    {
      factor: "Currency Fluctuations", 
      description: "Impact of exchange rate variations on pricing strategy"
    },
    {
      factor: "Seasonal Variations",
      description: "Pricing adjustments based on seasonal demand patterns"
    },
    {
      factor: "Volume Discounts",
      description: "Pricing tiers based on order quantities and customer segments"
    },
    {
      factor: "Payment Terms",
      description: "Pricing impact of different payment methods and credit terms"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Spice Export House",
      content: "Increased our profit margins by 23% while staying competitive. The pricing strategy was spot-on for international markets.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      company: "Organic Foods Global",
      content: "Comprehensive analysis helped us price our products optimally across 15 countries. Excellent ROI on the consultation.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      company: "Textile Manufacturers Ltd",
      content: "The pricing model they developed has been instrumental in our export growth. Highly professional service.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 to-primary-200 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing Optimization Experts
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Master Export Pricing &
              <span className="text-primary-600"> Costing Strategy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Optimize your export pricing for maximum profitability while staying competitive 
              in global markets. Our data-driven approach ensures you price right from day one, 
              avoiding costly pricing mistakes that derail export success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-accent-100 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Start Pricing Optimization
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-secondary-foreground text-lg px-8 py-3" onClick={handleViewSampleAnalysis}>
                <Eye className="mr-2 w-5 h-5" />
                View Sample Reports
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>25+ cost factors analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>Market intelligence included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span>Profit optimization guaranteed</span>
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
                Comprehensive Pricing Solutions
              </h2>
              <p className="text-xl text-muted-foreground">
                Data-driven pricing strategies for export success
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
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Components */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Complete Cost Analysis</h2>
              <p className="text-xl text-muted-foreground">
                Every cost factor considered for accurate pricing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {costComponents.map((category, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Calculator className="w-6 h-6 text-primary-600 mr-3" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <span className="text-secondary-foreground">{item}</span>
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

      {/* Pricing Strategies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Pricing Strategy Options</h2>
              <p className="text-xl text-muted-foreground">
                Choose the right pricing approach for your export goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {pricingStrategies.map((strategy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Target className="w-6 h-6 text-primary-600 mr-3" />
                      {strategy.strategy}
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-foreground">Advantages: </span>
                        <span className="text-muted-foreground">{strategy.advantages}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Best For: </span>
                        <span className="text-muted-foreground">{strategy.bestFor}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Factors */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Market Intelligence Factors</h2>
              <p className="text-xl text-muted-foreground">
                Key market dynamics that influence your pricing strategy
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketFactors.map((factor, index) => (
                <Card key={index} className="bg-white text-center p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                    <TrendingUp className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{factor.factor}</h3>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Pricing Development Process</h2>
              <p className="text-xl text-muted-foreground">
                Systematic approach to optimal export pricing
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
                    <p className="text-muted-foreground">{step.description}</p>
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

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Pricing Success Stories</h2>
              <p className="text-xl text-muted-foreground">
                Real results from our pricing optimization services
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <CheckCircle key={i} className="w-4 h-4 text-primary-500" />
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
              <h2 className="text-3xl font-bold text-foreground mb-6">Pricing Strategy Packages</h2>
              <p className="text-xl text-muted-foreground">
                Professional pricing optimization for every business size
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
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground ml-2">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-secondary-foreground">{feature}</span>
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
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Optimize Your Export Pricing?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Stop leaving money on the table. Get professional pricing strategy that maximizes your profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-accent-100 text-lg px-8 py-3">
                <Link to="/consulting/book-free-call">
                  Start Pricing Optimization
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-accent-100 text-lg px-8 py-3" onClick={handleViewSampleAnalysis}>
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

export default PricingStrategy;
