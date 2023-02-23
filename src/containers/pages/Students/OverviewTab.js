import React from 'react'
import { Col, Row } from 'antd'
import {
  BankOutlined, FileProtectOutlined, SkinOutlined
} from '@ant-design/icons'

const CategoryItem = ({ icon, label }) => (
  <div className='flex flex-align-center my-1'
    style={{
      width: '97.5%',
      padding: '1rem',
      border: '1.5px solid #4f65df',
      borderRadius: '6px',
      gap: '1rem'
    }}
  >
    {icon} {label}
  </div>
)

function OverviewTab() {
  const iconStyles = {
    fontSize: 26, color: '#4f65df'
  }
  const seeMoreCategories = [
    // {
    //   icon: <SolutionOutlined style={iconStyles} />,
    //   label: 'Danh sách Học viên'
    // },
    {
      icon: <FileProtectOutlined style={iconStyles} />,
      label: 'Quy định BHYT, BHTN'
    },
    {
      icon: <SkinOutlined style={iconStyles} />,
      label: 'Bảng giá đồng phục'
    },
    {
      icon: <BankOutlined style={iconStyles} />,
      label: 'Bảng giá bán trú, nội trú'
    },
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
          <small>(1 số cái tương tự Dashboard)</small>
          <ul style={{ listStyle: 'inside' }}>
            Dạng bảng hoặc biểu đồ thể hiện:
            <li>Tổng số học viên từng tháng, so sánh giữa các cơ sở hoặc các chương trình</li>
            <li>Xếp hạng trường/chương trình có nhiều học viên nhất / học phí cao nhất</li>
            <li>Số dư / tổng thu kì trước, số dư / tổng thu của kì này</li>
            <li>Tổng học phí, tiền bảo hiểm (bắt buộc, tự nguyện) đã đóng trong tháng/kỳ/năm</li>
          </ul>
        </i>
        {/* <div style={{ borderTop: '1px solid #CCC' }}>
        </div> */}
      </Col>
      <Col span={6}>
        <h3>Xem thêm</h3>

        {seeMoreCategories?.map(({ icon, label }) => (
          <CategoryItem {...{ key: label, icon, label }} />
        ))}
      </Col>
    </Row>
  )
}

export default OverviewTab