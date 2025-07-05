export interface FormData {
  expectedBirthDate: string;
  employmentType: 'full-time' | 'contract' | 'part-time' | 'temp';
  employmentStartDate: string;
  contractEndDate: string;
  weeklyWorkDays: number;
  enrolledInEmploymentInsurance: boolean;
  planningToWorkDuringLeave: boolean;
  partnerTakingLeave: boolean;
}

export interface FormErrors {
  expectedBirthDate?: string;
  employmentType?: string;
  employmentStartDate?: string;
  contractEndDate?: string;
  weeklyWorkDays?: string;
  enrolledInEmploymentInsurance?: string;
  planningToWorkDuringLeave?: string;
  partnerTakingLeave?: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  childOneYearBirthday: Date;
  childOneHalfYearBirthday: Date;
  employmentContinuesBeyondOneHalfYears: boolean;
  employmentPeriodExceedsOneYear: boolean;
  weeklyWorkDaysLessThanThree: boolean;
  message: string;
  advice: string[];
}