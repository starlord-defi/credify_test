import { Button, Card, Col, Input, message, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import protocolABI from "../../contracts/Protocol.json"
import deployedContracts from "../../contracts/contract-address.json"
import { ethers } from 'ethers';

export default function BorrowModal(record) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [gas, setGas] = useState()
    const [isSuccess, setSuccess] = useState(false)
    const [disableSuccessOrFailureComp, setDisableSuccessOrFailureComp] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [amount, setAmount] = useState(0)
    const creditScore = useSelector(state => state.account.creditScore);

    const provider = record.provider

    const showModal = () => {
        setVisible(true)
        setSuccess(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = async () => {

        const signer = provider.provider.getSigner()
        const protocol_address = deployedContracts.Protocol
        const protocol_contract = new ethers.Contract(
            protocol_address,
            protocolABI.abi,
            signer
        )

        let name = record.record.record.name
        let amountT = amount.amount
        let asset = record.record.record.reserveAddress
        amountT = ethers.utils.parseEther(amountT)
        console.log(amountT, asset, creditScore, name, asset)

        let tx = await protocol_contract.applyBorrow(amountT, asset, creditScore, name)
        await tx.wait()
        message.success("Applied for Loan")
    };

    const onChange = async (e) => {
        setAmount({
            amount: e.target.value
        })
    }

    return (
        <div>
            <Button onClick={showModal}>
                Borrow
            </Button>
            <Modal
                centered
                width={420}
                visible={visible}
                title="Borrow"
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
                                        <h3 style={{ textAlign: 'right' }}>DAI</h3>
                                    </Col>
                                </Row>
                            </Row>

                        </div>

                    </div>

                    <Button onClick={handleOk}>
                        Borrow
                    </Button>

                </div> : ""}
            </Modal>
        </div>
    )
}