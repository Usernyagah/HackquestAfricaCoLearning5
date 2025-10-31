import { useState, useEffect } from 'react';
import { useReadContract, useAccount, useBlockNumber } from 'wagmi';
import { STUDENT_REGISTRY_ABI, STUDENT_REGISTRY_ADDRESS } from '@/lib/constants';

export function useStudentStats() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    loading: true,
    error: null as string | null,
  });

  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  // Get total student count
  const { data: studentCount, isLoading: isLoadingCount } = useReadContract({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    functionName: 'getStudentCount',
    chainId: chain?.id,
  });

  // Get all students
  const { data: students = [], isLoading: isLoadingStudents } = useReadContract({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    functionName: 'getAllStudents',
    chainId: chain?.id,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const totalStudents = Number(studentCount || 0);
        
        setStats({
          totalStudents,
          loading: isLoadingCount || isLoadingStudents,
          error: null,
        });
      } catch (err) {
        console.error('Error fetching student stats:', err);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load student data',
        }));
      }
    };

    fetchStats();
  }, [studentCount, isLoadingCount, isLoadingStudents]);

  return {
    ...stats,
    blockNumber: blockNumber || 0,
    students: Array.isArray(students) ? students : [],
  };
}
