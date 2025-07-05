import React from 'react';
import { EligibilityResult } from '../types';

interface ResultsDisplayProps {
  result: EligibilityResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className={`p-4 rounded-lg mb-4 ${result.isEligible ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border`}>
        <h3 className={`text-lg font-semibold ${result.isEligible ? 'text-green-800' : 'text-red-800'}`}>
          {result.isEligible ? '✓ 受給資格あり' : '✗ 受給資格なし'}
        </h3>
        <p className={`${result.isEligible ? 'text-green-700' : 'text-red-700'} mt-2`}>
          {result.message}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium text-gray-700">子の1歳の誕生日</h4>
          <p className="text-gray-600">{formatDate(result.childOneYearBirthday)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium text-gray-700">子の1歳半の誕生日</h4>
          <p className="text-gray-600">{formatDate(result.childOneHalfYearBirthday)}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">受給資格条件</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className={`mr-2 ${result.employmentPeriodExceedsOneYear ? 'text-green-600' : 'text-red-600'}`}>
              {result.employmentPeriodExceedsOneYear ? '✓' : '✗'}
            </span>
            <span className="text-gray-700">雇用期間1年以上</span>
          </div>
          <div className="flex items-center">
            <span className={`mr-2 ${result.employmentContinuesBeyondOneHalfYears ? 'text-green-600' : 'text-red-600'}`}>
              {result.employmentContinuesBeyondOneHalfYears ? '✓' : '✗'}
            </span>
            <span className="text-gray-700">子の1歳半を超えても雇用が継続する見込み</span>
          </div>
          <div className="flex items-center">
            <span className={`mr-2 ${!result.weeklyWorkDaysLessThanThree ? 'text-green-600' : 'text-red-600'}`}>
              {!result.weeklyWorkDaysLessThanThree ? '✓' : '✗'}
            </span>
            <span className="text-gray-700">週、3日以上勤務</span>
          </div>
        </div>
      </div>

      {result.advice.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">アドバイス・次のステップ</h4>
          <ul className="space-y-1">
            {result.advice.map((advice, index) => (
              <li key={index} className="text-gray-600 flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                {advice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};