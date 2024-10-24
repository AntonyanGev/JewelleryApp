



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";   
import axios from "axios";

const initialState = {
    bagproduct: [],
    gold:[],
    status: 'idle', 
    errorMessage: ''
};

const urlBag = "http://localhost:4005/bag";
// const goldUrl= "http://localhost:4005/golds"

export const getBagData = createAsyncThunk(
    "bag/getBagData",
    async () => {
        try {
            const { data } = await axios.get(urlBag);
            return data;
        } catch (error) {
            throw error;
        }
    }
);

// export const getGolds= createAsyncThunk(
// "bag/getGolds",
// async() =>{
// try{
//     const {data}= await axios.get(goldUrl)
//     return data
// } catch(error){

//     return error
// }



// }

// )

export const deleteBeltItem = createAsyncThunk(
    "bag/deleteBeltItem",
    async (itemId) => {
        try {
            await axios.delete(`${urlBag}/${itemId}`);
            return itemId;
        } catch (error) {
            throw error;
        }
    }
);


export const patchBagCoast = createAsyncThunk(
    'bag/patchBagCoast',
    async ({ id, cash }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${urlBag}/${id}`, { cash });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);



export const patchImg = createAsyncThunk(
    'bag/patchImg',
    async ({ id, img }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${urlBag}/${id}`, { img });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update count");
        }
    }
);




export const deleteBagElement = createAsyncThunk(
    "bag/deleteBagelement",
    async (id) => {
        try {
            await axios.delete(`${urlBag}/${id}`);
            return id;
        } catch (error) {
            throw error;
        }
    }
);

const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBagData.fulfilled, (state, action) => {
                state.status = "loaded";
                state.bagproduct = action.payload;
            })
            // .addCase(getGolds.fulfilled,(state,action)=>{
            //     state.status= "loaded"
            //     state.gold= action.payload
            // })

            .addCase(patchBagCoast.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedItem = action.payload;
                const index = state.bagproduct.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.bagproduct[index] = updatedItem;
                }
            })

          .addCase(deleteBagElement.fulfilled, (state, action) => {
                 state.status = "loaded";
            state.bagproduct = state.bagproduct.filter(item =>
            item.id !== action.payload
    );
})
.addCase(patchImg.fulfilled,(state,action)=>{
    state.status="loaded"
    state.bagproduct= state.bagproduct.map((item)=> item.img = null)
})
    
        
}});

export const selectBagProducts = (state) => state.bag.bagproduct;
export const goldsData = (state) => state.bag.gold

export default bagSlice.reducer;














// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";    
// import axios from "axios";

// const initialState = {
//     bagproduct: [],
//     gold:[],
//     status: 'idle', 
//     errorMessage: ''
// };

// const urlBag = "http://localhost:4005/bag";
// // const goldUrl= "http://localhost:4005/golds"

// export const getBagData = createAsyncThunk(
//     "bag/getBagData",
//     async () => {
//         try {
//             const { data } = await axios.get(urlBag);
//             return data;
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// // export const getGolds= createAsyncThunk(
// // "bag/getGolds",
// // async() =>{
// // try{
// //     const {data}= await axios.get(goldUrl)
// //     return data
// // } catch(error){

// //     return error
// // }



// // }

// // )

// export const deleteBeltItem = createAsyncThunk(
//     "bag/deleteBeltItem",
//     async (itemId) => {
//         try {
//             await axios.delete(`${urlBag}/${itemId}`);
//             return itemId;
//         } catch (error) {
//             throw error;
//         }
//     }
// );


// export const patchBagCoast = createAsyncThunk(
//     'bag/patchBagCoast',
//     async ({ id, cash }, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.patch(`${urlBag}/${id}`, { cash });
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to update count");
//         }
//     }
// );



// export const patchImg = createAsyncThunk(
//     'bag/patchImg',
//     async ({ id, img }, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.patch(`${urlBag}/${id}`, { img });
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to update count");
//         }
//     }
// );




// export const deleteBagElement = createAsyncThunk(
//     "bag/deleteBagelement",
//     async (id) => {
//         try {
//             await axios.delete(`${urlBag}/${id}`);
//             return id;
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// const bagSlice = createSlice({
//     name: "bag",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getBagData.fulfilled, (state, action) => {
//                 state.status = "loaded";
//                 state.bagproduct = action.payload;
//             })
//             // .addCase(getGolds.fulfilled,(state,action)=>{
//             //     state.status= "loaded"
//             //     state.gold= action.payload
//             // })

//             .addCase(patchBagCoast.fulfilled, (state, action) => {
//                 state.status = 'loaded';
//                 const updatedItem = action.payload;
//                 const index = state.bagproduct.findIndex(item => item.id === updatedItem.id);
//                 if (index !== -1) {
//                     state.bagproduct[index] = updatedItem;
//                 }
//             })

//           .addCase(deleteBagElement.fulfilled, (state, action) => {
//                  state.status = "loaded";
//             state.bagproduct = state.bagproduct.filter(item =>
//             item.id !== action.payload
//     );
// })
// .addCase(patchImg.fulfilled,(state,action)=>{
//     state.status="loaded"
//     state.bagproduct= state.bagproduct.map((item)=> item.img = null)
// })
    
        
// }});

// export const selectBagProducts = (state) => state.bag.bagproduct;
// export const goldsData = (state) => state.bag.gold

// export default bagSlice.reducer;






