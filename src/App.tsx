import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Consulting from "./pages/Consulting";
import ExportReadiness from "./pages/ExportReadiness";
import MarketResearch from "./pages/MarketResearch";
import BuyerDiscovery from "./pages/BuyerDiscovery";
import SellerDiscovery from "./pages/SellerDiscovery";
import GlobalSellerDiscovery from "./pages/GlobalSellerDiscovery";
import ComplianceDocs from "./pages/ComplianceDocs";
import PricingStrategy from "./pages/PricingStrategy";
import ExportStrategySessions from "./pages/ExportStrategySessions";
import Login from "./pages/Login";
import BookFreeCall from "./pages/BookFreeCall";
import NotFound from "./pages/NotFound";
import ExportKickstartPackge from "./pages/ExportKickstartPackge";
import FirstShipmentHandholding from "./pages/FirstShipmentHandholding";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Calculators from "./pages/Calculators";
import TradewiseCalculator from "./calc/tradewise/pages/Calculator";
import LandCostCalculator from "./calc/landcostcalc/pages/Index";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col w-full">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/resources/blogs" element={<Blog />} />
              <Route path="/resources/calculators" element={<Calculators />} />
              <Route path="/resources/calculators/incoterms" element={<TradewiseCalculator />} />
              <Route path="/resources/calculators/tlc" element={<LandCostCalculator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/consulting/export-readiness" element={<ExportReadiness />} />
              <Route path="/consulting/market-research" element={<MarketResearch />} />
              <Route path="/consulting/buyer-discovery" element={<BuyerDiscovery />} />
              <Route path="/consulting/seller-discovery" element={<SellerDiscovery />} />
              <Route path="/consulting/global-seller-discovery" element={<GlobalSellerDiscovery />} />
              <Route path="/consulting/compliance-docs" element={<ComplianceDocs />} />
              <Route path="/consulting/pricing-strategy" element={<PricingStrategy />} />
              <Route path="/consulting/export-strategy-sessions" element={<ExportStrategySessions />} />
              <Route path="/consulting/book-free-call" element={<BookFreeCall />} />
              <Route path="/export-kickstart-package" element={<ExportKickstartPackge />} />
              <Route path="/first-shipment-handholding" element={<FirstShipmentHandholding />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
