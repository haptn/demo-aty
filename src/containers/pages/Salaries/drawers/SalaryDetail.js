import React from 'react'
import { Drawer } from '../../..'

function SalaryDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }

  return (
    <Drawer title={`Phiếu lương chi tiết __ ${data?.name}`}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, salary: false }))}
      onSave={handleSave}
    >

    </Drawer>
  )
}

export default SalaryDetail