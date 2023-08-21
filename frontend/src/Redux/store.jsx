import { configureStore } from "@reduxjs/toolkit";
import { loginsliceReducer, userDashboardSliceReducer, userEditSliceReducer, userSliceReducer } from "./userSlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persisitConfig = {
    key:"root",
    version:1,
    storage
}

const reducer=combineReducers({
    login:loginsliceReducer,
    userList:userSliceReducer,
    userDashboard: userDashboardSliceReducer,
    userDetailsEdit:userEditSliceReducer
})

const persistedReducer = persistReducer(persisitConfig,reducer)

export default configureStore({
    reducer:persistedReducer
})