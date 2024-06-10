import { createSlice } from "@reduxjs/toolkit";

const pageSlice=createSlice({
    name:"pageNumber",
    initialState:{
        pageNumber:1
    },
    reducers:{
        pageIncrement:(state)=>{
            state.pageNumber=state.pageNumber+1
        },
        pageDecrement:(state)=>{
            state.pageNumber=state.pageNumber-1
        },
        pageReset:(state)=>{
            state.pageNumber=1
        },
    }
})

export const {pageIncrement,pageDecrement,pageReset}=pageSlice.actions
export default pageSlice.reducer