import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { toast } from "sonner";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast.error("Please install MetaMask to use this DApp!");
      return;
    }

    try {
      const ethProvider = new BrowserProvider(window.ethereum);
      const accounts = await ethProvider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setProvider(ethProvider);
        toast.success("Wallet connected successfully!");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error(error.message || "Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setProvider(null);
    toast.info("Wallet disconnected");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  return {
    walletAddress,
    provider,
    connectWallet,
    disconnectWallet,
  };
};
