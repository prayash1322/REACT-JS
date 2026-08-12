import { createSlice } from "@reduxjs/toolkit";
import { Bounce, Flip, Slide, toast } from "react-toastify";
const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addtoCollection: (state, action) => {
      const alreadyExist = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!alreadyExist) {
        state.items.push(action.payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
      }
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("collection", JSON.stringify(state.items));
    },
    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem("collection");
    },
    addedToast: () => {
      toast.success("Added to Collections 😎", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
    removedToast: () => {
      toast.info("Removed from Collections ❌", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    },
    clearToast: () => {
      toast("Cleared Collection Sucessfully 🧹", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    },
  },
});

export const {
  addtoCollection,
  removeCollection,
  clearCollection,
  addedToast,
  removedToast,
  clearToast,
} = collectionSlice.actions;
export default collectionSlice.reducer;
