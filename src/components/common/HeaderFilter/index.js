import React from 'react'
import { Select } from 'antd'
import clsx from 'clsx'
import styles from './HeaderFilter.module.scss'

function HeaderFilter(props) {
  const { style, dropdownStyle, classNames,
    children, dropdownRender, ...rest } = props

  return (
    <Select {...{
      dropdownRender: (menu) => dropdownRender(menu),
      style: style || { minWidth: 150, maxWidth: 250 },
      dropdownStyle: dropdownStyle || { minWidth: 250, },
      dropdownMatchSelectWidth: false,
      bordered: false,
      className: clsx(styles.header_filter, {
        [classNames]: !!classNames
      }),
      ...rest
    }}>
      {children}
    </Select>
  )
}

export default HeaderFilter