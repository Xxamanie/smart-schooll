export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getWeekDates(date: Date = new Date()): Date[] {
  const current = new Date(date);
  const week = [];
  current.setDate(current.getDate() - current.getDay());
  
  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return week;
}

export function getTermDates(startDate: Date): {
  termStart: Date;
  termEnd: Date;
  midTermBreakStart: Date;
  midTermBreakEnd: Date;
} {
  const termStart = new Date(startDate);
  const termEnd = addDays(termStart, 90); // Assuming 90-day terms
  const midTermBreakStart = addDays(termStart, 42); // Week 6
  const midTermBreakEnd = addDays(midTermBreakStart, 7); // 1-week break

  return {
    termStart,
    termEnd,
    midTermBreakStart,
    midTermBreakEnd,
  };
}

export function isSchoolDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6; // Not weekend
}

export function getCurrentAcademicYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Assuming academic year starts in September
  return month < 8 ? `${year-1}/${year}` : `${year}/${year+1}`;
}