import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Mail, Phone, MapPin, Facebook, Twitter,
  Linkedin, Youtube, ArrowRight, Instagram, X as XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const XLogo = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.53 3H21.5l-7.19 8.19L22.64 21H15.9l-5.13-6.17L4.88 21H0.91l7.61-8.67L1.36 3h6.93l4.7 5.66L17.53 3zm-1.23 15.06h2.02L6.62 4.29H4.47l11.83 13.77z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Newsletter state
  const [footerEmail, setFooterEmail] = useState('');
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerMsg, setFooterMsg] = useState('');

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
    { name: "YouTube", icon: Youtube, href: "http://www.youtube.com/@DrehillPrivateLimited" },
    { name: "X", icon: XLogo, href: "https://x.com/Drehill_in?t=thzAWR-_sWvRnkRqZSXpCA&s=08" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/drehill.in?igsh=MW81aDVvcWs2cHVoZg==" },
    { name: "LinkedIn", icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.5-.723-1.5-1.229 0-.506.546-1.229 1.5-1.229s1.5.723 1.5 1.229c0 .506-.534 1.229-1.5 1.229zm13.5 10.271h-3v-4.845c0-1.152-.414-1.938-1.448-1.938-.79 0-1.261.531-1.47 1.043-.075.183-.094.438-.094.692v5.048h-3v-9h3v1.229c.397-.612 1.104-1.48 2.686-1.48 1.963 0 3.414 1.281 3.414 4.038v5.213z" />
      </svg>
    ), href: "https://www.linkedin.com/company/drehill/" }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setFooterLoading(true);
    setFooterMsg('');
    try {
      const res = await fetch('/api/contact/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: footerEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to subscribe');
      setFooterMsg('Subscribed! Check your inbox for updates.');
      setFooterEmail('');
    } catch (err) {
      setFooterMsg(err.message || 'Failed to subscribe');
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <footer className="bg-secondary text-black">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="lg:col-span-1 max-w-xs w-full mx-auto">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl">Drehill</span>
            </Link>
            <p className="text-black-300 mb-4 leading-relaxed text-sm">
              Your trusted partner for international trade success. We help businesses
              navigate the complexities of global markets with expert consulting and
              AI-powered solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                social.name === "LinkedIn" ? (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
                    aria-label={social.name}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.5-.723-1.5-1.229 0-.506.546-1.229 1.5-1.229s1.5.723 1.5 1.229c0 .506-.534 1.229-1.5 1.229zm13.5 10.271h-3v-4.845c0-1.152-.414-1.938-1.448-1.938-.79 0-1.261.531-1.47 1.043-.075.183-.094.438-.094.692v5.048h-3v-9h3v1.229c.397-.612 1.104-1.48 2.686-1.48 1.963 0 3.414 1.281 3.414 4.038v5.213z" />
                    </svg>
                  </a>
                ) : (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Consulting Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Consulting Services</h4>
            <ul className="space-y-2 text-sm">
              {consultingServices.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-black-400 text-xs transition-transform transform hover:scale-110 duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-black-400 text-xs transition-transform transform hover:scale-110 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-black-300 mb-3">
              Get weekly tips, market insights, and export opportunities delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900"
                required
                value={footerEmail}
                onChange={e => setFooterEmail(e.target.value)}
                disabled={footerLoading}
              />
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700" disabled={footerLoading || !footerEmail}>
                {footerLoading ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
            {footerMsg && (
              <div aria-live="polite" className={`text-xs mt-1 ${footerMsg.startsWith('Subscribed') ? 'text-green-600' : 'text-red-600'}`}>{footerMsg}</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-black-400 text-xs">
            © {currentYear} EXIM Pro India. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-black-400 text-xs transition-transform transform hover:scale-110 duration-200"
                onClick={
                  link.href === "/privacy" || link.href === "/terms"
                    ? () => window.scrollTo({ top: 0, behavior: "smooth" })
                    : undefined
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
