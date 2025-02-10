import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  collection: [],
  charm: [],
  gold: [],
  status: "loaded",
  errorMessage: "",
};

const wishListurl = "http://localhost:4005/carousel";
const wishListurl2 = "http://localhost:4005/carousel2";
const goldurl = " http://localhost:4005/golds";

export const getWishlistData = createAsyncThunk(
  "wishlist/getWishlistData",
  async () => {
    try {
      const { data } = await axios.get(wishListurl);
      return data;
    } catch (error) {
      return "error";
    }
  }
);

export const getWishlistData2 = createAsyncThunk(
  "wishlist/getWishlistData2",
  async () => {
    try {
      const { data } = await axios.get(wishListurl2);
      return data;
    } catch (error) {
      return "error";
    }
  }
);

export const patchWishlistData = createAsyncThunk(
  "wishlist/patchWishlistData",
  async ({ id, clicked }) => {
    try {
      const { data } = await axios.patch(`${wishListurl}/${id}`, { clicked });
      return data;
    } catch (error) {
      return "error";
    }
  }
);

export const patchWishlistData2 = createAsyncThunk(
  "wishlist/patchWishlistData2",
  async ({ id, clicked }) => {
    try {
      const { data } = await axios.patch(`${wishListurl2}/${id}`, { clicked });
      return data;
    } catch (error) {
      return "error";
    }
  }
);

export const postcoast = createAsyncThunk(
  "wishlist/postcoast",
  async ({ id, cash }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${wishListurl}/${id}`, { cash });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postcoast2 = createAsyncThunk(
  "wishlist/postcoast2",
  async ({ id, cash }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${wishListurl2}/${id}`, { cash });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postGolds = createAsyncThunk(
  "wishlist/postBagData",
  async (golddata) => {
    try {
      const { data } = await axios.post(goldurl, { golddata });
      return data;
    } catch (error) {
      return "someEwrror";
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.status = "loaded";
        state.collection = action.payload;
      })
      .addCase(getWishlistData2.fulfilled, (state, action) => {
        state.status = "loaded";
        state.charm = action.payload;
      })
      .addCase(patchWishlistData.fulfilled, (state, action) => {
        state.status = "loaded";
        const updatedItem = action.payload;
        const index = state.collection.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.collection[index] = updatedItem;
        }
      })
      .addCase(patchWishlistData2.fulfilled, (state, action) => {
        state.status = "loaded";
        const updatedItem = action.payload;
        const index = state.charm.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.charm[index] = updatedItem;
        }
      })
      .addCase(postcoast.fulfilled, (state, action) => {
        state.status = "loaded";
        const updatedItem = action.payload;
        const index = state.collection.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.collection[index] = updatedItem;
        }
      })
      .addCase(postcoast2.fulfilled, (state, action) => {
        state.status = "loaded";
        const updatedItem = action.payload;
        const index = state.charm.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.charm[index] = updatedItem;
        }
      })
      .addCase(postGolds.fulfilled, (state, action) => {
        state.status = "loaded";
        state.gold.push(action.payload);
      });
  },
});

export const selectwishlistCollection = (state) => state.wishlist.collection;
export const selectwishlistCharm = (state) => state.wishlist.charm;
export const selectWishlistStatus = (state) => state.wishlist.status;

export default wishlistSlice.reducer;
