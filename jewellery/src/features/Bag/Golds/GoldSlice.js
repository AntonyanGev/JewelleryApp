


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    goldenLetters: [],
    status: 'loaded',
};

const goldUrl = "http://localhost:4005/golds";

export const getGoldsData = createAsyncThunk(
    "gold/getGoldsData",
    async () => {
        try {
            const { data } = await axios.get(goldUrl);
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const patchGoldsCount = createAsyncThunk(
    "gold/patchGoldsCount",
    async ({ id, count, cash }) => {
        try {
            const itemPrice = count * cash;
            const { data } = await axios.patch(`${goldUrl}/${id}`, { count, itemPrice });
            return { id, count, itemPrice };
        } catch (error) {
            return error;
        }
    }
);

export const patchGoldsCountDecrement = createAsyncThunk(
    "gold/patchGoldsCountDecrement",
    async ({ id, count, cash }) => {
        try {
            const itemPrice = count * cash;
            const { data } = await axios.patch(`${goldUrl}/${id}`, { count, itemPrice });
            return { id, count, itemPrice };
        } catch (error) {
            return error;
        }
    }
);

export const patchCash = createAsyncThunk(
    "gold/patchCash",
    async ({ id, cash, count }) => {
        try {
            const itemPrice = count * cash;
            const { data } = await axios.patch(`${goldUrl}/${id}`, { cash, itemPrice });
            return { id, cash, itemPrice };
        } catch (error) {
            return error;
        }
    }
);

export const deleteGoldItem = createAsyncThunk(
    "gold/deleteGoldItem",
    async (id) => {
        try {
            await axios.delete(`${goldUrl}/${id}`);
            return id;
        } catch (error) {
            return error;
        }
    }
);

const goldSlice = createSlice({
    name: "gold",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGoldsData.fulfilled, (state, action) => {
                state.status = "loaded";
                state.goldenLetters = action.payload;
            })
            .addCase(patchGoldsCount.fulfilled, (state, action) => {
                state.status = "loaded";
                state.goldenLetters = state.goldenLetters.map((item) =>
                    item.id === action.payload.id ? { ...item, golddata: { ...item.golddata, count: action.payload.count, itemPrice: action.payload.itemPrice } } : item
                );
            })
            .addCase(patchGoldsCountDecrement.fulfilled, (state, action) => {
                state.status = "loaded";
                state.goldenLetters = state.goldenLetters.map((item) =>
                    item.id === action.payload.id ? { ...item, golddata: { ...item.golddata, count: action.payload.count, itemPrice: action.payload.itemPrice } } : item
                );
            })
            .addCase(patchCash.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.goldenLetters = state.goldenLetters.map((item) =>
                    item.id === action.payload.id ? { ...item, golddata: { ...item.golddata, cash: action.payload.cash, itemPrice: action.payload.itemPrice } } : item
                );
            })
            .addCase(deleteGoldItem.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.goldenLetters = state.goldenLetters.filter(item => item.id !== action.payload);
            });
    },
});

export const goldenSlice = (state) => state.gold.goldenLetters;
export default goldSlice.reducer;











