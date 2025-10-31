import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";
import { Wallet, Send, Info, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContractInteraction() {
  const { walletAddress, connectWallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [blockInfo, setBlockInfo] = useState<any>(null);

  const handleGetTopic = async () => {
    setLoading(true);
    try {
      // Simulate contract call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const topic = "Smart Contract Development";
      setCurrentTopic(topic);
      toast.success(`Current topic: ${topic}`);
    } catch (error: any) {
      toast.error("Failed to get topic");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterStudent = async () => {
    if (!studentName || !studentAge) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(`Student ${studentName} registered successfully!`);
      setStudentName("");
      setStudentAge("");
    } catch (error: any) {
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGetBlockInfo = async () => {
    setLoading(true);
    try {
      // Simulate blockchain query
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const info = {
        number: Math.floor(Math.random() * 1000000) + 18000000,
        timestamp: Date.now(),
        difficulty: "15,000,000,000,000",
        gasLimit: "30,000,000",
      };
      setBlockInfo(info);
      toast.success("Block info fetched successfully");
    } catch (error: any) {
      toast.error("Failed to get block info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Contract Interaction</h1>
        <p className="text-muted-foreground">
          Connect your wallet and interact with smart contracts
        </p>
      </div>

      {!walletAddress ? (
        <GlassCard className="text-center py-12">
          <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            You need to connect MetaMask to interact with the contract
          </p>
          <Button onClick={connectWallet} size="lg" className="glow-primary">
            <Wallet className="h-5 w-5 mr-2" />
            Connect MetaMask
          </Button>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <code className="text-sm font-mono">{walletAddress}</code>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard>
                <h2 className="text-xl font-bold mb-4">Get Current Topic</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Fetch the current learning topic from the contract
                </p>
                <Button onClick={handleGetTopic} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4 mr-2" />
                      Get Topic
                    </>
                  )}
                </Button>
                {currentTopic && (
                  <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm font-medium">{currentTopic}</p>
                  </div>
                )}
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard>
                <h2 className="text-xl font-bold mb-4">Register Student</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      placeholder="Enter student age"
                    />
                  </div>
                  <Button
                    onClick={handleRegisterStudent}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Register
                      </>
                    )}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <h2 className="text-xl font-bold mb-4">Block Information</h2>
              <Button onClick={handleGetBlockInfo} disabled={loading} className="mb-4">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Get Block Info"
                )}
              </Button>
              {blockInfo && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Block Number</p>
                    <p className="text-lg font-bold">{blockInfo.number.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Gas Limit</p>
                    <p className="text-lg font-bold">{blockInfo.gasLimit}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="text-lg font-bold">{blockInfo.difficulty}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                    <p className="text-lg font-bold">
                      {new Date(blockInfo.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
