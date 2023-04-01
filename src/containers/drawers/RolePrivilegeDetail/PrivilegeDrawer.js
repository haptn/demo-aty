import React, { useState } from 'react'
import clsx from 'clsx'
import { Button, Tabs, theme } from 'antd'
import {
  CheckOutlined, CloseOutlined, MinusOutlined
} from '@ant-design/icons'
import Drawer from '../Drawer'
import { PrivilegeTab } from '.'
import styles from '../Drawer.module.scss'

function PrivilegeDrawer(props) {
  const { token } = theme.useToken()
  const { data, open, setOpen } = props

  const [tab, setTab] = useState('1')
  const [checkAll, setCheckAll] = useState({
    '1': {
      all: 2,
      // status 'checkAll' of each table (Ex: all_0, all_1,...)
    },
    '2': {
      all: 1,
      // status 'checkAll' of each table (Ex: all_0, all_1,...)
    },
    '3': {
      all: 1,
      // status 'checkAll' of each table (Ex: all_0, all_1,...)
    },
    '4': {
      all: 0,
      // status 'checkAll' of each table (Ex: all_0, all_1,...)
    },
    '5': {
      all: 0,
      // status 'checkAll' of each table (Ex: all_0, all_1,...)
    },
  })

  const handleSave = () => {
    // Do something here
    setOpen(false)
  }

  const Footer = () => (
    <div className='flex flex-between'>
      <Button type='default' onClick={() => setOpen(false)}>
        Hủy
      </Button>
      <Button type='primary' onClick={handleSave}
        style={{ backgroundColor: token.colorSuccessActive }}
      >
        Lưu
      </Button>
    </div >
  )

  // checkStatus: {0: ko có quyền, 1: quyền hạn chế, 2: toàn quyền}
  const TabLabel = ({ label, checkStatus }) => {
    const iconStyles = {
      fontSize: '1.5rem',
      strokeWidth: 40,
      stroke: token.colorSuccessActive,
      color: token.colorSuccessActive
    }

    return (
      <div className='flex flex-between' style={{ minWidth: '12rem' }}>
        {label}
        {checkStatus === 2
          ? <CheckOutlined style={iconStyles} />
          : checkStatus === 1
            ? <MinusOutlined style={iconStyles} />
            : <CloseOutlined style={iconStyles} />
        }
      </div>
    )
  }

  return (
    <Drawer width={'100vw'}
      title={`Thiết lập quyền cho vai trò ${data?.name}`}
      open={open}
      onClose={() => setOpen(false)}
      onSave={handleSave}
      footer={<Footer />}
    >
      <Tabs
        tabPosition='left'
        defaultActiveKey="1"
        activeKey={tab}
        onChange={newTab => setTab(newTab)}
        items={[
          {
            label: <TabLabel label={'Danh mục'}
              checkStatus={checkAll['1'].all}
            />,
            key: '1',
            children: <PrivilegeTab {...{
              tab, data, checkAll, setCheckAll
            }} />,
          },
          {
            label: <TabLabel label={'Nghiệp vụ'}
              checkStatus={checkAll['2'].all}
            />,
            key: '2',
            children: <PrivilegeTab {...{
              tab, data, checkAll, setCheckAll
            }} />,
          },
          {
            label: <TabLabel label={'Báo cáo'}
              checkStatus={checkAll['3'].all}
            />,
            key: '3',
            children: <PrivilegeTab {...{
              tab, data, checkAll, setCheckAll
            }} />,
          },
          {
            label: <TabLabel label={'Hệ thống'}
              checkStatus={checkAll['4'].all}
            />,
            key: '4',
            children: <PrivilegeTab {...{
              tab, data, checkAll, setCheckAll
            }} />,
          },
          {
            label: <TabLabel label={'Tiện ích'}
              checkStatus={checkAll['5'].all}
            />,
            key: '5',
            children: <PrivilegeTab {...{
              tab, data, checkAll, setCheckAll
            }} />,
          },
        ]}
        className={clsx(styles.tab, styles.left)}
      />
    </Drawer>
  )
}

export default PrivilegeDrawer