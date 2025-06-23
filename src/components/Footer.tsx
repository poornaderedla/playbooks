// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight, Instagram, X as XIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// const XLogo = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
//     <path d="M17.53 3H21.5l-7.19 8.19L22.64 21H15.9l-5.13-6.17L4.88 21H0.91l7.61-8.67L1.36 3h6.93l4.7 5.66L17.53 3zm-1.23 15.06h2.02L6.62 4.29H4.47l11.83 13.77z"/>
//   </svg>
// );

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const consultingServices = [
//     { name: "Export Readiness Audit", href: "/consulting/export-readiness" },
//     { name: "Market Research", href: "/consulting/market-research" },
//     { name: "Buyer Discovery", href: "/consulting/buyer-discovery" },
//     { name: "Seller Discovery", href: "/consulting/seller-discovery" },
//     { name: "Global Seller Discovery", href: "/consulting/global-seller-discovery" },
//     { name: "Compliance & Documentation", href: "/consulting/compliance-docs" },
//     { name: "Pricing Strategy", href: "/consulting/pricing-strategy" },
//     { name: "Export Strategy Sessions", href: "/consulting/export-strategy-sessions" }
//   ];

//   const quickLinks = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about" },
//     { name: "Blog", href: "/blog" },
//     { name: "Contact", href: "/contact" },
//     { name: "Book Free Call", href: "/consulting/book-free-call" }
//   ];

//   const legalLinks = [
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms of Service", href: "/terms" },
//     { name: "Cookie Policy", href: "/cookies" },
//     { name: "Disclaimer", href: "/disclaimer" }
//   ];

//   const socialLinks = [
//     { name: "YouTube", icon: Youtube, href: "https://youtube.com/eximproindia" },
//     { name: "X", icon: XLogo, href: "https://twitter.com/eximproindia" },
//     { name: "Instagram", icon: Instagram, href: "https://instagram.com/eximproindia" },
//     { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/eximproindia" }
//   ];

//   const handleNewsletterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle newsletter subscription
//     console.log('Newsletter subscription');
//   };

//   return (
//     <footer className="bg-gray-900 text-white">


//       {/* Main Footer Content */}
//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Company Info */}
//           <div className="lg:col-span-1 max-w-xs w-full mx-auto">
//             <Link to="/" className="inline-flex items-center space-x-2 mb-4">
//               <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
//                 <Globe className="w-6 h-6 text-white" />
//               </div>
//               <span className="font-bold text-2xl">EXIM Pro</span>
//             </Link>
//             <p className="text-gray-300 mb-4 leading-relaxed text-sm">
//               Your trusted partner for international trade success. We help businesses
//               navigate the complexities of global markets with expert consulting and
//               AI-powered solutions.
//             </p>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center space-x-3">
//                 <Mail className="w-5 h-5 text-blue-400" />
//                 <a href="mailto:info@drehill.in" className="text-gray-300 hover:text-white">
//                   info@drehill.in
//                 </a>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone className="w-5 h-5 text-blue-400" />
//                 <a href="tel:+91 7901050607" className="text-gray-300 hover:text-white">
//                   +91 7901050607
//                 </a>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-5 h-5 text-blue-400" />
//                 <span className="text-gray-300">
//                   Chhatrapati Sambhaji Nagar, Maharashtra 431001
//                 </span>
//               </div>
//             </div>
//             <div className="flex space-x-4 mt-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
//                   aria-label={social.name}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Consulting Services */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Consulting Services</h4>
//             <ul className="space-y-2 text-sm">
//               {consultingServices.map((service, index) => (
//                 <li key={index}>
//                   <Link
//                     to={service.href}
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     {service.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <Link
//                     to={link.href}
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact & Social */}
          
          
//         <div className="container mx-auto px-4 py-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <h3 className="text-2xl font-bold text-white mb-2">
//               Stay Updated with Export Insights
//             </h3>
//             <p className="text-blue-100 mb-3">
//               Get weekly tips, market insights, and export opportunities delivered to your inbox
//             </p>
//             <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 bg-white text-gray-900"
//                 required
//               />
//               <Button type="submit" className="bg-blue-800 hover:bg-blue-900">
//                 Subscribe
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//       </div>
      

//       {/* Bottom Bar */}
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
//           <div className="text-gray-400 text-xs">
//             © {currentYear} EXIM Pro India. All rights reserved.
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {legalLinks.map((link, index) => (
//               <Link
//                 key={index}
//                 to={link.href}
//                 className="text-gray-400 hover:text-white text-xs transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
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
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/eximproindia" },
    { name: "X", icon: XLogo, href: "https://twitter.com/eximproindia" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/eximproindia" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/eximproindia" }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="lg:col-span-1 max-w-xs w-full mx-auto">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl">EXIM Pro</span>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Your trusted partner for international trade success. We help businesses
              navigate the complexities of global markets with expert consulting and
              AI-powered solutions.
            </p>
            {/* <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:info@drehill.in" className="text-gray-300 hover:text-white">
                  info@drehill.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+91 7901050607" className="text-gray-300 hover:text-white">
                  +91 7901050607
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">
                  Chhatrapati Sambhaji Nagar, Maharashtra 431001
                </span>
              </div>
            </div> */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
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
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
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

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-3">
              Get weekly tips, market insights, and export opportunities delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
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

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-gray-400 text-xs">
            © {currentYear} EXIM Pro India. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-400 hover:text-white text-xs transition-colors"
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
