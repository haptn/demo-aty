import React, { useState } from 'react'
import { Button, Checkbox, Dropdown, Space, Tooltip } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import _ from 'lodash';

const DropdownItem = (props) => {
  const { value, checkedItems, onCheck } = props
  const countUncheckedItems = _.values(checkedItems)?.filter(item => !item)?.length

  const isChecked = value === 'Tất cả'
    ? countUncheckedItems === 0 : checkedItems[value]

  const isIndeterminate = value === 'Tất cả'
    && countUncheckedItems > 0
    && countUncheckedItems < _.values(checkedItems).length

  return (
    <Checkbox {...{
      checked: isChecked,
      indeterminate: isIndeterminate,
      onChange: e => onCheck({ value, checked: e?.target?.checked })
    }}>
      {value}
    </Checkbox>
  )
}

function DropdownCheckbox(props) {
  const {
    btnLabel, items = [],
    checkedItems = [], onCheck,
    classNames, ...rest
  } = props

  // const dropdownRef = useRef(null)
  // const [isOpen, setIsOpen] = useState(false)

  const customItems = () => {
    let newListItems = [
      {
        key: 'Tất cả',
        label: (
          <DropdownItem {...{
            value: 'Tất cả',
            checkedItems, onCheck,
          }} />
        ),
      },
      {
        type: 'divider',
      },
    ]

    newListItems = [
      ...newListItems,
      ...items?.map(value => ({
        key: value,
        label: (
          <DropdownItem {...{
            value, checkedItems, onCheck,
          }} />
        ),
        // disabled: checkedItems?.includes('all')
      }))
    ]

    return newListItems
  }

  const menuProps = {
    items: customItems(),
    // onClick: onCheck,    // don't know why it is triggered twice
  }

  return (
    <Dropdown {...{
      trigger: ['click'],
      menu: menuProps,
      className: classNames && clsx([...classNames]),
      // open: isOpen,
      // ko có props nào truyền ref nhỉ?
      ...rest
    }}>
      <Button
      // onClick={() => setIsOpen(true)}
      >
        <Tooltip>
          <Space size='small'>
            {btnLabel} <DownOutlined />
          </Space>
        </Tooltip>
      </Button>
    </Dropdown>
  )
}

export default DropdownCheckbox