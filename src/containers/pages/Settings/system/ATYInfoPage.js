import React, { useState } from 'react'
import clsx from 'clsx'
import { Button, Input, Radio, Space, theme } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { NewLogoImg } from '../../../../assets'
import MainLayout from '../../../layout/MainLayout'
import styles from '../../../../styles/pages/StATYInfo.module.scss'

function ATYInfoPage() {
  const { token } = theme.useToken()

  const [isEditing, setIsEditing] = useState({
    generalInfo: false,
    workingZone: false,
    contactInfo: false,
    signs: false
  })

  // Call API get ATY info

  return (
    <MainLayout
      title="Thông tin công ty"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
    >
      <div className='mt-2 p-2 bg-white border-r-1'>
        {/* <Spin spinning={isLoading}> */}
        <div className={styles.wrapper}>
          {/* Thông tin công ty */}
          <div className={styles.group}>
            {!isEditing.generalInfo && (
              <Button type="text" shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(prev => ({ ...prev, generalInfo: true }))}
                className={styles.btnEdit}
              />
            )}
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
                <b>Thông tin công ty</b>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                <img src={NewLogoImg} alt='' style={{ width: 150, height: 150, border: '1px solid #D9D9D9' }} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Địa chỉ</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.generalInfo ? (
                  <Input defaultValue={'42 Cầu Xéo, Phường Tân Quý, Quận Tân Phú, Tp.HCM'} />
                ) : (
                  <p>42 Cầu Xéo, Phường Tân Quý, Quận Tân Phú, Tp.HCM</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Mã số thuế</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.generalInfo ? (
                  <Input defaultValue={'0310449557'} />
                ) : (
                  <p>0310449557</p>
                )}
              </div>
            </div>

            {isEditing.generalInfo && (
              <Space size='small' className='m-auto flex-center'>
                <Button type="default"
                  style={{ width: 75 }}
                  onClick={() => setIsEditing(prev => ({ ...prev, generalInfo: false }))}
                  className='p-btn'
                >
                  Hủy
                </Button>
                <Button type="primary"
                  style={{ width: 75, backgroundColor: token.colorSuccessActive }}
                  onClick={() => setIsEditing(prev => ({ ...prev, generalInfo: false }))}
                  className='p-btn'
                >
                  Lưu
                </Button>
              </Space>
            )}
          </div>

          {/* Lĩnh vực hoạt động */}
          <div className={styles.group}>
            {!isEditing.workingZone && (
              <Button type="text" shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(prev => ({ ...prev, workingZone: true }))}
                className={styles.btnEdit}
              />
            )}
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
                <b>Lĩnh vực hoạt động</b>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Lĩnh vực</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.workingZone ? (
                  <Input defaultValue={'Giáo dục'} />
                ) : (
                  <p>Giáo dục</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Ngành nghề kinh doanh</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.workingZone ? (
                  <Input defaultValue={''} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            {isEditing.workingZone && (
              <Space size='small' className='m-auto flex-center'>
                <Button type="default"
                  style={{ width: 75 }}
                  onClick={() => setIsEditing(prev => ({ ...prev, workingZone: false }))}
                  className='p-btn'
                >
                  Hủy
                </Button>
                <Button type="primary"
                  style={{ width: 75, backgroundColor: token.colorSuccessActive }}
                  onClick={() => setIsEditing(prev => ({ ...prev, workingZone: false }))}
                  className='p-btn'
                >
                  Lưu
                </Button>
              </Space>
            )}
          </div>

          {/* Thông tin liên hệ */}
          <div className={styles.group}>
            {!isEditing.contactInfo && (
              <Button type="text" shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(prev => ({ ...prev, contactInfo: true }))}
                className={styles.btnEdit}
              />
            )}
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
                <b>Thông tin liên hệ</b>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Số điện thoại</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.contactInfo ? (
                  <Input defaultValue={''} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Email</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.contactInfo ? (
                  <Input defaultValue={''} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Website</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.contactInfo ? (
                  <Input defaultValue={''} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Tỉnh/TP</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.contactInfo ? (
                  <Input defaultValue={'Tp.HCM'} />
                ) : (
                  <p>Tp.HCM</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <p>Quận/Huyện</p>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colContent)}>
                {isEditing.contactInfo ? (
                  <Input defaultValue={'Tân Phú'} />
                ) : (
                  <p>Tân Phú</p>
                )}
              </div>
            </div>

            {isEditing.contactInfo && (
              <Space size='small' className='m-auto flex-center'>
                <Button type="default"
                  style={{ width: 75 }}
                  onClick={() => setIsEditing(prev => ({ ...prev, contactInfo: false }))}
                  className='p-btn'
                >
                  Hủy
                </Button>
                <Button type="primary"
                  style={{ width: 75, backgroundColor: token.colorSuccessActive }}
                  onClick={() => setIsEditing(prev => ({ ...prev, contactInfo: false }))}
                  className='p-btn'
                >
                  Lưu
                </Button>
              </Space>
            )}
          </div>

          {/* Thông tin chữ ký */}
          <div className={styles.group}>
            {!isEditing.signs && (
              <Button type="text" shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(prev => ({ ...prev, signs: true }))}
                className={styles.btnEdit}
              />
            )}
            <div className={clsx(styles.row, styles.rowTable)}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
                <b>Thông tin chữ ký</b>
              </div>
              <div className={clsx('px-1 py-2', styles.col, styles.colSubTitle)}>
                <table>
                  <thead>
                    <tr>
                      <th>CHỨC DANH</th>
                      <th>TIÊU ĐỀ NGƯỜI KÝ</th>
                      <th>TÊN NGƯỜI KÝ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Giám đốc'} />
                        ) : (
                          <p>Giám đốc</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Giám đốc'} />
                        ) : (
                          <p>Giám đốc</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? <Input /> : <p></p>}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Kế toán trưởng'} />
                        ) : (
                          <p>Kế toán trưởng</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Kế toán trưởng'} />
                        ) : (
                          <p>Kế toán trưởng</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? <Input /> : <p></p>}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Thủ quỹ'} />
                        ) : (
                          <p>Thủ quỹ</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Thủ quỹ'} />
                        ) : (
                          <p>Thủ quỹ</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? <Input /> : <p></p>}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Thủ kho'} />
                        ) : (
                          <p>Thủ kho</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Thủ kho'} />
                        ) : (
                          <p>Thủ kho</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? <Input /> : <p></p>}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Người lập biểu'} />
                        ) : (
                          <p>Người lập biểu</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Input defaultValue={'Người lập biểu'} />
                        ) : (
                          <p>Người lập biểu</p>
                        )}
                      </td>
                      <td>
                        {isEditing.signs ? <Input /> : <p></p>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={clsx(styles.row, styles.rowTable, styles.lastRow)}>
              <div className={clsx('px-1 py-2', styles.col, styles.colTitle)}>
              </div>
              <div className={clsx('px-1', styles.col, styles.colSubTitle)}>
                <table>
                  <tbody>
                    <tr className={styles.noBorder}>
                      <td>
                        In tên người ký lên chứng từ, báo cáo
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Radio.Group defaultValue={1}
                          //  onChange={value => {}} value={value}
                          >
                            <Radio value={1}>Có</Radio>
                            <Radio value={0}>Không</Radio>
                          </Radio.Group>
                          // <Space size='large'>

                          // </Space>
                        ) : (
                          <b>Có</b>
                        )}
                      </td>
                      <td></td>
                    </tr>
                    <tr className={styles.noBorder}>
                      <td>
                        Lấy tên người lập biểu theo tên người đăng nhập
                      </td>
                      <td>
                        {isEditing.signs ? (
                          <Radio.Group defaultValue={1}
                          //  onChange={value => {}} value={value}
                          >
                            <Radio value={1}>Có</Radio>
                            <Radio value={0}>Không</Radio>
                          </Radio.Group>
                        ) : (
                          <b>Có</b>
                        )}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {isEditing.signs && (
              <Space size='small' className='m-auto flex-center'>
                <Button type="default"
                  style={{ width: 75 }}
                  onClick={() => setIsEditing(prev => ({ ...prev, signs: false }))}
                  className='p-btn'
                >
                  Hủy
                </Button>
                <Button type="primary"
                  style={{ width: 75, backgroundColor: token.colorSuccessActive }}
                  onClick={() => setIsEditing(prev => ({ ...prev, signs: false }))}
                  className='p-btn'
                >
                  Lưu
                </Button>
              </Space>
            )}
          </div>
        </div>
        {/* </Spin> */}
      </div>
    </MainLayout>
  )
}

export default ATYInfoPage