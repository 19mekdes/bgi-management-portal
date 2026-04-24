/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Briefcase, Calendar, UserCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Spinner } from '../../components/common/Spinner';
import { employeeService } from '../../services/employee.service';
import { useAuth } from '../../contexts/AuthContext';
import { ConfirmModal } from '../../components/common/Modal';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export const EmployeeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const userRole = user?.role;
  const canEdit = userRole === 'ADMIN' || userRole === 'MANAGER';
  const canDelete = userRole === 'ADMIN';

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await employeeService.getById(Number(id));
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await employeeService.delete(Number(id));
      navigate('/employees');
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800';
      case 'STAFF':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'ACTIVE' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Employee not found</p>
        <Button onClick={() => navigate('/employees')} className="mt-4">
          Back to Employees
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/employees')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back to Employees
        </button>
        <div className="flex gap-2">
          {canEdit && (
            <Button
              variant="secondary"
              onClick={() => navigate(`/employees/${id}/edit`)}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {employee.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(employee.role)}`}>
                {employee.role}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase size={16} />
                <span>{employee.department || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>Joined: {formatDate(employee.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <UserCheck size={16} />
                <span>Last updated: {formatDate(employee.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.name}? This action cannot be undone.`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};