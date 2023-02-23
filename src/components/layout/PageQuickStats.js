import { Space } from 'antd'
import React from 'react'

function PageQuickStats(props) {
  const { listStats } = props

  return (
    <Space size='small'>
      {listStats?.map(stat => (
        <div style={{
          backgroundColor: stat?.bgColor,
          color: 'white'
        }}>
          <span style={{ fontSize: '160%' }}>
            {stat?.value}
          </span>
          <span>{stat?.label}</span>
        </div>
      ))}

    </Space>
  )
}

export default PageQuickStats