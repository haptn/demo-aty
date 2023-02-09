import React from 'react'
import clsx from 'clsx'
import { Button, Col, Row, Select, Space } from 'antd'
import { FilePdfOutlined } from '@ant-design/icons'

import { MainLayout } from '..'
import { filterPeriodTypes } from '../../config/constants'
import {
  Statistics,
  Summary,
  ReportCashFlow,
  ReportRevenue,
  ReportRevenueStream,
  ReportExpense,
  ReportExpenseCategory,
} from '../../components'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function DashboardLayout(props) {
  const { filterPeriod, onFilter, data } = props

  return (
    <MainLayout
      title="Báo cáo tổng quan"
      pageActions={
        <Space size='small'>
          <Select
            defaultActiveFirstOption  // sao nó ko tự chọn đc cái đầu tiên nhỉ?
            value={filterPeriod ?? filterPeriodTypes.THIS_MONTH}
            onChange={onFilter}
            placeholder='Số liệu của...'
            style={{ width: 150 }}
            options={[
              ...Object.values(filterPeriodTypes)?.map(item => ({
                value: item,
                label: item,
              }))
            ]}
          />

          <Button type="primary" icon={<FilePdfOutlined />}
            size='middle' className='p-btn'
          >
            Xuất PDF Báo cáo
          </Button>
        </Space>
      }
      hasBreadcrumb={false}
    >
      <Row gutter={[13, 13]} className='mt-2'>
        {/* Statistics */}
        <Col span={9}>
          <Statistics />
        </Col>

        {/* Summary */}
        <Col span={15} className={clsx('flex-1', styles.summary_box)}>
          <Summary />
        </Col>
      </Row>

      <Row gutter={[13, 13]} style={{ marginTop: '13px' }}>
        {/* Charts */}
        {/* Revenues (Incomes) */}
        <Col span={18} className={styles.chart_box}>
          <ReportRevenue />
        </Col>
        <Col span={6} className={styles.ranking_box}>
          <ReportRevenueStream />
        </Col>

        {/* Expenses */}
        <Col span={18} className={styles.chart_box}>
          <ReportExpense />
        </Col>
        <Col span={6} className={styles.ranking_box}>
          <ReportExpenseCategory />
        </Col>

        {/* ... */}
        <Col span={12} className={styles.chart_box}>
          <ReportCashFlow />
        </Col>
        <Col span={12} className={styles.chart_box}>
          <div />
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div />
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div />
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div />
        </Col>

        {/* <Col span={18}>
          <Row gutter={[13, 13]}>
            <Col span={12} className={styles.chart_box}>
              <ReportCashFlow />
            </Col>
            <Col span={12} className={styles.chart_box}>
              <div></div>
            </Col> */}
        {/* <Col span={12} className={styles.chart_box}>
              <div></div>
            </Col> */}
        {/* </Row>
        </Col> */}
        {/* <Col span={9} className={styles.chart_box}>
          <div></div>
        </Col> */}

        {/* <Col span={6} className={clsx('flex-1', styles.ranking_box)}>
          <div />
        </Col> */}
        {/* <Col span={9} className={styles.chart_box}>
          <div></div>
        </Col>
        <Col span={9} className={styles.chart_box}>
          <div></div>
        </Col>
        <Col span={6} className={styles.chart_box}>
          <div></div>
        </Col> */}
      </Row>
    </MainLayout>
  )
}

export default DashboardLayout