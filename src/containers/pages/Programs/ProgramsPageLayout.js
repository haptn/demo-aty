import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { MainLayout } from '../..'
import { ActivityTab, CourseTab, OverviewTab } from '.'
import { ActivityDetail, CourseDetail } from './drawers'

function ProgramsPageLayout() {
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
      key: 'courses',
      label: 'Chương trình / Khóa học',
      children: <CourseTab {...{ setDetailData, setOpenDetailDrawer }} />,
    },
    {
      key: 'activities',
      label: 'Hoạt động / Sự kiện',
      children: <ActivityTab {...{ setDetailData, setOpenDetailDrawer }} />,
    },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/programs', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Chương trình"
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

      {openDetailDrawer?.activity && (
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
      )}
    </MainLayout>
  )
}

export default ProgramsPageLayout