import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useStudentRegistry, StudentLevel } from '@/hooks/useStudentRegistry';

export function StudentRegistration() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState<StudentLevel>(StudentLevel.Beginner);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const { account, connectWallet, registerStudent, isOwner } = useStudentRegistry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) {
      try {
        await connectWallet();
      } catch (err) {
        setMessage({ text: 'Failed to connect wallet', type: 'error' });
      }
      return;
    }

    if (!name || !age || !course) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      await registerStudent(name, parseInt(age, 10), course, level);
      
      setMessage({ 
        text: 'Student registered successfully!', 
        type: 'success' 
      });
      
      // Reset form
      setName('');
      setAge('');
      setCourse('');
      setLevel(StudentLevel.Beginner);
    } catch (err: any) {
      console.error('Registration error:', err);
      setMessage({ 
        text: err.message || 'Failed to register student', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Student Registration</CardTitle>
        <CardDescription>
          {account 
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : 'Connect your wallet to register'}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="10"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Blockchain Development"
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Skill Level</Label>
            <Select 
              value={level.toString()} 
              onValueChange={(value) => setLevel(parseInt(value, 10) as StudentLevel)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={StudentLevel.Beginner.toString()}>Beginner</SelectItem>
                <SelectItem value={StudentLevel.Intermediate.toString()}>Intermediate</SelectItem>
                <SelectItem value={StudentLevel.Advanced.toString()}>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {message && (
            <div className={`p-3 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : account ? 'Register Student' : 'Connect Wallet'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default StudentRegistration;
