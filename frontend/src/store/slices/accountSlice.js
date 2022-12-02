import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    address: null,
    userSummary: null,
    userWalletBalancesDictionary: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload.address
        },
        setUserSummary: (state, action) => {
            state.userSummary = action.payload.userSummary
        },
        setUserBalances: (state, action) => {
            state.userWalletBalancesDictionary = action.payload.userWalletBalancesDictionary
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAddress, setUserSummary, setUserBalances } = accountSlice.actions

export default accountSlice.reducer