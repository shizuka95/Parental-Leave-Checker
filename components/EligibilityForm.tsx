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
      newErrors.expectedBirthDate = '出産予定日を入力してください';
    }

    if (!formData.employmentStartDate) {
      newErrors.employmentStartDate = '雇用開始日を入力してください';
    }

    if ((formData.employmentType === 'contract' || formData.employmentType === 'temp') && !formData.contractEndDate) {
      newErrors.contractEndDate = '契約・派遣雇用の場合、契約終了日の入力が必要です';
    }

    if (formData.weeklyWorkDays < 1 || formData.weeklyWorkDays > 7) {
      newErrors.weeklyWorkDays = '週労働日数は1〜7日の間で入力してください';
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">育児休業受給資格チェック</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          出産予定日
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
          雇用形態
        </label>
        <select
          value={formData.employmentType}
          onChange={(e) => handleChange('employmentType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="full-time">正社員</option>
          <option value="contract">契約社員</option>
          <option value="part-time">パート・アルバイト</option>
          <option value="temp">派遣社員</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          雇用開始日
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
            契約終了日
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
          週労働日数
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
            雇用保険に加入している
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
            育児休業中に就労を予定している
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
            配偶者も育児休業を取得する
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        受給資格をチェック
      </button>
    </form>
  );
};