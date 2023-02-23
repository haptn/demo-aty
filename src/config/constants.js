export const keys = {
  USER: 'USER'
}

export const userRole = {
  ACCOUNTER: 'Kế toán',
  SCHOOL_ADMIN: 'Admin trường',
  ADMIN: 'Admin ATY'
}

export const schoolStatus = {
  PLANNING: 'Sắp hoạt động',
  WORKING: 'Đang hoạt động',
  CLOSED: 'Tạm đóng'
}
export const schoolType = {
  CENTER: 'Trung tâm',
  ESCALATOR: 'Liên cấp',
  HIGH: 'Cấp 3',
  SECONDARY: 'Cấp 2',
  PRIMARY: 'Cấp 1',
  KINDERGARTEN: 'Mẫu giáo'
}

export const staffStatus = {
  WORKING: 'Đang làm',
  QUITTED: 'Đã nghỉ'
}

export const courseStatus = {
  READIED: 'Sẵn sàng',
  PAUSED: 'Tạm dừng',
  COMING_SOON: 'Sắp ra mắt'
}
export const classStatus = {
  PERFORMING: 'Đang diễn ra',
  ENROLLING: 'Đang tuyển sinh',
  COMING_SOON: 'Sắp mở',
  ENDED: 'Đã kết thúc'
}

export const taxStatus = {
  APPLYING: 'Đang áp dụng',
  NOT_APPLIED: 'Không áp dụng'
}


// =========== Filter types ===========
export const filterSchools = {
  STATUS: 'status',
  TYPE: 'type'
}

export const filterAccounts = {
  STATUS: 'status',
  ROLE: 'role',
  SCHOOL: 'school'
}

export const filterCourses = {
  STATUS: 'status',
  // AGE: 'age',
  PRICE: 'price'
}

export const filterPeriodTypes = {
  // TODAY: 'Hôm nay',
  // THIS_WEEK: 'Tuần này',
  THIS_MONTH: 'Tháng này',
  LAST_MONTH: 'Tháng trước',
  // THIS_WEEK: 'Tháng sau',
  THIS_QUARTER: 'Quý này',
  LAST_QUARTER: 'Quý trước',
  THIS_YEAR: 'Năm nay',
  LAST_YEAR: 'Năm trước',
  FIRST_6_MONTHS: '6 tháng đầu năm',
  LAST_6_MONTHS: '6 tháng cuối năm',
  CUSTOM: 'Tùy chọn',   // (bung ra ô chọn from - to)
}

export const filterReportPeriods = {
  MONTH: 'Tháng',
  QUARTER: 'Quý',
  YEAR: 'Năm'
}