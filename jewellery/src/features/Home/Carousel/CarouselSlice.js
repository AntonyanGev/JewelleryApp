
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carousel: [],
    carouselsecond: [],
    status: "idle",
    errorMessage: ''
};

const url = "http://localhost:4005/carousel";
const url2 = "http://localhost:4005/carousel2";

export const getData = createAsyncThunk(
    'home/getData',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carousel data");
        }
    }
);

export const getData2 = createAsyncThunk(
    'home/getData2',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(url2);
            console.log(data, 'data->2');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carouselsecond data");
        }
    }
);

export const postData = createAsyncThunk(
    'home/postData',
    async ({ id, clicked }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/${id}`, { clicked });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update clicked status");
        }
    }
);

export const post2Data = createAsyncThunk(
    'home/post2Data',
    async ({ id, clicked }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url2}/${id}`, { clicked });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update clicked status");
        }
    }
);

export const patchcoast = createAsyncThunk(
    'home/patchcoast',
    async ({ id, cash }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/${id}`, { cash });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cash");
        }
    }
);

export const patchcoast2 = createAsyncThunk(
    'home/patchcoast2',
    async ({ id, cash }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url2}/${id}`, { cash });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cash");
        }
    }
);

export const patchcount = createAsyncThunk(
    'home/patchcount',
    async ({ id, count }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/${id}`, { count });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);



export const patchcountDecrement = createAsyncThunk(
    'home/patchcountDecrement',
    async ({ id, count }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url}/${id}`, { count });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);

export const patchcountDecrement2 = createAsyncThunk(
    'home/patchcountDecrement2',
    async ({ id, count }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url2}/${id}`, { count });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);



export const patchcount2 = createAsyncThunk(
    'home/patchcount2',
    async ({ id, count }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${url2}/${id}`, { count });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);

const carouselSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carousel = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(getData2.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getData2.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carouselsecond = action.payload;
            })
            .addCase(getData2.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(postData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedItem = action.payload;
                const index = state.carousel.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.carousel[index] = updatedItem;
                }
            })
            .addCase(postData.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(post2Data.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(post2Data.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedItem2 = action.payload;
                const index = state.carouselsecond.findIndex(item => item.id === updatedItem2.id);
                if (index !== -1) {
                    state.carouselsecond[index] = updatedItem2;
                }
            })
            .addCase(post2Data.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(patchcoast.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(patchcoast.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedItem = action.payload;
                const index = state.carousel.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.carousel[index] = updatedItem;
                }
            })
            .addCase(patchcoast.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(patchcoast2.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(patchcoast2.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedItem = action.payload;
                const index = state.carouselsecond.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.carouselsecond[index] = updatedItem;
                }
            })
            .addCase(patchcoast2.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(patchcount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(patchcount.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carousel = state.carousel.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
            })

             .addCase(patchcountDecrement.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carousel = state.carousel.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
            })

                .addCase(patchcountDecrement2.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carousel = state.carouselsecond.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
            })
            .addCase(patchcount.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            })
            .addCase(patchcount2.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(patchcount2.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.carouselsecond = state.carouselsecond.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
            })
            .addCase(patchcount2.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
            });
    }
});

export const selectCarousel = (state) => state.home.carousel;
export const selectCarousel2 = (state) => state.home.carouselsecond;
export const selectStatus = (state) => state.home.status;

export default carouselSlice.reducer;
