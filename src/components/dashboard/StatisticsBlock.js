import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Avatar, Space } from 'antd'
import { formatMoneyReport, formatNumber } from '../../utils/format'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function StatisticsBlock(props) {
  const { title, icon, period, values } = props
  const { previous, current, type } = values

  const changes = useMemo(() => {
    return ((current - previous) / previous) * 100
  }, [previous, current])

  // get filter type in DashboardContext

  // const label = isCurrent => {
  //   switch (filterPeriod) {
  //     case filterPeriodTypes.THIS_MONTH:

  //       break;

  //     default:
  //       break;
  //   }
  // }

  const formatValue = value => {
    switch (type) {
      case 'money':
        return formatMoneyReport(value)

      default:
        return formatNumber(value)
    }
  }

  return (
    <div className={styles.statistics}>
      {/* Header (title, period, changes) */}
      <div className='flex flex-between'>
        <Space size='small' className={styles.statistics__head}>
          <Avatar src={icon} className={styles.statistics__icon} />
          <div className='flex-col'>
            <h3>{title}</h3>
            <small>{period}</small>
          </div>
        </Space>

        {changes > 0 ? (
          <span className={clsx(styles.statistics__changes, styles['statistics__changes--up'])}>
            +{changes.toFixed(1)}%▲
          </span>
        ) : (
          <span className={clsx(styles.statistics__changes, styles['statistics__changes--down'])}>
            {changes.toFixed(1)}%▼
          </span>
        )}
      </div>

      {/* Values */}
      <div className={styles.statistics__values}>
        <div className='flex-col'>
          <small>
            {'Kỳ trước'}  {/* Giờ để tạm thế này, sau này sẽ viết thêm 1 hàm getLabel dựa vào giá trị filter đc chọn => Tăng UX */}
          </small>
          <span className={styles.statistics__value}>
            {formatValue(previous)}
          </span>
        </div>
        <div className='flex-col'>
          <small>
            {'Kỳ này'}
          </small>
          <span className={clsx(styles.statistics__value, styles.current)}>
            {formatValue(current)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatisticsBlock