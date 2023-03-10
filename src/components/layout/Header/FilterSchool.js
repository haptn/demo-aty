import React from 'react'
import { Divider, Input, Space, Spin } from 'antd'
import { HeaderFilter } from '../..'
import { useListSchools } from '../../../services/schoolServices'

function FilterSchool() {
  const { data = [], isFetching } = useListSchools(undefined, { isCustom: true })
  const options = [
    {
      value: 'all',
      label: 'Tất cả cơ sở',
    },
    ...data
  ]

  return (
    <HeaderFilter {...{
      // allowClear: true,
      options,
      placeholder: 'Chọn Cơ sở',
      defaultValue: options[0],
      dropdownRender: menu => (
        <>
          <Space style={{ padding: '4px 4px 0' }}>
            <Input.Search
              placeholder="Tìm cơ sở"
              allowClear
              onSearch={() => { }}
            />
            {/* <Input
              placeholder="Tìm cơ sở"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<SearchOutlined />} onClick={addItem}>
              Tìm kiếm
            </Button> */}
          </Space>
          <Divider
            style={{ margin: '8px 0' }}
          />
          <Spin spinning={isFetching}>
            <div style={{ padding: '0 4px 4px' }}>
              {menu}
            </div>
          </Spin>
        </>
      )
    }} />
  )
}

export default FilterSchool