import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { actionCreditScore } from "../store/slices/accountSlice"
import protocolABI from "../contracts/Protocol.json"
import deployedContracts from "../contracts/contract-address.json"
import { ethers } from 'ethers';
import { message, Row, Col, Card, } from 'antd';

export default function Dashboard(provider) {

  const dispatch = useDispatch();
  const address = useSelector(state => state.account.address);
  var creditScore = useSelector(state => state.account.creditScore);
  const creditSet = useSelector(state => state.account.creditSet);
  const borrowApplication = useSelector(state => state.account.borrowApplication)

  const getCreditScore = async () => {

    const signer = provider.provider.getSigner()
    const protocol_address = deployedContracts.Protocol
    const protocol_contract = new ethers.Contract(
      protocol_address,
      protocolABI.abi,
      signer
    )
    creditScore = Math.floor(creditScore)
    console.log("creditScore: ", creditScore)
    let tx = await protocol_contract.setCredit(creditScore)
    await tx.wait()
  }

  return (
    <div className='dashboard' id='dashboard' style={{ height: '82.5vh' }}>
      <div className='container' style={{ padding: "0 30px 0 30px" }}>
        <Card>
          <div className='credit-overview' style={{ textAlign: 'center' }}>
            <div
              style={{
                height: '140px',
                width: '140px',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                // backgroundColor: '#1ae',
              }}
            >
              <div
                className='net-credit-score'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  margin: '0.1875rem',
                  backgroundColor: 'linear-gradient(150deg, #ee9f0c, #dbea14)',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem',
                }}
              >
                <h1 style={{ fontSize: '48px' }}>{creditScore}</h1>
              </div>
            </div>
            <button
              onClick={getCreditScore}
              style={{
                background:
                  'linear-gradient(150deg,#ee9f0c 10.51%, #dbea14 93.41%)',
                border: 'none',
                fontFamily: "'Inter', sans-serif ",
                fontWeight: '800',
                borderRadius: '16px',
                width: '270px',
                height: '50px',
                color: 'white',
              }}
            >
              {creditSet ? "Successfully Minted on Blockchain" : "Store on Blockchain"}
            </button>
          </div>
        </Card>
      </div>
      {/* <div style={{ padding: "2rem" }}>
        <Row>
          <h1>My Application</h1>
        </Row>
        <Row>
          <Card style={{ padding: "1rem 1rem" }}>
            <p>Asset Name</p>
            <h1>{borrowApplication.assetName}</h1>
          </Card>
          <Card style={{ padding: "1rem 1rem", borderRadius: "2rem" }}>
            <p>Amount</p>
            <h1>{borrowApplication.amount}</h1>
          </Card>
          <Card style={{ padding: "1rem 1rem" }}>
            <p>No. of Votes</p>
            <h1>{borrowApplication.noOfVotes}</h1>
          </Card>
          <Card style={{ padding: "1rem 1rem" }}>
            <p>Approved</p>
            <h1>{borrowApplication.approved}</h1>
          </Card>
        </Row>
      </div> */}
    </div>
  );
}
