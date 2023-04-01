import React from 'react'
import clsx from 'clsx'
import { Button, Drawer as AntdDrawers, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './Drawer.module.scss'

function Drawer(props) {
  const {
    width = 640,
    height = '100%',
    placement = 'right',
    closable = false,
    onClose,
    children, className,
    hasTabs,
    ...rest
  } = props

  return (
    <AntdDrawers {...{
      ...rest,
      width, height, placement,
      closable, onClose,
      className: clsx(styles.drawer, {
        [className]: className,
        [styles.noYPadding]: !!hasTabs
      }),
      extra: (
        <Space size='small'>
          {/* <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" className='btn-success' onClick={onClose}>
            Lưu
          </Button> */}
          <Button type="text"
            shape='circle'
            icon={<CloseOutlined style={{ color: '#fafafa', strokeWidth: 10, stroke: 'white' }} />}
            onClick={onClose}
          />
        </Space>
      )
    }}>
      {children}
    </AntdDrawers>
  )
}

export default Drawer