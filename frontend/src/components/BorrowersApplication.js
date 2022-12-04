import React from 'react';
import { Button, Space, Table, Tag, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { shortenAddress } from '../helpers/ShortenAddress';
import protocolABI from "../contracts/Protocol.json"
import deployedContracts from "../contracts/contract-address.json"
import { ethers } from 'ethers';
import { loadUserData } from "../store/slices/accountSlice"


export default function BorrowersApplication(props) {

  const borrowApplicationList = useSelector((state) => state.account.borrowApplicationList);

  const dispatch = useDispatch()

  const handleOk = async (record) => {

    const signer = props.provider.getSigner()
    const protocol_address = deployedContracts.Protocol
    const protocol_contract = new ethers.Contract(
      protocol_address,
      protocolABI.abi,
      signer
    )

    let address = record.originalAddress
    console.log(address)
    let tx = await protocol_contract.vote(address)
    console.log("tx: ", tx)
    message.success("Voted")
    let disProps = {
      pro: props.provider,
      addr: signer.address
    }
    await dispatch(loadUserData(disProps))
  };

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
        <Button disabled={record.disabled} onClick={(e) => handleOk(record)}>
          {record.buttonText}
        </Button>
      ),
    },
  ];


  const borrowApplicationListTemp = []
  const data = borrowApplicationList ? borrowApplicationList.map((data, key) => {
    var first = true
    if (data.amount > 0 && key == 0) {
      first = false
      console.log("data: ", data.name)
      let address = shortenAddress(data.user)
      let buttonText = null
      let disabled = null
      if (!data.approved) {
        buttonText = "Vote"
        disabled = false
      }
      else {
        buttonText = "Vote"
        disabled = false
      }

      borrowApplicationListTemp.push(
        {
          key: key,
          address: address,
          creditScore: data.creditScore,
          amountRequested: data.amount,
          originalAddress: data.user,
          buttonText: buttonText,
          disabled: disabled
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
