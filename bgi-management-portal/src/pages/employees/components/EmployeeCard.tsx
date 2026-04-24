import { User, Mail, Briefcase, Building } from 'lucide-react';

interface EmployeeCardProps {
  employee: {
    name: string;
    email: string;
    role: string;
    department: string;
    createdAt?: string;
  };
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 rounded-full p-3">
          <User size={40} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-500 capitalize">{employee.role}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Mail size={18} className="mr-2" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase size={18} className="mr-2" />
          <span className="capitalize">{employee.role}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Building size={18} className="mr-2" />
          <span>{employee.department}</span>
        </div>
        {employee.createdAt && (
          <p className="text-sm text-gray-400 mt-2">Joined: {new Date(employee.createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};