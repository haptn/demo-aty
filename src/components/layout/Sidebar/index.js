import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import clsx from 'clsx'
import { Menu, Layout } from 'antd'
import { LogoNoBgImg } from '../../../assets'
import { menuItems } from '../../../mock/data'
import { getLocal } from '../../../utils/storage'
import { keys } from '../../../config/constants'
import styles from './Sidebar.module.scss'

const { Sider } = Layout

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const user = getLocal(keys.USER)

  const menu = useMemo(() => {
    return _
      .filter(menuItems, item => item?.role?.includes(user?.role))
      .map(({ key, label, icon }) => ({ key, label, icon }))
  }, [user])

  const handleChangeMenu = target => {
    navigate(target?.key)
  }

  return (
    <Sider collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={styles.sider}
      theme="light"
    >
      <div
        className={clsx('w-100 flex-center px-1 py-1', styles.logo_box, {
          [styles.expanded]: !collapsed
        })}
        onClick={() => navigate('/')}
      >
        <img src={LogoNoBgImg} alt='logo' />
      </div>
      <Menu mode="inline"
        items={menu}
        defaultSelectedKeys={[pathname]}
        onClick={handleChangeMenu}
        className={styles.menu_box}
      />
    </Sider>
  )
}

export default Sidebar