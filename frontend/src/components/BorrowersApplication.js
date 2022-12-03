import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { shortenAddress } from '../helpers/ShortenAddress';

export default function BorrowersApplication(props) {

  const borrowApplicationList = useSelector((state) => state.account.borrowApplicationList);

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
          <a>Details</a>
        </Space>
      ),
    },
  ];


  const borrowApplicationListTemp = []
  const data = borrowApplicationList ? borrowApplicationList.map((data, key) => {
    if (data.amount > 0) {
      console.log("data: ", data.name)
      let address = shortenAddress(data.user)
      borrowApplicationListTemp.push(
        {
          key: key,
          address: address,
          creditScore: data.creditScore,
          amountRequested: data.amount
        })
    }
  })
    : ""

  return (
    <div style={{ height: '82.5vh' }}>
      <Table columns={columns} dataSource={borrowApplicationListTemp} />
    </div>
  );
}
