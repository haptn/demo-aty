import React from 'react'
import { Button, Select, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { filterPeriodTypes } from '../../config/constants'
import styles from '../../styles/pages/DashboardLayout.module.scss'
import clsx from 'clsx'

function BoxHeader(props) {
  const {
    title,
    filterPeriod, additionalFilters,
    onFilter, onRefresh,
    totalValues, isShowUnit = true
  } = props

  return (
    <div id='box-header'>
      {/* Title, filter & btnRefresh */}
      <div className='flex flex-between'>
        <h3>{title}</h3>
        <div className='flex' >
          {/* Filter */}
          {
            additionalFilters
            && additionalFilters?.position === 'left'
            && additionalFilters?.component
          }

          {filterPeriod && (
            <Select
              defaultActiveFirstOption  // sao nó ko tự chọn đc cái đầu tiên nhỉ?
              value={filterPeriod}
              onChange={onFilter}
              placeholder='Số liệu của...'
              options={[
                ...Object.values(filterPeriodTypes)?.map(item => ({
                  value: item,
                  label: item,
                }))
              ]}
              bordered={false}
              placement='bottomRight'
              style={{ width: 'fit-content' }}
              dropdownStyle={{ width: 160 }}
              dropdownMatchSelectWidth={false}
            />
          )}

          {/* BtnReset */}
          <Button
            type='text' shape='circle'
            icon={<ReloadOutlined />}
            onClick={onRefresh}
          />
        </div>
      </div>

      {/* Total values & unit */}
      <div className='flex flex-between mr-1'>
        {
          additionalFilters
          && additionalFilters?.position === 'below-title'
          && additionalFilters?.component
        }

        {(totalValues && totalValues?.length > 0) && (
          <div className={styles.dashboard__total_values}>
            {totalValues?.map((item, idx) => (
              <div key={idx}
                className={clsx('flex-col', styles.dashboard__total)}
              >
                <div>
                  <b>{item?.value}</b>
                  <span className={styles.dashboard__total_unit}>
                    {' '}
                    {item?.unit ?? (item?.unit || 'Triệu đồng')}
                    {/* undefined ?? '' || 'Triệu đồng'  */}
                  </span>
                </div>
                <span className={styles.dashboard__total_label}>
                  {item?.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {isShowUnit && (
          <span className={styles.dashboard__unit}>
            {'Đvt: Triệu đồng'}
          </span>
        )}
      </div>
    </div>
  )
}

export default BoxHeader