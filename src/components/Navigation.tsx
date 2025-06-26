import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  let resourcesTimeout: NodeJS.Timeout | null = null;
  const location = useLocation();

  const consultingServices = [
    {
      title: "Export Readiness Audit",
      description: "Complete assessment of your product's global readiness",
      href: "/consulting/export-readiness"
    },
    {
      title: "Market Research",
      description: "Data-driven insights for market selection",
      href: "/consulting/market-research"
    },
    {
      title: "Buyer Discovery",
      description: "AI-powered international buyer matching",
      href: "/consulting/buyer-discovery"
    },
    {
      title: "Seller Discovery",
      description: "Find verified Indian suppliers and manufacturers",
      href: "/consulting/seller-discovery"
    },
    {
      title: "Global Seller Discovery",
      description: "Connect with verified suppliers worldwide",
      href: "/consulting/global-seller-discovery"
    },
    {
      title: "Compliance & Documentation",
      description: "Navigate international trade regulations",
      href: "/consulting/compliance-docs"
    },
    {
      title: "Pricing Strategy",
      description: "Optimize pricing for global competitiveness",
      href: "/consulting/pricing-strategy"
    },
    {
      title: "Export Strategy Sessions",
      description: "1-on-1 mentorship with export experts",
      href: "/consulting/export-strategy-sessions"
    },
    {
      title: "Export Kickstart Package",
      description: "Get started with your export journey",
      href: "/export-kickstart-package"
    },
    {
      title: "First Shipment Handholding",
      description: "Assistance with your first shipment",
      href: "/first-shipment-handholding"
    }
  ];

  const isConsultingActive = location.pathname.startsWith('/consulting');

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  });
  ListItem.displayName = "ListItem";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-md">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">EXIM Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/' && "bg-accent text-accent-foreground"
                )}>
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Consulting
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 -translate-x-1/2 absolute z-50 w-[95vw] min-w-[900px] max-w-5xl bg-white border rounded-lg shadow-lg overflow-visible">
                  <ul className="grid w-full gap-3 p-4 grid-cols-3">
                    <li className="col-span-1 flex flex-col h-full">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary-600 p-6 no-underline outline-none focus:shadow-md"
                          to="/consulting"
                        >
                          <Globe className="h-6 w-6 text-white" />
                          <div className="text-white font-medium text-lg mb-2 mt-4">
                            EXIM Consulting
                          </div>
                          <p className="text-sm leading-tight text-white">
                            AI-powered consulting services for exporters and global trade professionals.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="col-span-2">
                      <ul className="grid grid-cols-2 gap-3">
                        {consultingServices.map((service) => (
                      <ListItem
                        key={service.href}
                        href={service.href}
                        title={service.title}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                      </ul>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/about' && "bg-accent text-accent-foreground"
                )}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (resourcesTimeout) clearTimeout(resourcesTimeout);
                    setIsResourcesOpen(true);
                  }}
                  onMouseLeave={() => {
                    resourcesTimeout = setTimeout(() => setIsResourcesOpen(false), 100);
                  }}
                  onFocus={() => setIsResourcesOpen(true)}
                  onBlur={() => setIsResourcesOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      location.pathname.startsWith('/resources') && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setIsResourcesOpen((open) => !open)}
                    aria-haspopup="true"
                    aria-expanded={isResourcesOpen}
                  >
                    Resources
                    <svg
                      className={cn(
                        "ml-1 w-3 h-3 transition-transform duration-200",
                        isResourcesOpen ? "rotate-180" : "rotate-0"
                      )}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isResourcesOpen && (
                    <div
                      className="absolute left-0 top-full z-50 mt-2 min-w-[180px] bg-white border rounded-lg shadow-lg overflow-visible"
                      onMouseEnter={() => {
                        if (resourcesTimeout) clearTimeout(resourcesTimeout);
                        setIsResourcesOpen(true);
                      }}
                      onMouseLeave={() => {
                        resourcesTimeout = setTimeout(() => setIsResourcesOpen(false), 100);
                      }}
                    >
                      <ul className="flex flex-col p-2">
                        <li>
                          <Link
                            to="/resources/calculators"
                            className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            Calculators
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/resources/playbooks"
                            className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            Playbooks
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/resources/blogs"
                            className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            Blogs
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>

              
              <NavigationMenuItem>
                <Link to="/contact" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/contact' && "bg-accent text-accent-foreground"
                )}>
                  Contact
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/login" className={cn(
                  // "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/login' && "bg-accent text-accent-foreground"
                )}>
                  
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex">
            <Button asChild>
              <Link to="/consulting/book-free-call">
                Book Free Call
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                
                <div className="space-y-3">
                  <Link 
                    to="/consulting" 
                    className="text-lg font-medium hover:text-blue-600 transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    Consulting Overview
                  </Link>
                  <div className="pl-4 space-y-2">
                    {consultingServices.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-lg font-medium">Resources</div>
                  <div className="pl-4 flex flex-col space-y-1">
                    <Link
                      to="/resources/calculators"
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Calculators
                    </Link>
                    <Link
                      to="/resources/playbooks"
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Playbooks
                    </Link>
                    <Link
                      to="/resources/blogs"
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Blogs
                    </Link>
                  </div>
                </div>

                <Link 
                  to="/about" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                
                <Link 
                  to="/contact" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                <Link 
                  to="/login" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <div className="pt-6">
                  <Button asChild className="w-full">
                    <Link to="/consulting/book-free-call" onClick={() => setIsOpen(false)}>
                      Book Free Call
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
