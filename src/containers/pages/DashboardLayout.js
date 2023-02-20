import React from 'react'
import clsx from 'clsx'
import { Button, Col, Row, Select, Space } from 'antd'
import { FilePdfOutlined } from '@ant-design/icons'

import { MainLayout } from '..'
import { filterPeriodTypes } from '../../config/constants'
import { useAuth } from '../../hooks'
import {
  Statistics,
  Summary,
  ReportRevenue,
  ReportRevenueStream,
  ReportExpense,
  ReportExpenseCategory,
  ReportCashFlowMixed,
  ReportCashFlowSankey,
  ReportBizPerformance,
  ReportBestSellingCourses,
} from '../../components'
import styles from '../../styles/pages/Dashboard.module.scss'

function DashboardLayout(props) {
  const { filterPeriod, onFilter, data } = props
  // const { isAdmin, isSchoolAdmin } = useAuth()    // check tùy vào userRole thì show charts phù hợp

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
        <Col span={17} className={styles.chart_box}>
          <ReportRevenue />
        </Col>
        <Col span={7} className={styles.chart_box}>
          <ReportRevenueStream />
        </Col>

        {/* Expenses */}
        <Col span={17} className={styles.chart_box}>
          <ReportExpense />
        </Col>
        <Col span={7} className={styles.chart_box}>
          <ReportExpenseCategory />
        </Col>

        {/* Cash Flow (ver (1) Mixed chart) */}
        <Col span={12} className={styles.chart_box}>
          <ReportCashFlowMixed />
        </Col>

        {/* Cash Flow (ver (2) Sankey chart) */}
        <Col span={12} className={styles.chart_box}>
          <ReportCashFlowSankey />
        </Col>

        {/* Business Performance */}
        <Col span={12} className={styles.chart_box}>
          <ReportBizPerformance />
        </Col>

        {/* Best-selling courses */}
        <Col span={12} className={styles.chart_box}>
          <ReportBestSellingCourses />
        </Col>
        {/* <Col span={8} className={styles.chart_box}>
          <div />
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div />
        </Col>
        <Col span={8} className={styles.chart_box}>
          <div />
        </Col> */}

        {/* <Col span={18}>
          <Row gutter={[13, 13]}>
            <Col span={12} className={styles.chart_box}>
              <ReportCashFlowMixed />
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