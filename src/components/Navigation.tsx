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
      title: "Compliance & Documentation",
      description: "Navigate international trade regulations",
      href: "/consulting/compliance-docs"
    },
    {
      title: "Pricing Strategy",
      description: "Optimize pricing for global competitiveness",
      href: "/consulting/pricing-strategy"
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
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
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
                <NavigationMenuTrigger className={cn(
                  isConsultingActive && "bg-accent text-accent-foreground"
                )}>
                  Consulting
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-500 p-6 no-underline outline-none focus:shadow-md"
                          to="/consulting"
                        >
                          <Globe className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            EXIM Consulting
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            AI-powered consulting services for exporters and global trade professionals.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {consultingServices.slice(0, 3).map((service) => (
                      <ListItem
                        key={service.href}
                        href={service.href}
                        title={service.title}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/blog" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/blog' && "bg-accent text-accent-foreground"
                )}>
                  Blog
                </Link>
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
                <Link to="/contact" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  location.pathname === '/contact' && "bg-accent text-accent-foreground"
                )}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
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
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/blog" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>

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

                <div className="pt-6">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
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
