import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isNavbarOpen: true,
        isSearchbarOpen: true, 
        isModalOpen: false,    
    },
    reducers: {
        toggleNavbar: (state) => {
            state.isNavbarOpen = !state.isNavbarOpen;
        },
        toggleSearchbar: (state) => {
            state.isSearchbarOpen = !state.isSearchbarOpen;
        },
        OpenModal: (state) => {
            state.isModalOpen = true;
        },
        CloseModal: (state) => {
            state.isModalOpen = false;
        },
       
    },
});

export const { toggleNavbar, toggleSearchbar,OpenModal,CloseModal } = appSlice.actions;
export default appSlice.reducer;
