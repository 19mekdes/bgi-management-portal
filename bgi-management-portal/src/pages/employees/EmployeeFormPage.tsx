/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Card } from '../../components/common/Card';
import { employeeService } from '../../services/employee.service';
import { useAuth } from '../../contexts/AuthContext';

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
}

interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const EmployeeFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    password: '',
    role: 'STAFF',
    department: '',
  });

  // Check if user has permission
  const userRole = user?.role;
  const canEdit = userRole === 'ADMIN' || userRole === 'MANAGER';

  useEffect(() => {
    if (!canEdit) {
      navigate('/employees');
      return;
    }
    
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id, canEdit, navigate]);

  const fetchEmployee = async () => {
    setFetching(true);
    try {
      const response = await employeeService.getById(Number(id));
      // Handle different response structures
      const employeeData = response.data as unknown as EmployeeResponse;
      setFormData({
        name: employeeData.name || '',
        email: employeeData.email || '',
        password: '',
        role: employeeData.role || 'STAFF',
        department: employeeData.department || '',
      });
    } catch (err) {
      console.error('Error fetching employee:', err);
      setError('Failed to load employee data');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!isEditMode && !formData.password) {
      setError('Password is required for new employees');
      return false;
    }
    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        // Create a copy without password if it's empty
        const { password, ...updateData } = formData;
        const dataToSend = password ? { ...updateData, password } : updateData;
        await employeeService.update(Number(id), dataToSend);
      } else {
        await employeeService.create(formData);
      }
      navigate('/employees');
    } catch (err) {
      console.error('Error saving employee:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save employee';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!canEdit) {
    return null;
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/employees')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Employees
      </button>

      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter employee's full name"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="employee@bgi.com"
            />

            <Input
              label={isEditMode ? "Password (leave blank to keep current)" : "Password"}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode}
              placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
            />

            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'MANAGER', label: 'Manager' },
                { value: 'STAFF', label: 'Staff' },
              ]}
            />

            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Production, HR, Sales, Quality Control"
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/employees')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                <Save size={16} className="mr-2" />
                {loading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Create Employee')}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};