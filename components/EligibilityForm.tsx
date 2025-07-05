import React, { useState } from 'react';
import { FormData, FormErrors } from '../types';

interface EligibilityFormProps {
  onSubmit: (data: FormData) => void;
}

export const EligibilityForm: React.FC<EligibilityFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    expectedBirthDate: '',
    employmentType: 'full-time',
    employmentStartDate: '',
    contractEndDate: '',
    weeklyWorkDays: 5,
    enrolledInEmploymentInsurance: true,
    planningToWorkDuringLeave: false,
    partnerTakingLeave: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.expectedBirthDate) {
      newErrors.expectedBirthDate = 'Expected birth date is required';
    }

    if (!formData.employmentStartDate) {
      newErrors.employmentStartDate = 'Employment start date is required';
    }

    if ((formData.employmentType === 'contract' || formData.employmentType === 'temp') && !formData.contractEndDate) {
      newErrors.contractEndDate = 'Contract end date is required for contract/temp employment';
    }

    if (formData.weeklyWorkDays < 1 || formData.weeklyWorkDays > 7) {
      newErrors.weeklyWorkDays = 'Weekly work days must be between 1 and 7';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Childcare Leave Eligibility Check</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Birth Date
        </label>
        <input
          type="date"
          value={formData.expectedBirthDate}
          onChange={(e) => handleChange('expectedBirthDate', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors.expectedBirthDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.expectedBirthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.expectedBirthDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Employment Type
        </label>
        <select
          value={formData.employmentType}
          onChange={(e) => handleChange('employmentType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="full-time">Full-time</option>
          <option value="contract">Contract</option>
          <option value="part-time">Part-time</option>
          <option value="temp">Temporary</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Employment Start Date
        </label>
        <input
          type="date"
          value={formData.employmentStartDate}
          onChange={(e) => handleChange('employmentStartDate', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors.employmentStartDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.employmentStartDate && (
          <p className="text-red-500 text-sm mt-1">{errors.employmentStartDate}</p>
        )}
      </div>

      {(formData.employmentType === 'contract' || formData.employmentType === 'temp') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contract End Date
          </label>
          <input
            type="date"
            value={formData.contractEndDate}
            onChange={(e) => handleChange('contractEndDate', e.target.value)}
            className={`w-full p-2 border rounded-md ${errors.contractEndDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contractEndDate && (
            <p className="text-red-500 text-sm mt-1">{errors.contractEndDate}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weekly Work Days
        </label>
        <input
          type="number"
          min="1"
          max="7"
          value={formData.weeklyWorkDays}
          onChange={(e) => handleChange('weeklyWorkDays', parseInt(e.target.value))}
          className={`w-full p-2 border rounded-md ${errors.weeklyWorkDays ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.weeklyWorkDays && (
          <p className="text-red-500 text-sm mt-1">{errors.weeklyWorkDays}</p>
        )}
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.enrolledInEmploymentInsurance}
            onChange={(e) => handleChange('enrolledInEmploymentInsurance', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Enrolled in employment insurance
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.planningToWorkDuringLeave}
            onChange={(e) => handleChange('planningToWorkDuringLeave', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Planning to work during childcare leave
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.partnerTakingLeave}
            onChange={(e) => handleChange('partnerTakingLeave', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Partner is also taking childcare leave
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Check Eligibility
      </button>
    </form>
  );
};