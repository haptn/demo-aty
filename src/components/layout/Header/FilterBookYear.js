import React, { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Space, Tooltip } from 'antd'
import HeaderFilter from '../../common/HeaderFilter'

function FilterBookYear() {
  const [items, setItems] = useState(['2022', '2023'])
  const [name, setName] = useState('')
  const inputRef = useRef(null)

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `Sổ năm ${(new Date().getFullYear()) + 1}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <HeaderFilter {...{
      options: items.map(item => ({
        value: item,
        label: item
      })),
      placeholder: 'Sổ năm...',
      defaultValue: `${new Date().getFullYear()}`,
      dropdownRender: menu => (
        <div style={{ padding: '4px 4px 0' }}>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 0 4px' }}>
            <Input
              placeholder="Năm..."
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Tooltip title='Thêm sổ mới'>
              <Button type="text" icon={<PlusOutlined />} onClick={addItem} />
            </Tooltip>
          </Space>
        </div>
      ),
      style: { minWidth: 80 },
      dropdownStyle: { minWidth: 120, maxWidth: 150 }
    }} />
  )
}

export default FilterBookYear