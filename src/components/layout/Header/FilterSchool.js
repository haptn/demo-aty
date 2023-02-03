import React from 'react'
import { Divider, Input, Space } from 'antd'
import { HeaderFilter } from '../..'
import { useSchools } from '../../../services'

function FilterSchool() {
  const { data } = useSchools().getList

  return (
    <HeaderFilter {...{
      allowClear: true,
      options: !data ? [] : data?.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
      placeholder: 'Cơ sở',
      defaultValue: 'Tất cả cơ sở',
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
          <div style={{ padding: '0 4px 4px' }}>
            {menu}
          </div>
        </>
      )
    }} />
  )
}

export default FilterSchool