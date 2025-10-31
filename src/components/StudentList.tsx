import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { useStudentRegistry, StudentLevel } from '@/hooks/useStudentRegistry';

export function StudentList() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { getAllStudents, isOwner, resetRegistry } = useStudentRegistry();

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading students:', err);
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset the registry? This action cannot be undone.')) {
      try {
        setLoading(true);
        await resetRegistry();
        await loadStudents();
      } catch (err) {
        console.error('Error resetting registry:', err);
        setError('Failed to reset registry. Only the owner can perform this action.');
      } finally {
        setLoading(false);
      }
    }
  };

  const getLevelText = (level: StudentLevel) => {
    switch (level) {
      case StudentLevel.Beginner: return 'Beginner';
      case StudentLevel.Intermediate: return 'Intermediate';
      case StudentLevel.Advanced: return 'Advanced';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Registered Students</CardTitle>
          <CardDescription>
            {students.length} student{students.length !== 1 ? 's' : ''} found
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadStudents}
            disabled={loading}
          >
            Refresh
          </Button>
          {isOwner && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleReset}
              disabled={loading}
            >
              Reset Registry
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
        
        {loading && students.length === 0 ? (
          <div className="text-center py-8">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No students registered yet.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{getLevelText(student.level)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {`${student.ethereumAddress.slice(0, 6)}...${student.ethereumAddress.slice(-4)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StudentList;
