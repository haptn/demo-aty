import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { OverviewTab } from '.'
import { MainLayout } from '../..'

function BoardingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openModal, setOpenModal] = useState({
    rules: false
  })
  const [openDetailDrawer, setOpenDetailDrawer] = useState({
    activity: false,
    course: false,
  })
  const [detailData, setDetailData] = useState({
    activity: null,
    course: null,
  })

  const tabs = [
    {
      key: '',
      label: 'Tổng quan',
      children: <OverviewTab {...{ setOpenModal }} />,
    },
    {
      key: 'students',
      label: 'DS học sinh',
      children: <i>(Danh sách học sinh bán trú/nội trú và tiền mỗi người đã đóng)</i>,
    },
    {
      key: 'menu',
      label: 'Thực đơn',
      children: (
        <i>
          (Bảng menu hàng ngày và giá tiền mỗi bữa (chia 4 phần: sáng, trưa, xế, tối))
        </i>
      ),
    },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/boarding', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Bán trú/nội trú"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}

      {/* <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          
        </Spin>
      </div> */}

      {/* {openDetailDrawer?.activity && (
        <ActivityDetail {...{
          data: detailData?.activity,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )}
      {openDetailDrawer?.course && (
        <CourseDetail {...{
          data: detailData?.course,
          open: openDetailDrawer?.course,
          setOpen: setOpenDetailDrawer
        }} />
      )} */}
    </MainLayout>
  )
}

export default BoardingPage