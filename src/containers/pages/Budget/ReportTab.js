import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Empty, theme } from 'antd'

import { listSavedReports } from '../../../mock/data'
import { getLocal, setLocal } from '../../../utils/storage'
import { budgetType } from '../../../config/constants'
// import { GaugeChart } from '../../../components'
import { PageHeader } from '../../../components'

const ListReports = ({ data, type }) => (
  <ul style={{ margin: 0, listStyle: 'inside' }}>
    {(data && data?.length > 0)
      ? data?.map((item, index) => (
        <li key={item?.id}
          style={{
            width: '50%',
            padding: '.5rem .25rem',
            // borderTop: index > 0 ? '1px solid #D9D9D9' : 'none'
          }}
        >
          <Link to={`/budget/practical?type=${type}&year=${item?.year}`}>
            {item?.name}
          </Link>
        </li>
      )) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ margin: '1rem 0' }}
        />
      )
    }
  </ul>
)

function ReportTab() {
  // const [filterPeriod, setFilterPeriod] = useState(filterPeriodTypes.THIS_MONTH)
  // const { token } = theme.useToken()
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    if (!getLocal('save_reports'))
      setLocal('save_reports', listSavedReports)
  }, [])

  return (
    <>
      <PageHeader
        title='Báo cáo đã lưu'
        hasSearchSameRow
        pageSearchProps={{
          value: searchKeyword,
          placeholder: 'Tìm theo tên báo cáo',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        <Collapse
          defaultActiveKey={Object.values(budgetType)}
        // className='my-collapse'
        // style={{ background: 'none', border: 'none' }}
        >
          {Object.values(budgetType)?.map(type => (
            <Collapse.Panel key={type} header={type}
              style={{
                // marginBottom: '1rem',
                // background: token.colorBgTextHover,
                // borderRadius: token.borderRadius,
                // border: 'none',
              }}
            >
              {/* <Spin spinning={isLoading}> */}
              <ListReports {...{
                type,
                data: getLocal('save_reports')?.filter(item => item?.type === type),
              }} />
              {/* </Spin> */}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}

export default ReportTab