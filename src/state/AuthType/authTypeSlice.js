import { createSlice } from '@reduxjs/toolkit';

const authTypeSlice = createSlice({
    name:'AuthType',
    initialState:{
        type:localStorage.getItem("type")?localStorage.getItem("type"):'',
    },
    reducers:{
        setType:(state, action)=>{
            localStorage.setItem("type", action.payload.type);
            state.type = action.payload.type;
        }
    }
})

export const { setType } = authTypeSlice.actions;
export default authTypeSlice.reducer;