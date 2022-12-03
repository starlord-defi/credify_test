import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import protocolABI from "../../contracts/Protocol.json"
import deployedContracts from "../../contracts/contract-address.json"
import { ethers } from 'ethers'

export const actionCreditScore = createAsyncThunk("account/actionCreditScore", async (userData) => {
    let response = null
    try {
        const { pro, addr } = userData
        const signer = pro.getSigner()
        const protocol_address = deployedContracts.Protocol
        const protocol_contract = new ethers.Contract(
            protocol_address,
            protocolABI.abi,
            signer
        )
        let tx = await protocol_contract.getCredit()
        let set = tx[1]
        let score = tx[0].toString()

        if (!set) {
            console.log("tx: in set")
            var userDataTemp = {
                public_address: userData.public_address
            }
            console.log(userDataTemp)
            response = await axios.post("/api/credit/creditscore", userDataTemp)
            return ({ response: response.data })
        }
        else {
            var obj = {
                score: score
            }
            return ({ response: obj })
        }
    }
    catch (err) {
        console.log("err: ", err)
    }
})

export const loadUserData = createAsyncThunk("account/loadUserData", async (props) => {
    const { pro, addr } = props

    const protocol_address = deployedContracts.Protocol
    const protocol_contract = new ethers.Contract(
        protocol_address,
        protocolABI.abi,
        pro
    )
    console.log("pro ", pro, "protocol_address ", protocol_address, "protocolABI.abi ", protocolABI.abi)

    let res = await protocol_contract.getData(addr)
    let reserves = res[0]
    let borrowApplicationTemp = res[1]
    let borrowApplication = {
        amount: ethers.utils.formatEther(borrowApplicationTemp.amount),
        creditScore: borrowApplicationTemp.creditScore.toString(),
        noOfVotes: borrowApplicationTemp.noOfVotes.toString(),
        asset: borrowApplicationTemp.asset.toString(),
        assetName: borrowApplicationTemp.assetName.toString(),
        user: borrowApplicationTemp.user.toString(),
        approved: borrowApplicationTemp.approved.toString()
    }
    let borrowApplicationListTemp = res[2]
    let borrowApplicationList = []
    for (let i in borrowApplicationListTemp) {
        let borrowApplicationListTempTemp = {
            amount: ethers.utils.formatEther(borrowApplicationListTemp[i].amount),
            creditScore: borrowApplicationListTemp[i].creditScore.toString(),
            noOfVotes: borrowApplicationListTemp[i].noOfVotes.toString(),
            asset: borrowApplicationListTemp[i].asset.toString(),
            assetName: borrowApplicationListTemp[i].assetName.toString(),
            user: borrowApplicationListTemp[i].user.toString(),
            approved: borrowApplicationListTemp[i].approved.toString()
        }
        borrowApplicationList.push(borrowApplicationListTempTemp)
    }
    let totalNoOfVoters = res[3].toString()
    let totalAssets = res[4].toString()


    console.log("res: ", reserves, "borrowApplication: ", borrowApplication, "borrowApplicationList: ", borrowApplicationList, "totalNoOfVoters: ", totalNoOfVoters, "totalAssets: ", totalAssets)
    return ({
        reserves,
        borrowApplication,
        borrowApplicationList,
        totalNoOfVoters,
        totalAssets
    })

})

const initialState = {
    address: null,
    creditScore: null,
    error: null,
    loading: false,
    reserves: null,
    borrowApplication: null,
    borrowApplicationList: null,
    totalNoOfVoters: null,
    totalAssets: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload.address
        },
    },
    extraReducers: builder => {
        builder
            .addCase(actionCreditScore.pending, state => {
                state.loading = true;
            })
            .addCase(actionCreditScore.fulfilled, (state, action) => {
                state.creditScore = action.payload.response.score;
                console.log(action.payload.response.score)
                state.loading = false;
            })
            .addCase(actionCreditScore.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })

            /////////////////////////////////////////////////////////////////

            .addCase(loadUserData.pending, state => {
                state.loading = true;
            })
            .addCase(loadUserData.fulfilled, (state, action) => {
                state.reserves = action.payload.reserves;
                state.borrowApplication = action.payload.borrowApplication;
                state.totalNoOfVoters = action.payload.totalNoOfVoters;
                state.totalAssets = action.payload.totalAssets;
                state.borrowApplicationList = action.payload.borrowApplicationList;

                state.loading = false;
            })
            .addCase(loadUserData.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
    }
})

// Action creators are generated for each case reducer function
export const { setAddress } = accountSlice.actions

export default accountSlice.reducer