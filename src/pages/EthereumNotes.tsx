import { GlassCard } from "@/components/GlassCard";
import { ExternalLink, Blocks, Fuel, Network, Wallet, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ethereumConcepts = [
  {
    icon: Blocks,
    title: "Blockchain",
    description:
      "A decentralized, distributed ledger that records transactions across multiple computers. Each block contains a cryptographic hash of the previous block, creating an immutable chain of records.",
    points: [
      "Immutable and transparent",
      "Decentralized consensus",
      "Cryptographically secured",
      "Distributed across network nodes",
    ],
  },
  {
    icon: Fuel,
    title: "Gas & Fees",
    description:
      "Gas is the unit that measures computational work on Ethereum. Users pay gas fees to execute transactions and smart contracts, compensating validators for their resources.",
    points: [
      "Measured in Gwei (1 ETH = 10⁹ Gwei)",
      "Prevents spam and abuse",
      "Varies based on network congestion",
      "Priority fee for faster processing",
    ],
  },
  {
    icon: Network,
    title: "Transactions",
    description:
      "Signed data messages that change the state of the blockchain. Transactions can transfer ETH, interact with smart contracts, or deploy new contracts.",
    points: [
      "Includes sender, receiver, value, and data",
      "Must be signed with private key",
      "Irreversible once confirmed",
      "Grouped into blocks by validators",
    ],
  },
  {
    icon: Globe,
    title: "Ethereum Virtual Machine (EVM)",
    description:
      "The runtime environment for smart contracts on Ethereum. It's a global, decentralized computer that executes code identically on every node in the network.",
    points: [
      "Turing-complete computation",
      "Isolated execution environment",
      "Deterministic operations",
      "Bytecode execution",
    ],
  },
  {
    icon: Wallet,
    title: "Wallets",
    description:
      "Tools that manage your private keys and allow you to interact with the Ethereum blockchain. They don't actually store cryptocurrency, but rather the keys to access it.",
    points: [
      "Hot wallets (online) vs Cold wallets (offline)",
      "Custodial vs Non-custodial",
      "MetaMask, Trust Wallet, Ledger",
      "Always secure your seed phrase",
    ],
  },
];

export default function EthereumNotes() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Ethereum Fundamentals</h1>
        <p className="text-muted-foreground">
          Understanding the building blocks of the Ethereum blockchain
        </p>
      </div>

      <div className="space-y-6">
        {ethereumConcepts.map((concept, index) => (
          <motion.div
            key={concept.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  <concept.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">{concept.title}</h2>
                  <p className="text-muted-foreground mb-4">{concept.description}</p>
                  <ul className="space-y-2">
                    {concept.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Learn More</h2>
          <p className="text-muted-foreground">
            Explore official resources to deepen your understanding
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.open("https://ethereum.org", "_blank")}
              className="gap-2"
            >
              Ethereum.org
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://docs.soliditylang.org", "_blank")}
              className="gap-2"
            >
              Solidity Docs
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://etherscan.io", "_blank")}
              className="gap-2"
            >
              Etherscan
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
