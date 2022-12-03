import { Button, Card, Col, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';

//import { loadReserveSummary, loadUserSummary, loadWalletSummary } from '../../../store/slices/reserveSlice';

export default function SupplyModal() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [gas, setGas] = useState()
    const [isSuccess, setSuccess] = useState(false)
    const [disableSuccessOrFailureComp, setDisableSuccessOrFailureComp] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [amount, setAmount] = useState(0)


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
                onOk={handleOk}
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

                    <Button>
                        Supply
                    </Button>

                </div> : ""}
            </Modal>
        </div>
    )
}