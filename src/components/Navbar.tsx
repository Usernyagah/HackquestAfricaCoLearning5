import { useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
  onToggleSidebar: () => void;
  walletAddress?: string;
  onConnectWallet: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar = ({ 
  onToggleSidebar, 
  walletAddress, 
  onConnectWallet,
  isDarkMode,
  onToggleTheme
}: NavbarProps) => {
  return (
    <motion.nav 
      className="glass-card sticky top-0 z-50 px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(var(--glow-primary))",
                  "0 0 40px hsl(var(--glow-primary))",
                  "0 0 20px hsl(var(--glow-primary))",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary-foreground">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
              </svg>
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-ethereum bg-clip-text text-transparent">
              Solidity Learner
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {walletAddress ? (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <Button onClick={onConnectWallet} className="glow-primary">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
