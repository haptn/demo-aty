import React from 'react'
import Drawer from '../Drawer'

function AccountDetailDrawer({ open, setOpen }) {
  const handleSave = () => {
    setOpen(false)
  }

  return (
    <Drawer title="Thông tin tài khoản" 
      open={open}
      onClose={() => setOpen(false)}
      onSave={handleSave}
    >
      
    </Drawer>
  )
}

export default AccountDetailDrawer