import { routes } from "../config/path"
import {
  AppstoreAddOutlined,
  AreaChartOutlined,
  BankOutlined,
  DollarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
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
    label: menuName
  }

  switch (value) {
    case routes.DASHBOARD:
      menuItem = {
        ...menuItem,
        icon: <AreaChartOutlined />,
        role: allRoles
      }
      break

    case routes.SCHOOLS:
      menuItem = {
        ...menuItem,
        label: 'Trường & Nhân viên',
        icon: <BankOutlined />,
        role: [userRole.ADMIN]
      }
      break

    case routes.ACCOUNTS:
      menuItem = {
        ...menuItem,
        label: 'Tài khoản',
        icon: <UserOutlined />,
        role: [userRole.ADMIN]
      }
      break

    case routes.SETTING:
      menuItem = {
        ...menuItem,
        label: 'Thiết lập chung',
        icon: <SettingOutlined />,
        role: [userRole.ADMIN],

      }
      break

    case routes.CATEGORIES:
      menuItem = {
        ...menuItem,
        label: 'Quản lý phân loại',
        icon: <AppstoreAddOutlined />,
        role: allRoles
      }
      break

    case routes.TAXES:
      menuItem = {
        ...menuItem,
        label: 'Quản lý thuế',
        icon: <DollarOutlined />,
        role: allRoles
      }
      break

    default:
      break
  }

  menuItems.push(menuItem)
}

// [Header] User menu
const userMenuItems = [
  {
    key: '/profile',
    label: 'View Profile',
    icon: <UserOutlined />
  },
  {
    key: '/login',
    label: 'Log out',
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


// 

export {
  menuItems,
  userMenuItems,
  listNoti,
  listSchools,
  listAccounts,
  schoolOrganizations
}