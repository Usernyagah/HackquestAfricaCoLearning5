import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Users, BookOpen, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useLearningProgress } from "@/hooks/useLearningProgress";

export default function Dashboard() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const { getProgress } = useLearningProgress();
  const totalTopics = 7; // Total Solidity topics

  useEffect(() => {
    // Simulate fetching block info
    const fetchBlockInfo = async () => {
      // In a real app, this would fetch from the blockchain
      setBlockNumber(Math.floor(Math.random() * 1000000) + 18000000);
    };
    fetchBlockInfo();
  }, []);

  const stats = [
    {
      title: "Registered Students",
      value: "42",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Current Topic",
      value: "Smart Contracts",
      icon: BookOpen,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Learning Progress",
      value: `${getProgress(totalTopics)}%`,
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Block Number",
      value: blockNumber.toLocaleString(),
      icon: Shield,
      color: "text-ethereum",
      bgColor: "bg-ethereum/10",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to Solidity Learner</h1>
        <p className="text-muted-foreground">
          Your interactive journey to mastering smart contract development
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Connect Your Wallet</p>
                <p className="text-sm text-muted-foreground">
                  Use MetaMask to interact with smart contracts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Explore Learning Resources</p>
                <p className="text-sm text-muted-foreground">
                  Navigate through Solidity and Ethereum notes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Interact with Contracts</p>
                <p className="text-sm text-muted-foreground">
                  Try real contract interactions on the blockchain
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">Contract Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Owner Address</p>
              <code className="text-xs bg-secondary/50 px-2 py-1 rounded">
                0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
              </code>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Network</p>
              <p className="font-medium">Ethereum Mainnet</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contract Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Active</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
