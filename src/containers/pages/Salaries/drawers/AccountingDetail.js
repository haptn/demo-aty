import React from 'react'
import { Drawer } from '../../..'
import { DatePicker, Table, Typography, Form, Input, Col, Divider, Row } from 'antd';
import dayjs from 'dayjs';
import { formatMoney } from '../../../../../src/utils/format'

// const { token } = theme.useToken()

const { TextArea } = Input;
const { Title } = Typography;

function AccountingDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // width: 40,
      // render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>DIỄN GIẢI</div>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>TK NỢ</div>,
      dataIndex: 'tk_no',
      key: 'tk_no',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>TK CÓ</div>,
      dataIndex: 'tk_co',
      key: 'tk_co',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>SỐ TIỀN</div>,
      dataIndex: 'so_tien',
      key: 'so_tien',
      render: (total) => formatMoney(total)
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>ĐỐI TƯỢNG NỢ</div>,
      dataIndex: 'doi_tuong_no',
      key: 'doi_tuong_no',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>TÊN ĐỐI TƯỢNG NỢ</div>,
      dataIndex: 'ten_doi_tuong_no',
      key: 'ten_doi_tuong_no',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>ĐỐI TƯỢNG CÓ</div>,
      dataIndex: 'doi_tuong_co',
      key: 'doi_tuong_co',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>TÊN ĐỐI TƯỢNG CÓ</div>,
      dataIndex: 'ten_doi_tuong_co',
      key: 'ten_doi_tuong_co',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>ĐƠN VỊ</div>,
      dataIndex: 'don_vi',
      key: 'don_vi',
    },
    {
      title: <div style={{ textAlign: 'center', fontSize: '12px' }}>KHOẢN MỤC CP</div>,
      dataIndex: 'khoan_muc_cp',
      key: 'khoan_muc_cp',
    }
  ]

  const dataTbl = [
    {
      id: 1,
      name: "Lương cơ bản",
      tk_no: 6429.1,
      tk_co: 3341,
      so_tien: 113750000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 2,
      name: "Phụ cấp khác",
      tk_no: 6429.1,
      tk_co: 3341,
      so_tien: 113750000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 3,
      name: "Phụ cấp thuộc quỹ lương",
      tk_no: 6429.1,
      tk_co: 3341,
      so_tien: 8187500,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 4,
      name: "BHTN nhân viên đóng",
      tk_no: 3341,
      tk_co: 3386,
      so_tien: 260000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 5,
      name: "BHXH của công ty đóng",
      tk_no: 6429.1,
      tk_co: 3383,
      so_tien: 4420000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 6,
      name: "LBHXH nhân viên đóng",
      tk_no: 3341,
      tk_co: 3383,
      so_tien: 2080000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 7,
      name: "BHYT công ty đóng",
      tk_no: 6429.1,
      tk_co: 3384,
      so_tien: 780000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 8,
      name: "BHYT nhân viên đóng",
      tk_no: 3341,
      tk_co: 3384,
      so_tien: 390000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    {
      id: 9,
      name: "KPCĐ công ty đóng",
      tk_no: 6429.1,
      tk_co: 3382,
      so_tien: 520000,
      doi_tuong_no: "",
      ten_doi_tuong_no: "",
      doi_tương_co: "",
      ten_doi_tuong_co: "",
      don_vi: "",
      khoan_muc_cp: ""
    },
    // {
    //   id: 10,
    //   name: "Tạm ứng 141 của nhân viên Nguyễn Tuấn Dương",
    //   tk_no: 3341,
    //   tk_co: 141,
    //   so_tien: 6400000,
    //   doi_tuong_no: "",
    //   ten_doi_tuong_no: "",
    //   doi_tương_co: "NTDUONG",
    //   ten_doi_tuong_co: "NGUYỄN TUẤN DƯƠNG",
    //   don_vi: "PKDPN",
    //   khoan_muc_cp: ""
    // },
    // {
    //   id: 11,
    //   name: "Tạm ứng 141 của nhân viên Phạm Thị Ngọc Hà",
    //   tk_no: 6429.1,
    //   tk_co: 3382,
    //   so_tien: 800000,
    //   doi_tuong_no: "",
    //   ten_doi_tuong_no: "",
    //   doi_tương_co: "PTNHA",
    //   ten_doi_tuong_co: "PHẠM THỊ NGỌC HÀ",
    //   don_vi: "PKDPB",
    //   khoan_muc_cp: ""
    // }
  ]

  return (
    <Drawer title={data?.name}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, accounting: false }))}
      onSave={handleSave}
      width={'calc(100% - 200px)'}
    >
      <div className='contaier-1' style={{ heigh: '20%' }}>
        <Form form={form} layout="vertical">
          <Row>
            <Col span={13}>
              <Form.Item label="Bảng lương" required tooltip="This is a required field">
                <Input readOnly value={data?.name} disabled />
              </Form.Item>
              <Form.Item label="Diễn giải" required tooltip="This is a required field">
                <TextArea
                  showCount
                  maxLength={100}
                  style={{ height: 50, resize: 'none' }}
                  value={`Hạch toán chi phí lương theo bảng lương ${data?.name}`}
                />
              </Form.Item>
            </Col>
            <Col span={1}> <Divider type="vertical" style={{ height: '100%', marginLeft: '50%' }} /> </Col>
            <Col span={6}>
              <Form.Item label="Ngày hoạch toán" required tooltip="This is a required field">
                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
              </Form.Item>
              <Form.Item label="Ngày chứng từ" required tooltip="This is a required field">
                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
              </Form.Item>
              <Form.Item label="Số chứng từ" required>
                <Input style={{ width: '15rem' }} value="HLCPL00009" readOnly disabled />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Title level={5}>Tổng cộng</Title>
              <Title level={2}>{formatMoney(dataTbl.reduce((a, b) => a + b.so_tien, 0))}</Title>
            </Col>
          </Row>
        </Form>
      </div>
      <div className='container-2' >
        <Title level={5}>Hoạch toán</Title>
        <Table
          columns={columns}
          dataSource={dataTbl}
          bordered size='small'
          className={'w-100 mb-1 my-table'}
          pagination={{
            size: 'default',
            showTotal: total => `Tổng cộng ${total} dòng`,
            // onChange: _page => setPage(_page),
            hideOnSinglePage: true
          }}
          style={{ marginBottom: '30px' }}

          summary={pageData => {
            let totalExpense = 0

            pageData.forEach(({ so_tien }) => {
              totalExpense += so_tien
            });

            return (
              <Table.Summary fixed>
                <Table.Summary.Row
                  style={{
                    textAlign: 'right',
                    fontWeight: 700,
                    // background: token.colorBgTextHover
                  }}
                >
                  <Table.Summary.Cell colSpan={4} index={0}>
                    Tổng
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell /> */}
                  <Table.Summary.Cell>{formatMoney(totalExpense)}</Table.Summary.Cell>
                  <Table.Summary.Cell />
                </Table.Summary.Row>
              </Table.Summary>
            )
          }}
        />
      </div>
    </Drawer>
  )
}

export default AccountingDetail