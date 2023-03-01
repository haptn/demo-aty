import React from 'react'
import { Col, Row } from 'antd'
import { AuditOutlined, ExceptionOutlined, FileDoneOutlined, FileProtectOutlined } from '@ant-design/icons'

const CategoryItem = ({ icon, label, ...rest }) => (
  <div className='flex flex-align-center my-1 see-more-category'
    {...rest}
  >
    {icon} {label}
  </div>
)

function OverviewTab({ setOpenModal }) {
  const iconStyles = {
    fontSize: 26, color: '#4f65df'
  }
  const seeMoreCategories = [
    {
      icon: <FileProtectOutlined style={iconStyles} />,
      label: 'Quy định Lương, Bảo hiểm, Thuế TNCN'
    },
    {
      icon: <FileDoneOutlined style={iconStyles} />,
      label: 'Quy định Thưởng, Phụ cấp, Trợ cấp'
    },
    {
      icon: <FileDoneOutlined style={iconStyles} />,
      label: 'Quy định tài trợ thi chứng chỉ'
    },
    {
      icon: <ExceptionOutlined style={iconStyles} />,
      label: 'Quy định tạm ứng, thanh toán tạm ứng'
    },
    {
      icon: <AuditOutlined style={iconStyles} />,
      label: 'Hệ thống thang bảng lương'
    },
    {
      icon: <AuditOutlined style={iconStyles} />,
      label: 'Biểu thuế TNCN'
    },
  ]

  return (
    <Row gutter={[20, 20]}>
      <Col span={18}>
        <h3>Báo cáo</h3>

        <i>
          Dạng bảng hoặc biểu đồ thể hiện mức lương từng tháng (xem theo cơ sở, phòng ban,...).
          <br /><br />
          Thống kê nhanh: Số dư đầu kì, Tổng nhân sự, Tổng chi lương
        </i>
        {/* <div style={{ borderTop: '1px solid #CCC' }}> */}
        {/* </div> */}
      </Col>
      <Col span={6}>
        <h3>Xem thêm</h3>

        {seeMoreCategories?.map(({ icon, label }) => (
          <CategoryItem {...{
            key: label, icon, label,
            onClick: label === 'Quy định Lương, Bảo hiểm, Thuế TNCN'
              ? () => setOpenModal(prev => ({ ...prev, rules: true }))
              : () => { }
          }} />
        ))}
      </Col>
    </Row>
  )
}

export default OverviewTab