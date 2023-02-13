import {
  AreaChartOutlined,
  BankOutlined,
  DollarOutlined,
  DropboxOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  PercentageOutlined,
  ReadOutlined,
  RocketOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  TransactionOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ASSETS, PROGRAMS, routes, SETTINGS } from "../config/path"
import { schoolStatus, staffStatus, userRole } from "../config/constants"
import { toCapital } from "../utils/string"

// [Sidebar] Menu items
const menuItems = []

const excludePages = ['/login', '/profile']
const allRoles = [...Object.values(userRole)]
for (const [key, value] of Object.entries(routes)) {

  if (excludePages.includes(value)) continue

  const menuName = toCapital(key)
  let menuItem = {
    key: value,
    label: menuName,
    title: menuName
  }
  let label = ''

  switch (value) {
    case routes.DASHBOARD:
      menuItem = {
        ...menuItem,
        label: 'Báo cáo tổng quan',
        title: 'Báo cáo tổng quan',
        icon: <AreaChartOutlined />,
        role: allRoles
      }
      break

    case routes.BUDGET:
      menuItem = {
        ...menuItem,
        label: 'Ngân sách',
        icon: <DollarOutlined />,
        role: allRoles
      }
      break

    case routes.CASH_BOOK:
      menuItem = {
        ...menuItem,
        label: 'Sổ quỹ',
        icon: <ReadOutlined />,
        role: allRoles
      }
      break

    case routes.STAFFS:
      menuItem = {
        ...menuItem,
        label: 'Nhân viên',
        icon: <UserOutlined />,
        role: allRoles
      }
      break

    case routes.STUDENTS:
      menuItem = {
        ...menuItem,
        label: 'Học viên',
        icon: <TeamOutlined />,
        role: allRoles
      }
      break

    case routes.PROGRAMS:
      label = 'Chương trình'
      menuItem = {
        key: PROGRAMS,
        label,
        title: label,
        icon: <RocketOutlined />,
        role: allRoles
      }
      break

    case routes.BOARDING:
      menuItem = {
        ...menuItem,
        label: 'Bán trú / Nội trú',
        icon: <BankOutlined />,
        role: allRoles
      }
      break

    case routes.TAXES:
      menuItem = {
        ...menuItem,
        label: 'Thuế',
        icon: <PercentageOutlined />,
        role: allRoles
      }
      break

    case routes.ASSETS:
      label = 'Tài sản'
      menuItem = {
        key: ASSETS,
        label,
        title: label,
        icon: <DropboxOutlined />,
        role: allRoles
      }
      break

    case routes.PURCHASE_RENTAL:
      menuItem = {
        ...menuItem,
        label: 'Mua / Bán / Thuê',
        icon: <ShopOutlined />,
        role: allRoles
      }
      break

    case routes.LOAN_DEBT:
      menuItem = {
        ...menuItem,
        label: 'Vay / Nợ',
        icon: <TransactionOutlined />,
        role: allRoles
      }
      break

    case routes.INVOICES:
      menuItem = {
        ...menuItem,
        label: 'Quản lý hóa đơn',
        icon: <FileProtectOutlined />,
        role: allRoles
      }
      break

    case routes.SETTINGS:
      label = 'Thiết lập chung'
      menuItem = {
        key: SETTINGS,
        label,
        title: label,
        icon: <SettingOutlined />,
        role: [userRole.ADMIN]
      }
      break

    default:
      menuItem = {
        type: 'divider'
      }
      break
  }

  menuItems.push(menuItem)
}

// [Header] User menu
const userMenuItems = [
  {
    key: '/profile',
    label: 'Hồ sơ của tôi',
    icon: <UserOutlined />
  },
  {
    key: '/login',
    label: 'Đăng xuất',
    icon: <LogoutOutlined />
  }
]

// [Header] List notifications
const listNoti = [
  {
    title: 'Báo cáo thu',
    description: 'Admin ATY vừa bình luận vào báo cáo thu tháng 11/2022.',
    time: '15 phút trước',
    isNew: true
  },
  {
    title: 'Báo cáo chi',
    description: 'Admin Trường vừa duyệt báo cáo chi tháng 11/2022 của bạn.',
    time: '2 giờ trước',
    isNew: true
  },
  {
    title: 'Báo cáo chi',
    description: 'Admin Trường vừa điều chỉnh trong báo cáo chi tháng 11/2022 của bạn.',
    time: '1 ngày trước',
    isNew: false
  },
  {
    title: '[Nhắc việc!!!]',
    description: 'Admin Trường vừa yêu cầu tạo bản dự trù kinh phí cho chương trình 20/11.',
    time: '1 tháng trước',
    isNew: false
  },
]

// Mock data
// Schools & Branches
const listSchools = [
  {
    key: '1',
    name: 'ATY Nguyễn Đình Chiểu',
    type: 'Trung tâm',
    phone: '028 22433990',
    address: '112 Nguyễn Đình Chiểu, Đa Kao, Quận 1, Tp.HCM',
    status: schoolStatus.WORKING,
    taxCode: '0310449557',
  },
  {
    key: '2',
    name: 'Mầm non ATY',
    type: 'Mẫu giáo',
    phone: '028 38472182',
    address: '42 Cầu Xéo, Tân Quý, Tân Phú, Tp.HCM',
    status: schoolStatus.CLOSED,
    taxCode: '0310449557-001',
  },
  {
    key: '3',
    name: 'Trường Thủ Khoa Huân',
    type: 'Liên cấp',
    phone: '0902950008',
    address: '481/8 Trường Chinh, Phường 14, Quận Tân Bình, Tp.HCM',
    status: schoolStatus.WORKING,
    taxCode: '0310449557-002',
  },
  {
    key: '4',
    name: 'Hệ thống Giáo dục ATY',
    type: 'Cấp 3',
    phone: '028 22433990',
    address: 'Quận 12, Tp.HCM',
    status: schoolStatus.WORKING,
    taxCode: '0310449557-003',
  },
  {
    key: '5',
    name: 'ATY Đà Nẵng',
    type: 'Trung tâm',
    phone: '0236 12345678',
    address: 'Sơn Trà, Đà Nẵng',
    status: schoolStatus.PLANNING,
    taxCode: '0310449557-004',
  },
]

const schoolOrganizations = {
  '1': {
    id: '1',
    value: {
      name: 'Lương Dũng Nhân',
      title: 'Người đại diện',
      // 建议使用 bae64 数据
      // icon: 'https://avatars.githubusercontent.com/u/31396322?v=4',
    },
    children: [
      {
        id: '1-1',
        value: {
          name: 'Trần Thị B',
          title: 'Admin trường',
        },
        children: [
          {
            id: '1-1-1',
            value: {
              name: 'Nguyễn Thị A',
              title: 'Kế toán',
              status: staffStatus.WORKING,
            },
          },
          {
            id: '1-1-2',
            value: {
              name: 'Phạm Văn D',
              title: 'Kế toán',
              status: staffStatus.QUITTED,
            }
          },
        ],
      },
    ],
  },
  '2': {
    id: '1',
    value: {
      name: 'Nguyễn Hoàng Sơn',
      title: 'Người đại diện',
      // 建议使用 bae64 数据
      // icon: 'https://avatars.githubusercontent.com/u/31396322?v=4',
    },
  },
  '3': {
    id: '1',
    value: {
      name: 'Nguyễn Hoàng Hạ',
      title: 'Người đại diện',
      // 建议使用 bae64 数据
      // icon: 'https://avatars.githubusercontent.com/u/31396322?v=4',
    },
  },
  '4': {
    id: '1',
    value: {
      name: 'Lê Thị G',
      title: 'Người đại diện',
      // 建议使用 bae64 数据
      // icon: 'https://avatars.githubusercontent.com/u/31396322?v=4',
    },
    children: [
      {
        id: '1-1',
        value: {
          name: 'Nguyễn Văn E',
          title: 'Admin trường',
        },
      },
    ],
  },
}

// Accounts
const listAccounts = [
  {
    key: '1',
    name: 'Nguyễn Thị A',
    phone: '0987654321',
    email: 'kt.q1@aty.edu.vn',
    role: 'Kế toán',
    status: staffStatus.WORKING,
    schoolId: '1'
  },
  {
    key: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    email: 'admin.q1@aty.edu.vn',
    role: 'Admin trường',
    status: staffStatus.WORKING,
    schoolId: '1'
  },
  {
    key: '3',
    name: 'Phạm Văn D',
    phone: '0987654321',
    email: 'kt2.q1@aty.edu.vn',
    role: 'Kế toán',
    status: staffStatus.QUITTED,
    schoolId: '1'
  },
  {
    key: '4',
    name: 'Nguyễn Văn E',
    phone: '0987654321',
    email: 'kt.q12@aty.edu.vn',
    role: 'Admin trường',
    status: staffStatus.WORKING,
    schoolId: '4'
  },
]

// Roles & privileges


// Categories     // Sau chuyển cái này qua bên API để users có thể CRUD list danh mục này
const listSettings = [
  {
    id: '1',
    name: 'Nội bộ ATY',
    children: [
      // {
      //   id: '1.1',
      //   name: 'Tài khoản',
      //   pathName: '/settings/accounts',
      // },
      {
        id: '1.2',
        name: 'Trường & Cơ sở',
        pathName: '/settings/schools',
      },
      {
        id: '1.3',
        name: 'Lớp',
        pathName: '/settings/classes',
        description: 'Phần cấu hình này có thể khác nhau ở từng cơ sở, từng năm học'
      },
      {
        id: '1.4',
        name: 'Chương trình, khóa học',
        pathName: '/settings/courses',
        description: 'Danh sách tất cả các khóa học của ATY, học phí, mô tả,...'
      },
      // {
      //   id: '1.5',
      //   name: 'Học sinh, học viên',
      //   pathName: '/settings/students',
      // },
      // {
      //   id: '1.6',
      //   name: 'Nhân viên, giáo viên',
      //   pathName: '/settings/staffs',
      // },
      {
        id: '1.12',
        name: 'Học phí',
        pathName: '/settings/tuition-fees',
        description: 'Học phí từng cấp học, khối lớp, chương trình,...'
      },
      {
        id: '1.7',
        name: 'Bậc lương, thưởng, phụ cấp',
        pathName: '/settings/salary',
      },
      {
        id: '1.8',
        name: 'Loại dịch vụ của trường',   // bán trú, nội trú, căn-tin,...
        pathName: '/settings/school-services',
      },
      {
        id: '1.9',
        name: 'Bảng giá bán trú, nội trú',
        pathName: '/settings/boarding-price',
        description: 'Bảng giá bán trú, nội trú dành cho HS nam/nữ, loại phòng, kỳ đóng (theo tháng/học kỳ/...)'
      },
      {
        id: '1.10',
        name: 'Bảng giá đồng phục',
        pathName: '/settings/uniforms-price',
      },
      {
        id: '1.11',
        name: 'Bảng giá thực đơn',
        pathName: '/settings/menu-price',
      },
    ],
  },
  {
    id: '2',
    name: 'Đối tác của ATY',  // Long Bình Tân, NK Người Có Công,... (nơi chuyên cho thuê địa điểm tổ chức chtr / trường học liên kết)
    children: [
      {
        id: '2.1',
        name: 'Loại đối tác',
        pathName: '/settings/partner-types',
      },
      {
        id: '2.2',
        name: 'Đối tác',
        pathName: '/settings/partners',
      },
    ],
  },
  {
    id: '3',
    name: 'Nghiệp vụ kế toán',
    children: [
      {
        id: '3.1',
        name: 'Khoản mục thu nhập',
        pathName: '/settings/income',
      },
      {
        id: '3.2',
        name: 'Khoản mục chi phí',
        pathName: '/settings/costs',
      },
      {
        id: '3.3',
        name: 'Hình thức thanh toán',   // tiền mặt, chuyển khoản NH, ví điện tử
        pathName: '/settings/payment-methods',
      },
      {
        id: '3.4',
        name: 'Loại tiền tệ',
        pathName: '/settings/currencies',
      },
      {
        id: '3.5',
        name: 'Loại chứng từ',
        pathName: '/settings/documents',
      },
      {
        id: '3.6',
        name: 'Chu kỳ làm mới sổ',  // hàng tháng/quý/học kỳ/năm học/năm
        pathName: '/settings/renew-cycle',
      },
    ],
  },
  {
    id: '4',
    name: 'Thuế, phí, bảo hiểm',
    children: [
      {
        id: '4.1',
        name: 'Loại thuế',
        pathName: '/settings/taxes',
      },
      {
        id: '4.2',
        name: 'Biểu thuế',
        pathName: '/settings/tariffs',
      },
      {
        id: '4.3',
        name: 'Loại phí',
        pathName: '/settings/fees',
      },
      {
        id: '4.4',
        name: 'Loại bảo hiểm',
        pathName: '/settings/insurances',
      },
    ],
  },
  // {
  //   id: '5',
  //   name: 'Ngân hàng',
  //   children: [
  //     {
  //       id: '5.1',
  //       name: 'Ngân hàng',
  //       pathName: '/settings/banks',
  //     },
  //     {
  //       id: '5.2',
  //       name: 'Thông tin chuyển khoản',
  //       pathName: '/settings/bank-accounts',
  //     },
  //   ],
  // },
  {
    id: '6',
    name: 'Tài sản',
    children: [
      {
        id: '6.1',
        name: 'Loại tài sản cố định',
        pathName: '/settings/fixed-assets',
      },
      {
        id: '6.2',
        name: 'Loại công cụ, dụng cụ',
        pathName: '/settings/equipments',
      },
      {
        id: '6.3',
        name: 'Đơn vị tính',
        pathName: '/settings/units',
      },
    ],
  },
  {
    id: '7',
    name: 'Hệ thống',
    children: [
      {
        id: '7.1',
        name: 'Thông tin công ty',
        pathName: '/settings/aty-info',
        description: 'Dùng để tự chèn thông tin của ATY vào hợp đồng, hóa đơn,...'
      },
      {
        id: '7.2',
        name: 'Thông tin chuyển khoản',
        pathName: '/settings/bank-accounts',
      },
      {
        id: '7.3',
        name: 'Tài khoản & Quyền hạn',
        pathName: '/settings/accounts',
        description: 'Quyền hạn xemthêm/xóa/sửa của mỗi tài khoản trong hệ thống'
      },
      {
        id: '7.4',
        name: 'Loại người dùng',
        pathName: '/settings/user-roles',
        description: 'Vai trò của người dùng trong hệ thống (VD: kế toán, admin,...)'
      },
    ],
  },
  {
    id: '8',
    name: 'Khác',
    children: [
      {
        id: '8.1',
        name: 'Tùy chỉnh Sidebar Menu',
        pathName: '/settings/sidebar-menu',
        description: 'Tùy chỉnh những mục được hiển thị trên sidebar menu bên trái'
      },
      {
        id: '8.2',
        name: 'Chức năng thêm nhanh',
        pathName: '/settings/quick-add',
      },
    ],
  },
]

export {
  menuItems,
  userMenuItems,
  listNoti,
  listSchools,
  listAccounts,
  listSettings,
  schoolOrganizations
}