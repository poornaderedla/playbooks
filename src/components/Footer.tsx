
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const consultingServices = [
    { name: "Export Readiness Audit", href: "/consulting/export-readiness" },
    { name: "Market Research", href: "/consulting/market-research" },
    { name: "Buyer Discovery", href: "/consulting/buyer-discovery" },
    { name: "Seller Discovery", href: "/consulting/seller-discovery" },
    { name: "Global Seller Discovery", href: "/consulting/global-seller-discovery" },
    { name: "Compliance & Documentation", href: "/consulting/compliance-docs" },
    { name: "Pricing Strategy", href: "/consulting/pricing-strategy" },
    { name: "Export Strategy Sessions", href: "/consulting/export-strategy-sessions" }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Book Free Call", href: "/consulting/book-free-call" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/eximproindia" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/eximproindia" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/eximproindia" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/eximproindia" }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Export Insights
            </h3>
            <p className="text-blue-100 mb-6">
              Get weekly tips, market insights, and export opportunities delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900"
                required
              />
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl">EXIM Pro</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for international trade success. We help businesses 
              navigate the complexities of global markets with expert consulting and 
              AI-powered solutions.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:info@eximproindia.com" className="text-gray-300 hover:text-white">
                  info@eximproindia.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">
                  Mumbai, Delhi, Bangalore, India
                </span>
              </div>
            </div>
          </div>

          {/* Consulting Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Consulting Services</h4>
            <ul className="space-y-3">
              {consultingServices.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
            <div className="space-y-4">
              <p className="text-gray-300">
                Follow us for the latest export insights and opportunities
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="pt-4">
                <h5 className="font-medium mb-3">Business Hours</h5>
                <div className="text-gray-300 text-sm space-y-1">
                  <div>Monday - Friday: 9:00 AM - 6:00 PM IST</div>
                  <div>Saturday: 10:00 AM - 4:00 PM IST</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} EXIM Pro India. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="text-gray-400 text-sm">
              Made with ❤️ for Indian Exporters
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
