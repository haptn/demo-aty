import React, { useState } from 'react'
import { Col, Row, Select, Space } from 'antd'
import { AuditOutlined, BankOutlined } from '@ant-design/icons'
// import { GaugeChart } from '../../../components'
import styles from '../../../styles/pages/Budget.module.scss'
import { filterPeriodTypes } from '../../../config/constants'

const CategoryItem = ({ icon, label, ...rest }) => (
  <div className='flex flex-align-center my-1 see-more-category'
    {...rest}
  >
    {icon} {label}
  </div>
)

function OverviewTab() {
  const [filterPeriod, setFilterPeriod] = useState(filterPeriodTypes.THIS_MONTH)

  const iconStyles = {
    fontSize: 26, color: '#4f65df'
  }

  return (
    <div>
      <Space>
        <Select
          defaultActiveFirstOption
          value={filterPeriod}
          onChange={setFilterPeriod}
          placeholder='Số liệu của...'
          style={{ width: 150 }}
          options={[
            ...Object.values(filterPeriodTypes)?.map(item => ({
              value: item,
              label: item,
            }))
          ]}
        />

      </Space>

      <Row gutter={[16, 16]} className='mt-2'>
        <Col span={8} className={styles.chart_box}>
          <div>
            <img src='/charts/revenue-budget-gauge-chart.png' width={'100%'} />
          </div>
          {/* <GaugeChart {...{
            series: [76],
            title: 'Tình hình thực hiện doanh thu'
          }} /> */}
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div>
            <img src='/charts/cost-budget-gauge-chart.png' width={'100%'} />
          </div>
          {/* <GaugeChart {...{
            series: [76],
            title: 'Tình hình thực hiện chi phí'
          }} /> */}
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div>
            <img src='/charts/profit-budget-gauge-chart.png' width={'100%'} />
          </div>
          {/* <GaugeChart {...{
            series: [76],
            title: 'Tình hình thực hiện lợi nhuận'
          }} /> */}
        </Col>
        <Col span={12} className={styles.chart_box}>
          <div>
            <img src='/charts/revenue-budget-column-chart.png' width={'100%'} />
          </div>
          {/* <GaugeChart {...{
            series: [76],
            title: 'Tình hình thực hiện chi phí'
          }} /> */}
        </Col>
        <Col span={12} className={styles.chart_box}>
          <div>
            <img src='/charts/cost-budget-column-chart.png' width={'100%'} />
          </div>
          {/* <GaugeChart {...{
            series: [76],
            title: 'Tình hình thực hiện lợi nhuận'
          }} /> */}
        </Col>
      </Row>
    </div>
  )
}

export default OverviewTab