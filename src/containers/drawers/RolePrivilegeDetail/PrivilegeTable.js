import React from 'react'
import { Collapse, Space, Switch, Table, theme } from 'antd'
import styles from '../Drawer.module.scss'

const { Panel } = Collapse

function PrivilegeTable(props) {
  const { token } = theme.useToken()
  const {
    header, data = [], columns = [],
    tab, idx, checkAll, handleCheck
  } = props

  const SwitchAll = () => (
    <Space size='small'
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    >
      <Switch
        defaultChecked={tab == '1'}
        checked={checkAll[tab][`all_${idx}`]}
        onChange={status => handleCheck(`all_${idx}`, status)}
      />
      Toàn quyền
    </Space>
  )

  return (
    <Collapse
      defaultActiveKey={idx === 0 ? ['1'] : []}
      // onChange={onChange}
      expandIconPosition='end'
      style={{ backgroundColor: token.colorBgTextHover }}
    >
      <Panel {...{
        key: '1',
        header: <h4>{header}</h4>,
        extra: <SwitchAll />,
        className: styles.panel
      }}
      >
        <Table {...{
          columns,
          dataSource: data,
          size: 'small',
          bordered: true,
          pagination: false
        }} />
      </Panel>
    </Collapse>
  )
}

export default PrivilegeTable