import React from 'react'
import { Col, Row } from 'antd'
import { FallOutlined, CoffeeOutlined } from '@ant-design/icons'

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
      icon: <FallOutlined style={iconStyles} />,
      label: 'Quy định về khấu hao'
    },
    // {
    //   icon: <CoffeeOutlined style={iconStyles} />,
    //   label: 'Quy định tài trợ thi chứng chỉ'
    // },
    // {
    //   icon: <CoffeeOutlined style={iconStyles} />,
    //   label: 'Quy định tạm ứng, thanh toán tạm ứng'
    // },
    // {
    //   icon: <AuditOutlined style={iconStyles} />,
    //   label: 'Hệ thống thang bảng lương'
    // },
    // {
    //   icon: <AuditOutlined style={iconStyles} />,
    //   label: 'Biểu thuế TNCN'
    // },
  ]

  return (
    <Row gutter={[20, 20]}>
      <Col span={18}>
        <h3>Báo cáo</h3>

        <i>
          Dạng bảng hoặc biểu đồ thể hiện tổng thu/chi cho các hoạt động mua bán CSVC, TSCĐ, DCTB.
          <br /><br />
          Thống kê nhanh: Số dư đầu kì, Tổng thu, Tổng chi
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