import React from 'react';
import { Space, Table, Tag } from 'antd';

export default function Borrow(props) {
  const columns = [
    {
      title: 'Asset', //props.titles.asset
      dataIndex: 'asset',
      key: 'asset',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Annual Percentage Yield',
      dataIndex: 'apy',
      key: 'apy',
    },
    {
      title: 'Amount To Borrow',
      dataIndex: 'atb',
      key: 'atb',
    },
    {
      title: '',
      dataIndex: 'check',
      key: 'check',
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
      <h1 style={{ textAlign: 'center' }}>
        Credit Score: {props.creditScore}{' '}
      </h1>
      <h2 style={{ textAlign: 'center' }}>Borrow Asset Table</h2>
      <Table columns={columns} data={data} />
    </div>
  );
}
