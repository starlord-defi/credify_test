import React from 'react';
import { Space, Table, Tag } from 'antd';

export default function BorrowersApplication(props) {
  const columns = [
    {
      title: 'Address', //props.titles.asset
      dataIndex: 'address',
      key: 'address',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Credit Score',
      dataIndex: 'creditScore',
      key: 'creditScore',
    },
    {
      title: 'Amount Requested',
      dataIndex: 'amountRequested',
      key: 'amountRequested',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
                        <a>Supply</a>
                        <a>Details</a>
                      
        </Space>
      ),
    },
  ];

  const data = [];

  return (
    <div style={{ height: '82.5vh' }}>
      <Table columns={columns} data={data} />
    </div>
  );
}
