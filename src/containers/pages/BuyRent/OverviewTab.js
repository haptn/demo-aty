import React from 'react'
import { Col, Row } from 'antd'
import { CodeSandboxOutlined, ShopOutlined } from '@ant-design/icons'

const CategoryItem = ({ icon, label, ...rest }) => (
  <div className='flex flex-align-center my-1 see-more-category'
    {...rest}
  >
    {icon} {label}
  </div>
)

function OverviewTab() {
  const iconStyles = {
    fontSize: 26, color: '#4f65df'
  }
  const seeMoreCategories = [
    {
      icon: <CodeSandboxOutlined style={iconStyles} />,
      label: 'Danh mục hàng hóa, dịch vụ'
    },
    {
      icon: <ShopOutlined style={iconStyles} />,
      label: 'Danh mục nhà cung cấp'
    },
  ]

  return (
    <Row gutter={[20, 20]}>
      <Col span={18}>
        <h3>Báo cáo</h3>

        <i>
          Dạng bảng hoặc biểu đồ thể hiện tổng tiền đã chi để mua hàng hoặc thuê mướn thiết bị, địa điểm...
          <br />
          Báo cáo phân theo loại hàng hóa, dịch vụ, theo 2 nhóm mua và thuê,...
          <br /><br />
          Thống kê nhanh: Số dư đầu kì, Tổng chi
        </i>
      </Col>
      <Col span={6}>
        <h3>Xem thêm</h3>

        {seeMoreCategories?.map(({ icon, label }) => (
          <CategoryItem {...{
            key: label, icon, label,
            onClick: () => { }
          }} />
        ))}
      </Col>
    </Row>
  )
}

export default OverviewTab