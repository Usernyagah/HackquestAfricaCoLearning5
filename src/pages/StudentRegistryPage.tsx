import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StudentRegistration } from '@/components/StudentRegistration';
import { StudentList } from '@/components/StudentList';

export default function StudentRegistryPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Registry System</h1>
          <p className="text-muted-foreground">
            Manage student registrations and view the student directory
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Register New Student</h2>
          <StudentRegistration />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Student Directory</h2>
          </div>
          <div className="rounded-lg border p-4 bg-card">
            <StudentList />
          </div>
        </div>
      </div>
    </div>
  );
}
