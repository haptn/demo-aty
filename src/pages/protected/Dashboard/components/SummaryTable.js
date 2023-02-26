import React from 'react'
import clsx from 'clsx'
import { formatNumber } from '../../../../utils/format'
import styles from '../../../../styles/pages/Dashboard.module.scss'

function SummaryTable({ data }) {
  const formatValue = value => formatNumber((value / Math.pow(10, 6)).toFixed(2))

  return (
    <>
      <div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span className={styles.parent}>
            {'Tổng tiền'}
          </span>
          <b className={styles.parent}>
            {formatValue(1234567000)}
          </b>
        </div>
        <div className={clsx('flex flex-between',
          styles.summary__item, styles.child
        )}>
          <span>{'Tiền mặt'}</span>
          <b>{formatValue(1234567000)}</b>
        </div>
        <div className={clsx('flex flex-between',
          styles.summary__item, styles.child
        )}>
          <span>{'Tiền gửi'}</span>
          <b>{formatValue(1234567000)}</b>
        </div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span>{'Dự toán'}</span>
          <b>{formatValue(0)}</b>
        </div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span>{'Quỹ'}</span>
          <b>{formatValue(0)}</b>
        </div>
      </div>

      <div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span className={styles.parent}>
            {'Doanh thu'}
          </span>
          <b className={styles.parent}>
            {formatValue(0)}
          </b>
        </div>
        <div className={clsx('flex flex-between',
          styles.summary__item, styles.child
        )}>
          <span>{'Chương trình ngắn hạn'}</span>
          <b>{formatValue(0)}</b>
        </div>
        <div className={clsx('flex flex-between',
          styles.summary__item, styles.child
        )}>
          <span>{'Trường phổ thông'}</span>
          <b>{formatValue(0)}</b>
        </div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span>{'CHI PHÍ'}</span>
          <b>{formatValue(0)}</b>
        </div>
        <div className={clsx('flex flex-between', styles.summary__item)}>
          <span>{'LỢI NHUẬN'}</span>
          <b>{formatValue(0)}</b>
        </div>
        {/* <div className={clsx('flex flex-between', styles.summary__item)}>
            <span>{'Tồn quỹ'}</span>
            <b>{formatValue(0)}</b>
          </div>
          <div className={clsx('flex flex-between', styles.summary__item)}>
            <span>{'Lỗ'}</span>
            <b>{formatValue(0)}</b>
          </div> */}
      </div>
    </>
  )
}

export default SummaryTable