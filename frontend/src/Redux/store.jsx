import { configureStore } from "@reduxjs/toolkit";
import { loginsliceReducer, userDashboardSliceReducer, userEditSliceReducer, userSliceReducer } from "./userSlice";

export default configureStore({
    reducer:{
        login:loginsliceReducer,
        userList:userSliceReducer,
        userDashboard: userDashboardSliceReducer,
        userDetailsEdit:userEditSliceReducer
    }
})