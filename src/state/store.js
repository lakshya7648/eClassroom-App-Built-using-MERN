import { configureStore } from '@reduxjs/toolkit';
import authTypeReducer from './AuthType/authTypeSlice';
import UserReducer from './UserSlicer/UserSlicer';

export const store = configureStore({
    reducer:{
        User:UserReducer,
    }
})