import React from 'react'
import { Col, Row } from 'antd'
import { AuditOutlined, BankOutlined } from '@ant-design/icons'

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
      icon: <AuditOutlined style={iconStyles} />,
      label: 'Danh mục các loại thuế'
    },
    {
      icon: <BankOutlined style={iconStyles} />,
      label: 'Thông tin các cơ quan thuế'
    },
  ]

  return (
    <Row gutter={[20, 20]}>
      <Col span={18}>
        <h3>Báo cáo</h3>

        <i>
          Dạng bảng hoặc biểu đồ thể hiện tổng tiền đã đóng thuế và các hoạt động liên quan...
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