import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/hooks/useWallet";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SolidityNotes from "./pages/SolidityNotes";
import EthereumNotes from "./pages/EthereumNotes";
import ContractInteraction from "./pages/ContractInteraction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { walletAddress, connectWallet } = useWallet();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full">
            <Navbar
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              walletAddress={walletAddress}
              onConnectWallet={connectWallet}
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="flex w-full">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="flex-1 p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/solidity-notes" element={<SolidityNotes />} />
                  <Route path="/ethereum-notes" element={<EthereumNotes />} />
                  <Route path="/contract-interaction" element={<ContractInteraction />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
