import React from 'react';
import { Space, Table, Tag } from 'antd';

export default function Lend() {
  const columnsSupply = [
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
      title: '',
      dataIndex: 'input',
      key: 'input',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Supply</a>

        </Space>
      ),
    },
  ];

  const columnsSupplied = [
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
      title: 'Amount Supplied',
      dataIndex: 'amountSupplied',
      key: 'amountSupplied',
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
      <h1>Supply Assets</h1>
      <Table columns={columnsSupply} data={data} />
      <h1>Supplied Assets</h1>
      <Table columns={columnsSupplied} data={data} />
    </div>
  );
}
