import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';

import protocolABI from "../contracts/Protocol.json"
import deployedContracts from "../contracts/contract-address.json"

export default function Lend(provider) {

  const reserves = useSelector((state) => state.account.reserves)

  const onClick = async () => {

    const protocol_address = deployedContracts.Protocol
    const protocol_contract = new ethers.Contract(
      protocol_address,
      protocolABI.abi,
      provider.provider
    )

    await protocol_contract.deposit()
  }

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
        </Space>
      ),
    },
  ];

  const reservesList = []
  const data = reserves ? reserves.map((data, key) => {
    console.log("data: ", data.name)
    reservesList.push(
      {
        key: key,
        asset: data.name,
        apy: "10%",
        amountSupplied: "123"
      })
  })
    : ""

  return (
    <div style={{ height: '82.5vh' }}>
      <h1>Supply Assets</h1>
      <Table columns={columnsSupply} dataSource={reservesList} />
      <h1>Supplied Assets</h1>
      <Table columns={columnsSupplied} dataSource={reservesList} />
    </div>
  );
}
