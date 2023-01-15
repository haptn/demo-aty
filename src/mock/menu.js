import {
  AppstoreAddOutlined,
  AreaChartOutlined,
  BankOutlined,
  DollarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { userRole } from '../config/constants'

const allRoles = [...Object.values(userRole)]

const menu = [
  {
    id: '1',
    key: '1',
    label: 'Báo cáo tổng quan',
    title: 'Báo cáo tổng quan',
    icon: <AreaChartOutlined />,
    role: allRoles,
    // Đang ko biết làm nổi ko
    children: [
      {
        id: '1.1',
        key: '1.1',
        label: 'Phân tích tài chính',    // Xem riêng khoản thu/chi
        icon: <AreaChartOutlined />,
        role: allRoles,
      }
    ]
  },
  {
    id: '2',
    key: '2',
    label: 'Tiền mặt',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '3',
    key: '3',
    label: 'Tiền gửi',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '4',
    key: '4',
    label: 'Cơ sở vật chất',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '5',
    key: '5',
    label: 'Tài sản cố định',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '6',
    key: '6',
    label: 'Tiền lương',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '7',
    key: '7',
    label: 'Thuế',
    icon: <AreaChartOutlined />,
    role: allRoles,
    children: [
      {
        id: '7.1',
        key: '7.1',
        label: 'Các khoản thuế',    // Xem riêng khoản thu/chi
        icon: <AreaChartOutlined />,
        role: allRoles,
      }
    ]
  },
  {
    id: '8',
    key: '8',
    label: 'Giá thành',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '9',
    key: '9',
    label: 'Ngân sách',
    icon: <AreaChartOutlined />,
    role: allRoles,
    // Chia thành 2 tabs: Dự trù, Thực tế (2 tabs này nằm ngang hàng vs filter chọn khoảng thời gian)
    // children: [
    //   {
    //     id: '9.1',
    //     key: '9.1',
    //     label: 'Dự trù',    // Xem riêng khoản thu/chi
    //     icon: <AreaChartOutlined />,
    //     role: allRoles,
    //   }
    // ]
  },
  {
    id: '10',
    key: '10',
    label: 'Mua bán',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '11',
    key: '11',
    label: 'Khóa học',
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '12',
    key: '12',
    label: 'Chương trình chính quy',  // từ thiện, 
    icon: <AreaChartOutlined />,
    role: allRoles
  },
  {
    id: '12',
    key: '12',
    label: 'Chương trình khác',  // từ thiện, Tết, 20/10, Halloween,...
    icon: <AreaChartOutlined />,
    role: allRoles
  },
]