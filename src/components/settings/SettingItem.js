import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SettingItem(props) {
  const { title = '', list = [] } = props

  return (
    <div className=''>
      <h4>{title}</h4>

      <ul>
        {list?.length > 0 && list?.map(item => (
          <li key={item?.id}>
            <Button type='link'
              title={item?.description}
            >
              <Link to={item?.pathName}>{item?.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SettingItem