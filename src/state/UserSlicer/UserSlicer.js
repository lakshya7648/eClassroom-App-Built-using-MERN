import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
    name:'User',
    initialState:{
        user:{
            authToken:localStorage.getItem("authToken")?(localStorage.getItem("authToken")):'',
            name:localStorage.getItem("name")?(localStorage.getItem("name")):'',
            email:localStorage.getItem("email")?(localStorage.getItem("email")):'',
        }
    },
    reducers:{
        setUser:(state, action)=>{
            state.user.authToken = action.payload.authToken;
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;

            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("email", action.payload.email);
        },
        removeUser:(state)=>{
            state.user = {
                authToken:'',
                name:'',
                email:'',
            }
        }
    }
})

export const {setUser, removeUser} = UserSlicer.actions;
export default UserSlicer.reducer;