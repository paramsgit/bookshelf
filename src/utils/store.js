import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import pageSlice from "./pageSlice";
const store =configureStore({
    reducer:{
        app:appSlice,
        search:searchSlice,
        pageNumber:pageSlice,
    }
})

export default store;