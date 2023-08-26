import {createSlice} from '@reduxjs/toolkit'


export const loginslice = createSlice({
    name: "loginUser",
    initialState: [],
    reducers: {
        loginUser:(state,action)=>{
            
            const { name, email, phone,login, token,image } = action.payload;
    
      return {
        ...state,
        name,
        email,
        phone,
        login,
        token,
        image,
      };
        },
        logoutUser:(state,action)=>{
          localStorage.removeItem("login");
          
            return [];
        }
      }
    })

export const userSlice=createSlice({
  name:"userDetails",
  initialState:[],
  reducers:{
    loaduser:(state,action)=>{
      return action.payload
    },
    clearUser:(state,action)=>{
      return []
    }
  }
})

export const userDetailsEdit=createSlice({
  name:"userEdit",
  initialState:[],
  reducers:{
    userEdit:(state,action)=>{
      const { name, email, phone, image } = action.payload;
    
      return {
        ...state,
        name,
        email,
        phone,
        image
      };
    }
  }
})

export const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState: {
    showAdminUserList: true,
    showCreateUser: false,
    showUserEdit:false
  },
  reducers: {
    toggleAdminUserList: (state) => {
      state.showAdminUserList = true;
      state.showCreateUser = false;
      state.showUserEdit = false;
    },
    toggleCreateUser: (state) => {
      state.showAdminUserList = false;
      state.showCreateUser = true;
      state.showUserEdit = false;
    },
    toggleUserEdit:(state)=>{
      state.showAdminUserList = false;
      state.showCreateUser = false;
      state.showUserEdit = true;
    }
  },
});

export const { toggleAdminUserList, toggleCreateUser ,toggleUserEdit } = userDashboardSlice.actions;
export const { loginUser,logoutUser } = loginslice.actions;
export const {loaduser,clearUser} = userSlice.actions;
export const {userEdit} = userDetailsEdit.actions
export const loginsliceReducer = loginslice.reducer;
export const userSliceReducer = userSlice.reducer;
export const userEditSliceReducer=userDetailsEdit.reducer;
export const userDashboardSliceReducer=userDashboardSlice.reducer;