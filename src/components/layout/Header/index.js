import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Avatar, Badge, Dropdown, Layout, List, Popover, Space } from 'antd'
import { BellOutlined } from '@ant-design/icons'

import { NewLogoImg } from '../../../assets'
import { listNoti, userMenuItems } from '../../../mock/data'
import { getLocal, removeLocal } from '../../../utils/storage'
import { routes } from '../../../config/path'
import { keys } from '../../../config/constants'
import FilterBookYear from './FilterBookYear'
import FilterSchool from './FilterSchool'
import styles from './Header.module.scss'

const { Header: AntdHeader } = Layout

const ListNoti = () => (
  <List
    size='large'
    itemLayout="horizontal"
    dataSource={listNoti}
    renderItem={({ title, description, time, isNew }) => (
      <List.Item
        style={isNew
          ? { borderLeft: '4px solid #eab830', marginBottom: '.8rem', padding: '1rem' }
          : { backgroundColor: '#f5f5f5', padding: '1rem', paddingLeft: '1.4rem' }
        }
      >
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={
            <div>
              <a href="https://ant.design" className='w-100 block'>{title}</a>
              <small className='block'
                style={{ color: '#888', fontWeight: 400, marginTop: '-.2rem' }}
              >
                {time}
              </small>
            </div>
          }

          description={description}
        />
      </List.Item>
    )}
    style={{
      width: '30rem',
      maxHeight: '30rem',
      overflow: 'auto'

    }}
  />
)

function Header() {   // { title }
  const navigate = useNavigate()
  const user = getLocal(keys.USER)

  const handleLogout = () => {
    removeLocal(keys.USER)
    navigate(0) // refresh page to check the protected route
  }

  const handleClickUserMenu = menu => {
    switch (menu?.key) {
      case routes.PROFILE:
        navigate(menu?.key)
        break;

      case routes.LOGIN:
        handleLogout()
        break;

      default:
        break;
    }
  }

  return (
    <AntdHeader
      className={clsx("site-layout-background flex-between", styles.header)}
    > {/* flex-row-end */}
      {/* <h2>{title}</h2> */}

      <Space size='middle'>
        <FilterSchool />
        <FilterBookYear />

        {/* Global Search (???) */}
      </Space>

      <div className='flex-row-end'>
        <Popover
          title='Thông báo'
          content={<ListNoti />}
          placement="bottomRight"
          trigger="click"
        >
          <div className={styles.header__noti_box}>
            <Badge count={2}>
              <BellOutlined />
            </Badge>
          </div>
        </Popover>

        {/* <div
          onMouseLeave={() => toggleDropdown('noti', false)}
        > */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleClickUserMenu,
            rootClassName: styles.myDropdown
          }}
        >
          <div
            className={clsx('flex-align-center', styles.header__user_box)}
          >
            <img src={NewLogoImg} alt='avatar' />
            <span>
              <b>{user?.name}</b>
              <small>{user?.role}</small>
            </span>
          </div>
        </Dropdown>
        {/* </div> */}
      </div>
    </AntdHeader>
  )
}

export default Header