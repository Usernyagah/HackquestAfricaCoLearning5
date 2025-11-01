import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useChainId, useWatchContractEvent } from 'wagmi';
import { STUDENT_REGISTRY_ABI, STUDENT_REGISTRY_ADDRESS } from '@/lib/constants';

// Student levels enum
export enum StudentLevel {
  Beginner = 0,
  Intermediate = 1,
  Advanced = 2
}

export interface Student {
  name: string;
  age: number;
  ethereumAddress: string;
  course: string;
  level: StudentLevel;
}

export const useStudentRegistry = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  // Read owner of the contract
  const { data: owner } = useReadContract({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    functionName: 'owner',
    chainId,
  });

  // Check if connected account is the owner
  const isOwner = isConnected && address && owner 
    ? address.toLowerCase() === (owner as string).toLowerCase()
    : false;

  // Register a new student
  const { writeContractAsync: registerStudent, isPending: isRegistering } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error in registerStudent:', error);
      },
    },
  });
  
  // Update student course
  const { writeContractAsync: updateCourse, isPending: isUpdating } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error in updateCourse:', error);
      },
    },
  });
  
  // Reset registry
  const { writeContractAsync: resetRegistry, isPending: isResetting } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Error in resetRegistry:', error);
      },
    },
  });

  // Get student by address
  const getStudent = async (studentAddress: string) => {
    const { data } = useReadContract({
      abi: STUDENT_REGISTRY_ABI,
      address: STUDENT_REGISTRY_ADDRESS,
      functionName: 'getStudent',
      args: [studentAddress as `0x${string}`],
      chainId,
    });

    if (!data) return null;
    
    const [name, age, ethAddress, course, level] = data as [string, bigint, string, string, number];
    
    return {
      name,
      age: Number(age),
      course,
      level,
      ethereumAddress: ethAddress
    } as Student;
  };

  // Get all students
  const { data: students = [], refetch: refetchStudents } = useReadContract({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    functionName: 'getAllStudents',
    chainId,
  });

  // Format students data
  // Student struct order: name, age, ethereumAddress, course, level
  const formattedStudents = (Array.isArray(students) ? students : []).map((student: any) => ({
    name: student[0],
    age: Number(student[1]),
    ethereumAddress: student[2],
    course: student[3],
    level: student[4]
  })) as Student[];

  // Watch for StudentRegistered event
  useWatchContractEvent({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    eventName: 'StudentRegistered',
    onLogs: () => {
      refetchStudents();
    },
  });

  // Watch for CourseUpdated event
  useWatchContractEvent({
    abi: STUDENT_REGISTRY_ABI,
    address: STUDENT_REGISTRY_ADDRESS,
    eventName: 'CourseUpdated',
    onLogs: () => {
      refetchStudents();
    },
  });

  // Register a new student
  const handleRegisterStudent = async (name: string, age: number, course: string, level: StudentLevel) => {
    if (!isConnected) throw new Error('Please connect your wallet');
    if (!registerStudent) throw new Error('Contract function not initialized');
    
    try {
      console.log('Registering student with:', { name, age, course, level });
      
      const result = await registerStudent({
        abi: STUDENT_REGISTRY_ABI,
        address: STUDENT_REGISTRY_ADDRESS,
        functionName: 'registerStudent',
        args: [name, BigInt(age), course, level],
      });
      
      console.log('Registration successful:', result);
      return result;
    } catch (error) {
      console.error('Error in handleRegisterStudent:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to register student: ${error.message}`);
      }
      throw new Error('Failed to register student');
    }
  };

  // Update student course
  const handleUpdateCourse = async (studentAddress: string, newCourse: string) => {
    if (!isConnected) throw new Error('Please connect your wallet');
    if (!isOwner) throw new Error('Only the owner can update courses');
    
    return updateCourse({
      abi: STUDENT_REGISTRY_ABI,
      address: STUDENT_REGISTRY_ADDRESS,
      functionName: 'updateCourse',
      args: [studentAddress as `0x${string}`, newCourse],
    });
  };

  // Reset registry
  const handleResetRegistry = async () => {
    if (!isConnected) throw new Error('Please connect your wallet');
    if (!isOwner) throw new Error('Only the owner can reset the registry');
    
    return resetRegistry({
      abi: STUDENT_REGISTRY_ABI,
      address: STUDENT_REGISTRY_ADDRESS,
      functionName: 'resetRegistry',
    });
  };

  return {
    account: address,
    isOwner,
    loading: isRegistering || isUpdating || isResetting,
    students: formattedStudents,
    getStudent,
    registerStudent: handleRegisterStudent,
    updateCourse: handleUpdateCourse,
    resetRegistry: handleResetRegistry,
    refetchStudents,
  };
};

export default useStudentRegistry;
