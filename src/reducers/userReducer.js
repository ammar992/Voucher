import { createSlice } from "@reduxjs/toolkit";



const initialState = {};


const userReducer = createSlice({
    name:"person",
    initialState,
    reducers:{
        loadUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.value = {},
            localStorage.clear();
            
        }
    }
})


export const {loadUser,logout} = userReducer.actions;
export default userReducer.reducer;