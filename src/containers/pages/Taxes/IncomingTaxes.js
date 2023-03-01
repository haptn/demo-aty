import React from 'react'
import { Button } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'

// const listIncomingTaxes = [

// ]

function IncomingTaxes() {

  return (
    <div className='p-2 bg-white border-r-1'>
      {/* {listIncomingTaxes?.map(tax => ( */}
      <div>   {/*  key={tax?.id} */}
        <h3 style={{ marginBottom: 10 }}>Tờ khai cần lập tháng này</h3>
        <ul>
          <li>
            <CheckCircleFilled style={{ opacity: .33, marginRight: 5 }} /> 01/GTGT - Tờ khai thuế GTGT khấu trừ
            <br />
            <Button type='link'>
              <div style={{ marginLeft: 22 }}>Sửa tờ khai</div>
            </Button>
          </li>
        </ul>
      </div>

      <div>
        <h3 style={{ marginBottom: 10 }}>Tờ khai cần lập năm này</h3>
        <ul>
          <li>
            <CheckCircleFilled style={{ opacity: .33, marginRight: 5 }} /> 03/TNDN - Tờ khai quyết toán thuế TNDN
            <br />
            <Button type='link'>
              <div style={{ marginLeft: 22 }}>Lập tờ khai</div>
            </Button>
          </li>
        </ul>

      </div>
      {/* ))} */}
    </div>
  )
}

export default IncomingTaxes