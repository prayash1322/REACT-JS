import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name:'counter',
    initialState:{
        value: 0
    },
    reducers:{
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state,actions) => {
            state.value += actions.payload
        },
        decrementByAmount: (state,actions) => {
            state.value -= actions.payload
        }
    }
})

export const {increment,decrement,incrementByAmount,decrementByAmount} = counterSlice.actions
export default counterSlice.reducer