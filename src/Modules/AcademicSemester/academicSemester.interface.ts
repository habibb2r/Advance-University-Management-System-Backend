type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemester ={
    name: 'Autumn' | 'Fall' | 'Summer',
    code: '01' | '02' | '03',
    year: Date,
    startMonth: Month,
    endMonth: Month

}