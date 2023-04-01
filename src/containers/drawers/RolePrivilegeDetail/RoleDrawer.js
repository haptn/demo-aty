import React from 'react'
import { Button, theme } from 'antd'
import Drawer from '../Drawer'
import { RoleTab } from '.'

function RoleDrawer(props) {
  const { token } = theme.useToken()
  const { data, mode, open, setOpen } = props

  const handleSave = () => {
    // Do something here
    setOpen(mode, false)
  }

  const Footer = () => (
    <div className='flex flex-between'>
      <Button type='default' onClick={() => setOpen(mode, false)}>
        Hủy
      </Button>
      <Button type='primary' onClick={handleSave}
        style={{ backgroundColor: token.colorSuccessActive }}
      >
        Lưu
      </Button>
    </div >
  )

  return (
    <Drawer width={800}
      title={`${mode === 'add' ? 'Thêm' : 'Thông tin'} vai trò`}
      open={open}
      onClose={() => setOpen(mode, false)}
      onSave={handleSave}
      footer={<Footer />}
    >
      <RoleTab {...{ data }} />

      {/* <Tabs
        defaultActiveKey="1"
        onChange={() => { }}
        items={[
          {
            label: 'Vai trò',
            key: '1',
            children: <RoleTab {...{ data }} />,
          },
          {
            label: 'Quyền hạn',
            key: '2',
            children: <PrivilegeTab {...{ data }} />,
          },
        ]}
      /> */}
    </Drawer>
  )
}

export default RoleDrawer    // RolePrivilegeDrawer