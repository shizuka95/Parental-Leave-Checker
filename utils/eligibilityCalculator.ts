import { FormData, EligibilityResult } from '../types';

export const calculateEligibility = (data: FormData): EligibilityResult => {
  const birthDate = new Date(data.expectedBirthDate);
  const employmentStartDate = new Date(data.employmentStartDate);
  const contractEndDate = data.contractEndDate ? new Date(data.contractEndDate) : null;

  // Calculate child's 1st and 1.5-year birthdays
  const childOneYearBirthday = new Date(birthDate);
  childOneYearBirthday.setFullYear(birthDate.getFullYear() + 1);

  const childOneHalfYearBirthday = new Date(birthDate);
  childOneHalfYearBirthday.setMonth(birthDate.getMonth() + 18);

  // Check if employment continues beyond 1.5 years after birth
  const employmentContinuesBeyondOneHalfYears = 
    !contractEndDate || contractEndDate > childOneHalfYearBirthday;

  // Check if employment period exceeds 1 year at time of birth
  const employmentDurationAtBirth = birthDate.getTime() - employmentStartDate.getTime();
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  const employmentPeriodExceedsOneYear = employmentDurationAtBirth >= oneYearInMs;

  // Check if weekly working days < 3
  const weeklyWorkDaysLessThanThree = data.weeklyWorkDays < 3;

  // Core eligibility conditions
  const coreConditions = [
    data.enrolledInEmploymentInsurance,
    employmentPeriodExceedsOneYear,
    employmentContinuesBeyondOneHalfYears,
    !weeklyWorkDaysLessThanThree
  ];

  const isEligible = coreConditions.every(condition => condition);

  // Generate advice based on conditions
  const advice: string[] = [];
  
  if (!data.enrolledInEmploymentInsurance) {
    advice.push('You must be enrolled in employment insurance to be eligible for childcare leave benefits.');
  }

  if (!employmentPeriodExceedsOneYear) {
    advice.push('You must have been employed for at least 1 year before the expected birth date.');
  }

  if (!employmentContinuesBeyondOneHalfYears) {
    advice.push('Your employment contract must continue beyond your child\'s 1.5-year birthday.');
  }

  if (weeklyWorkDaysLessThanThree) {
    advice.push('You must work at least 3 days per week to be eligible.');
  }

  if (data.planningToWorkDuringLeave) {
    advice.push('Working during childcare leave may affect your benefits. Please consult with your HR department.');
  }

  if (data.partnerTakingLeave) {
    advice.push('Both parents taking leave may extend the total leave period. Consider coordinating your leave schedules.');
  }

  if (isEligible) {
    advice.push('Congratulations! You appear to be eligible for childcare leave.');
    advice.push('Please submit your application at least 1 month before your intended start date.');
  }

  // Generate result message
  let message = '';
  if (isEligible) {
    message = 'You are eligible for childcare leave (育児休業) in Japan.';
  } else {
    message = 'Based on the information provided, you may not be eligible for childcare leave.';
  }

  return {
    isEligible,
    childOneYearBirthday,
    childOneHalfYearBirthday,
    employmentContinuesBeyondOneHalfYears,
    employmentPeriodExceedsOneYear,
    weeklyWorkDaysLessThanThree,
    message,
    advice
  };
};