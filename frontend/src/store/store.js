import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './slices/accountSlice'
import reserveReducer from './slices/reserveSlice'

export const store = configureStore({
    reducer: {
        account: accountReducer,
        reserve: reserveReducer
    },
})