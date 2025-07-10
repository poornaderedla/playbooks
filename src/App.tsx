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
import Playbooks from "./pages/Playbooks";
import Playbook1 from "./pages/playbooks/Playbook1";
import Playbook2 from "./pages/playbooks/Playbook2";
import Playbook3 from "./pages/playbooks/Playbook3";
import Playbook4 from "./pages/playbooks/Playbook4";
import Playbook5 from "./pages/playbooks/Playbook5";
import Playbook6 from "./pages/playbooks/Playbook6";
import Playbook7 from "./pages/playbooks/Playbook7";
import Playbook8 from "./pages/playbooks/Playbook8";
import Playbook9 from "./pages/playbooks/Playbook9";
import Playbook10 from "./pages/playbooks/Playbook10";
import Playbook11 from "./pages/playbooks/Playbook11";
import Playbook12 from "./pages/playbooks/Playbook12";
import Playbook13 from "./pages/playbooks/Playbook13";
import Playbook14 from "./pages/playbooks/Playbook14";
import Playbook15 from "./pages/playbooks/Playbook15";
import Playbook16 from "./pages/playbooks/Playbook16";
import Playbook17 from "./pages/playbooks/Playbook17";


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
              <Route path="/resources/playbooks" element={<Playbooks />} />
              <Route path="/resources/playbooks/1" element={<Playbook1 />} />
              <Route path="/resources/playbooks/2" element={<Playbook2 />} />
              <Route path="/resources/playbooks/3" element={<Playbook3 />} />
              <Route path="/resources/playbooks/4" element={<Playbook4 />} />
              <Route path="/resources/playbooks/5" element={<Playbook5 />} />
              <Route path="/resources/playbooks/6" element={<Playbook6 />} />
              <Route path="/resources/playbooks/7" element={<Playbook7 />} />
              <Route path="/resources/playbooks/8" element={<Playbook8 />} />
              <Route path="/resources/playbooks/9" element={<Playbook9 />} />
              <Route path="/resources/playbooks/10" element={<Playbook10 />} />
              <Route path="/resources/playbooks/11" element={<Playbook11 />} />
              <Route path="/resources/playbooks/12" element={<Playbook12 />} />
              <Route path="/resources/playbooks/13" element={<Playbook13 />} />
              <Route path="/resources/playbooks/14" element={<Playbook14 />} />
              <Route path="/resources/playbooks/15" element={<Playbook15 />} />
              <Route path="/resources/playbooks/16" element={<Playbook16 />} />
              <Route path="/resources/playbooks/17" element={<Playbook17 />} />
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
