export const SETTINGS = '/settings'

export const routes = {
  LOGIN: '/login',
  DASHBOARD: '/',
  PROFILE: '/profile',
  TAXES: '/taxes',
  '-': '-',
  SETTINGS: {
    // 1. Nội bộ ATY
    SCHOOLS: `${SETTINGS}/schools`,
    CLASSES: `${SETTINGS}/classes`,
    COURSES: `${SETTINGS}/courses`,
    STUDENTS: `${SETTINGS}/students`,
    STAFFS: `${SETTINGS}/staffs`,
    SALARY: `${SETTINGS}/salary`,
    SCHOOL_SERVICES: `${SETTINGS}/school-services`,
    BOARDING: `${SETTINGS}/boarding-price`,
    UNIFORMS: `${SETTINGS}/uniforms-price`,
    MENU: `${SETTINGS}/menu-price`,

    // 2. Đối tác của ATY
    PARTNER_TYPES: `${SETTINGS}/partner-types`,
    PARTNERS: `${SETTINGS}/partners`,

    // 3. Nghiệp vụ kế toán
    INCOME: `${SETTINGS}/income`,
    COSTS: `${SETTINGS}/costs`,
    PAYMENT: `${SETTINGS}/payment-methods`,
    CURRENCIES: `${SETTINGS}/currencies`,
    DOCUMENTS: `${SETTINGS}/documents`,
    RENEW_CYCLE: `${SETTINGS}/renew-cycle`,

    // 4. Thuế, phí, bảo hiểm
    TAXES: `${SETTINGS}/taxes`,
    TARIIFFS: `${SETTINGS}/tariffs`,
    FEES: `${SETTINGS}/fees`,
    INSURANCES: `${SETTINGS}/insurances`,

    // 5. Ngân hàng
    BANKS: `${SETTINGS}/banks`,
    BANK_ACCOUNTS: `${SETTINGS}/bank-accounts`,

    // 6. Tài sản
    FIXED_ASSETS: `${SETTINGS}/fixed-assets`,
    EQUIPMENTS: `${SETTINGS}/equipments`,
    UNITS: `${SETTINGS}/units`,

    // 7. Hệ thống
    ATY_INFO: `${SETTINGS}/aty-info`,
    ACCOUNTS: `${SETTINGS}/accounts`,
    ROLES: `${SETTINGS}/roles`,

    // 8. Khác
    SIDEBAR_MENU: `${SETTINGS}/sidebar-menu`,
    QUICK_ADD: `${SETTINGS}/quick-add`,
  },
  // SCHOOLS: '/schools',
  // ACCOUNTS: '/accounts',
  // CATEGORIES: '/categories',
}