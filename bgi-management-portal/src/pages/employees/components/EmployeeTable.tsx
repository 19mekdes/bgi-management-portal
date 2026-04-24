interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onView: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const EmployeeTable = ({ employees, onView, onEdit, onDelete }: EmployeeTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onView(emp.id)}>
              <td className="px-6 py-4 whitespace-nowrap">{emp.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.email}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{emp.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.department}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {onEdit && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(emp.id); }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};