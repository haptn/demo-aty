import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { MainLayout } from '../..'
import { OverviewTab, PlanTab, PracticalTab, ReportTab } from '.'

function Budget() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openModal, setOpenModal] = useState({
    // rules: false
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
      children: <OverviewTab />,
    },
    {
      key: 'plan',
      label: 'Kế hoạch ngân sách',
      children: <PlanTab />,
    },
    {
      key: 'practical',
      label: 'Tình hình thực hiện',
      children: <PracticalTab />,
    },
    {
      key: 'reports',
      label: 'Báo cáo đã lưu',
      children: <ReportTab {...{ setOpenModal }} />,
    },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/budget', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Ngân sách"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}

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

export default Budget