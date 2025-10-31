import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Users, BookOpen, Shield, Activity, Book, GraduationCap, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { useStudentStats } from "@/hooks/useStudentStats";
import { useContractRead } from 'wagmi';
import { STUDENT_REGISTRY_ADDRESS } from "@/lib/constants";
import studentRegistryAbi from "@/contracts/abi/StudentRegistry.json";

export default function Dashboard() {
  const { totalStudents, blockNumber, loading, error } = useStudentStats();
  const { getProgress } = useLearningProgress();
  const totalTopics = 7; // Total Solidity topics
  const [courseStats, setCourseStats] = useState({
    totalCourses: 0,
    activeStudents: 0,
  });

  // Fetch course stats from CourseManager contract
  const { data: courseCount, isLoading: isLoadingCourses } = useContractRead({
    address: STUDENT_REGISTRY_ADDRESS,
    abi: studentRegistryAbi,
    functionName: 'getCoursesCount',
    watch: true,
  });

  useEffect(() => {
    if (courseCount !== undefined) {
      setCourseStats(prev => ({
        ...prev,
        totalCourses: Number(courseCount) || 0,
      }));
    }
  }, [courseCount]);

  const stats = [
    {
      title: "Registered Students",
      value: loading ? "..." : totalStudents.toString(),
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      loading,
    },
    {
      title: "Available Courses",
      value: isLoadingCourses ? "..." : courseStats.totalCourses.toString(),
      icon: Book,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      loading: isLoadingCourses,
    },
    {
      title: "Active Students",
      value: loading ? "..." : Math.floor(totalStudents * 0.7).toString(), // Example calculation
      icon: GraduationCap,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      loading,
    },
    {
      title: "Block Number",
      value: blockNumber.toLocaleString(),
      icon: Shield,
      color: "text-ethereum",
      bgColor: "bg-ethereum/10",
      loading: false,
    },
    {
      title: "Learning Progress",
      value: `${getProgress(totalTopics)}%`,
      icon: Activity,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      loading: false,
    },
    {
      title: "Certificates Issued",
      value: loading ? "..." : Math.floor(totalStudents * 0.4).toString(), // Example calculation
      icon: Award,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      loading,
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
