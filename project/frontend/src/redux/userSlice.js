import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial state from localStorage if available, otherwise use the default initial state
const initialState = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user")) 
  : {
      emali: "", // Make sure it's set to a string
      firstName: "", // Ensure it's initialized
      image: "",
      lastName: "",
      _id: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const userData = action.payload.data;
      state._id = userData._id;
      state.firstName = userData.firstName;
      state.lastName = userData.lastName;
      state.emali = userData.email;
      state.image = userData.image;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logoutRedux: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.emali = "";
      state.image = "";
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      const updatedData = action.payload;
      state.firstName = updatedData.firstName;
      state.lastName = updatedData.lastName;
      state.emali = updatedData.emali;
      state.image = updatedData.image;
      localStorage.setItem("user", JSON.stringify(state));
    }
  }
});

export const { loginRedux, logoutRedux, updateUser } = userSlice.actions;

export default userSlice.reducer;
