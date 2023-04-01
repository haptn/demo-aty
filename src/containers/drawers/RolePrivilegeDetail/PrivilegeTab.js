import React, { useEffect } from 'react'
import { Checkbox, Input, Space, Switch } from 'antd'
import PrivilegeTable from './PrivilegeTable'
import { listPrivileges } from '../../../mock/data'

function PrivilegeTab(props) {
  const { tab, data, checkAll, setCheckAll } = props

  const handleCheck = (type, status) => {
    console.log('status', status)

    setCheckAll(prev => {
      const clone = { ...prev }

      if (type === 'all') {
        clone[tab][type] = status ? 2 : 0
        listPrivileges[tab].forEach((_, idx) => {
          clone[tab][`all_${idx}`] = status
        });
      }
      else
        clone[tab][type] = status

      return clone
    })
  }

  return (
    <>
      <div className='flex flex-between'>
        <Space size='small'>
          <Switch defaultChecked={checkAll[tab].all === 2}
            onChange={status => handleCheck('all', status)}
          />
          Có toàn quyền trên tất cả danh mục
        </Space>

        <Input.Search
          placeholder="Tìm kiếm"
          allowClear enterButton
          style={{ width: 250 }}
        />
      </div>

      <Space direction="vertical" size='middle' className='w-100 mt-2'>
        {listPrivileges[tab]?.map((item, idx) => (
          <PrivilegeTable {...{
            ...item,
            key: idx, idx, tab,
            checkAll, handleCheck
          }} />
        ))}

      </Space>
    </>
  )
}

export default PrivilegeTab