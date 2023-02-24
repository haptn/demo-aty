import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { MainLayout } from '../..'
import { AccountingTab, OverviewTab, SalariesTab, StaffsTab } from '.'
import ModalRules from './modals/ModalRules'
import { AccountingDetail, SalaryDetail, StaffDetail } from './drawers'

function SalaryPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openModal, setOpenModal] = useState({
    rules: false
  })
  const [openDetailDrawer, setOpenDetailDrawer] = useState({
    staff: false,
    salary: false,
    accounting: false
  })
  const [detailData, setDetailData] = useState({
    staff: null,
    salary: null,
    accounting: null
  })

  // useEffect(() => {
  //   navigate('/salaries', { replace: true })
  // }, [location.pathname])

  const tabs = [
    {
      key: '',
      label: 'Tổng quan',
      children: <OverviewTab {...{ setOpenModal }} />,
    },
    {
      key: 'staffs',
      label: 'DS Nhân viên',
      children: <StaffsTab {...{ setDetailData, setOpenDetailDrawer }} />,
    },
    {
      key: 'timesheet',
      label: 'Dữ liệu chấm công',
      children: <i>
        (Có thể sẽ import từ hệ thống hiện có mà trường đang dùng, hoặc trường đề xuất có cần làm phần này hay không)
      </i>,
    },
    {
      key: 'pay-table',
      label: 'Bảng lương',
      children: <SalariesTab {...{ setDetailData, setOpenDetailDrawer }} />,
    },
    {
      key: 'bonus',
      label: 'Khen thưởng, Kỷ luật',
      children: <i>
        DS những nhân viên (trong tháng/năm/...) được nhận tiền thưởng nóng (thi đỗ chứng chỉ chuyên môn, đạt hiệu quả cao trong công việc, vượt KPI,...)
        hoặc bị đóng tiền phạt...
      </i>,
    },
    {
      key: 'allowance',
      label: 'Phụ cấp, tài trợ',
      children: <i>DS những nhân viên (trong tháng/năm/...) được nhận tiền phụ cấp, trợ cấp, tài trợ (công tác, đi lại, đau ốm,...)</i>,
    },
    {
      key: 'accounting',
      label: 'Hạch toán lương',
      children: <AccountingTab {...{ setDetailData, setOpenDetailDrawer }} />,
    },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/salaries', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Lương thưởng"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}
      {openModal.rules && (
        <ModalRules {...{
          open: openModal.rules,
          setOpen: value => setOpenModal(prev => ({ ...prev, rules: value }))
        }} />
      )}

      {/* <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          
        </Spin>
      </div> */}

      {openDetailDrawer?.accounting && (
        <AccountingDetail {...{
          data: detailData?.accounting,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )}
      {openDetailDrawer?.salary && (
        <SalaryDetail {...{
          data: detailData?.salary,
          open: openDetailDrawer?.salary,
          setOpen: setOpenDetailDrawer
        }} />
      )}
      {openDetailDrawer?.staff && (
        <StaffDetail {...{
          data: detailData?.staff,
          open: openDetailDrawer?.staff,
          setOpen: setOpenDetailDrawer
        }} />
      )}
    </MainLayout>
  )
}

export default SalaryPage