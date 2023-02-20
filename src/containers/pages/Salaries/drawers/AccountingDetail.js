import React from 'react'
import { Drawer } from '../../..'

function AccountingDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }

  return (
    <Drawer title={data?.name}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, accounting: false }))}
      onSave={handleSave}
      width={'calc(100% - 200px)'}
    >

    </Drawer>
  )
}

export default AccountingDetail