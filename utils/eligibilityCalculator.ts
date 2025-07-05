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
    advice.push('育児休業給付を受けるためには雇用保険に加入している必要があります。');
  }

  if (!employmentPeriodExceedsOneYear) {
    advice.push('出産予定日までに最低1年以上の雇用期間が必要です。');
  }

  if (!employmentContinuesBeyondOneHalfYears) {
    advice.push('お子さまの1歳半を超えても雇用が継続する必要があります。');
  }

  if (weeklyWorkDaysLessThanThree) {
    advice.push('受給資格を得るためには週、3日以上勤務する必要があります。');
  }

  if (data.planningToWorkDuringLeave) {
    advice.push('育児休業中の就労は給付に影響する場合があります。人事部門にご相談ください。');
  }

  if (data.partnerTakingLeave) {
    advice.push('両親が育児休業を取得する場合、合計休業期間1年、2か月まで取得できます。休業スケジュールを調整してください。');
  }

  if (isEligible) {
    advice.push('おめでとうございます！育児休業給付の受給資格があります。');
    advice.push('申請は取得開始予定日の1か月前までに提出してください。');
  }

  // Generate result message
  let message = '';
  if (isEligible) {
    message = '日本の育児休業給付の受給資格があります。';
  } else {
    message = '入力いただいた情報に基づくと、育児休業給付の受給資格がない可能性があります。';
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