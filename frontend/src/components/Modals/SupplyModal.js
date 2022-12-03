import { Button, Card, Col, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { message } from 'antd';
import protocolABI from "../../contracts/Protocol.json"
import DAIabi from "../../contracts/MintableERC20.json"
import deployedContracts from "../../contracts/contract-address.json"


//import { loadReserveSummary, loadUserSummary, loadWalletSummary } from '../../../store/slices/reserveSlice';

export default function SupplyModal(record) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [gas, setGas] = useState()
    const [isSuccess, setSuccess] = useState(false)
    const [disableSuccessOrFailureComp, setDisableSuccessOrFailureComp] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [amount, setAmount] = useState(0)

    const name = record.record.name
    const provider = record.provider


    const showModal = () => {
        setVisible(true)
        setClicked(true)
        setDisableSuccessOrFailureComp(true)
        setSuccess(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = async () => {
        const signer = provider.provider.getSigner()
        const protocol_address = deployedContracts.Protocol
        let DAIAddress = deployedContracts.DAI
        const protocol_contract = new ethers.Contract(
            protocol_address,
            protocolABI.abi,
            signer)

        const DAI = new ethers.Contract(
            DAIAddress,
            DAIabi.abi,
            signer
        )

        let amountT = amount.amount
        let asset = record.record.record.reserveAddress

        const APPROVAL_AMOUNT_LENDING_POOL = '1000000000000000000000000000';

        let tx = await DAI.approve(protocol_address, APPROVAL_AMOUNT_LENDING_POOL)
        await tx.wait()

        amountT = ethers.utils.parseEther(amountT)
        tx = await protocol_contract.deposit(amountT, asset)
        await tx.wait()
        message.success("Deposited")
    };

    const onChange = async (e) => {

        setAmount({
            amount: e.target.value
        })

    }


    return (
        <div>
            <Button onClick={showModal}>
                Supply
            </Button>
            <Modal
                centered
                width={420}
                visible={visible}
                title="Supply"
                onCancel={handleCancel}
                footer={[
                    ,
                ]}
            >
                {disableSuccessOrFailureComp ? <div>

                    <div className='modalbody'>

                        <div className='input-div'>
                            <p className='color-cement'>Transaction overview</p>
                            <Row className='modal-input-flex-div'>
                                <Row className='align-input'>
                                    <Col className='col-left' >
                                        <Input className='input' placeholder='0.00' bordered={false} onChange={onChange} value={amount ? amount.amount : ""} inputMode='numeric' />
                                    </Col>
                                    <Col className='col-right input-asset-name'>
                                        <h3 style={{ textAlign: 'right' }}>Asset</h3>
                                    </Col>
                                </Row>
                            </Row>

                        </div>

                    </div>

                    <Button onClick={handleOk}>
                        Supply
                    </Button>

                </div> : ""}
            </Modal>
        </div>
    )
}