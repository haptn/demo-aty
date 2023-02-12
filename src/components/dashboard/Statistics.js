import { Col, Row } from 'antd'
import React from 'react'
import StatisticsBlock from './StatisticsBlock'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function Statistics() {
  // Call API get statistics (array)

  return (
    <Row gutter={[13, 13]}>
      <Col span={12} className={styles.statistics_box}>
        <StatisticsBlock {...{
          title: 'doanh thu',
          icon: 'https://cdn-icons-png.flaticon.com/512/1420/1420439.png',
          period: 'Tháng 2/2023',
          values: {
            type: 'money',
            previous: 345567000,
            current: 567789000
          }
        }} />
      </Col>
      <Col span={12} className={styles.statistics_box}>
        <StatisticsBlock {...{
          title: 'lợi nhuận',
          icon: 'https://icon-library.com/images/revenue-icon/revenue-icon-22.jpg',
          period: 'Tháng 2/2023',
          values: {
            type: 'money',
            previous: 234456000,
            current: 389123000
          }
        }} />
      </Col>
      <Col span={12} className={styles.statistics_box}>
        <StatisticsBlock {...{
          title: 'chương trình',
          icon: 'https://cdn-icons-png.flaticon.com/512/2686/2686222.png',
          period: 'Tháng 2/2023',
          values: {
            type: 'number',
            previous: 9,
            current: 6
          }
        }} />
      </Col>
      <Col span={12} className={styles.statistics_box}>
        <StatisticsBlock {...{
          title: 'học viên',
          icon: 'https://icon-library.com/images/community-icon-png/community-icon-png-4.jpg',
          period: 'Tháng 2/2023',
          values: {
            type: 'number',
            previous: 456,
            current: 234
          }
        }} />
      </Col>
    </Row>
  )
}

export default React.memo(Statistics)