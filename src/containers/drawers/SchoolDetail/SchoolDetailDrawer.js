import React, { useMemo } from 'react'
import _ from 'lodash';
import { Tabs, Tag } from 'antd'
import { listAccounts } from '../../../mock/data';
import Drawer from '../Drawer'
import { OverviewContent, ReportContent, StaffsContent } from './';
import styles from './SchoolDetailDrawer.module.scss'

function SchoolDetailDrawer({ open, setOpen, data }) {
  const listStaffs = useMemo(() => {
    return listAccounts.map(({schoolId}) => schoolId)
      ?.filter(item => item === data?.key)
  }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeTab = tabIndex => {
    console.log('tabIndex = ', tabIndex);
  }

  return (
    <Drawer title="Thông tin trường" 
      open={open}
      onClose={handleClose}
      // onSave={handleSave}
      className={styles.schoolDrawer}
    >
      <Tabs
        defaultActiveKey="1"
        onChange={handleChangeTab}
        items={[
          {
            label: 'Tổng quan',
            key: '1',
            children: <OverviewContent {...{ 
              data,
              onClose: handleClose
            }} />,
          },
          {
            // label: <div>Nhân sự <Tag color="geekblue">{listStaffs?.length}</Tag></div>,
            // label: `Nhân sự (${listStaffs?.length})`,
            label: 'Sơ đồ tổ chức',
            key: '2',
            children: <StaffsContent {...{ schoolData: data }} />,
          },
          {
            label: 'Báo cáo thu & chi',
            key: '3',
            children: <ReportContent {...{ data }} />,
          },
        ]}
      />
    </Drawer>
  )
}

export default SchoolDetailDrawer