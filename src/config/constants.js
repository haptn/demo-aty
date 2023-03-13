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
export const currentCourseStatus = {
  COMING_SOON: 'Dự kiến',       // chưa diễn ra, chưa ấn định time tổ chức
  ENROLLING: 'Đang tuyển sinh', // chưa diễn ra, đã ấn định time cụ thể
  ON_GOING: 'Đang diễn ra',
  ENDED: 'Đã kết thúc',
  CANCELLED: 'Đã hủy'
}
export const currentActivityStatus = {
  COMING_SOON: 'Dự kiến',
  PREPARING: 'Chuẩn bị',  // trong khoảng từ ngày thông báo --> trước lúc bắt đầu
  ON_GOING: 'Đang diễn ra',
  ENDED: 'Đã kết thúc',
  CANCELLED: 'Đã hủy'
}

export const taxTypeStatus = {
  APPLYING: 'Đang áp dụng',
  NOT_APPLIED: 'Không áp dụng'
}
export const taxStatus = {
  NOT_SUBMITTED: 'Chưa nộp',
  SUBMITTED: 'Đã nộp'
}
export const taxPeriod = {
  MONTH: 'Theo tháng',
  QUARTER: 'Theo quý',
  YEAR: 'Theo năm',
}

export const budgetType = {
  BUDGET: 'Ngân sách',
  REVENUE: 'Doanh thu',
  COST: 'Chi phí',
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