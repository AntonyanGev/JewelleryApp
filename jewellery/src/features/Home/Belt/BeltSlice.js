import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    
    belt:[],
    belt2:[],
    bag:[],
    status: "loaded",
    errorMessage: ''
}

const url = "http://localhost:4005/belt"
const url2 = "http://localhost:4005/belt2"
const bagurl = "http://localhost:4005/bag"




export const getBeltData = createAsyncThunk(
    'belts/getBeltData',
    async () => {
        try {
            const {data} = await axios.get(url)
            return data
        } catch (error) {
            return "Some error message"
        }
    }
)



export const getBelt2Data = createAsyncThunk(
    'belts/getBelt2Data',
    async () => {
        try {
            const {data} = await axios.get(url2)
            return data
        } catch (error) {
            return "Some error message"
        }
    }
)


export const postBagData= createAsyncThunk(
"belts/postBagData",
async(bagdata)=>{

    try{
        const{data} = await axios.post(bagurl, bagdata)
        return data
    }catch(error){
        return "someEwrror"
    }
})


export const patchcountBelt = createAsyncThunk(
  'belts/patchcountBelt',
  async ({ id, count }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${url}/${id}`, { count });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






const beltSlice = createSlice({
    name: "belts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(getBeltData.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.belt = action.payload
            
            })
              .addCase(getBelt2Data.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.belt2 = action.payload
            
            })
            .addCase(postBagData.fulfilled,(state,action) =>{
            state.status="loaded"
            state.bag.push(action.payload)

            })
            .addCase(patchcountBelt.fulfilled,(state,action)=>{
           state.status="loaded";
            state.belt= state.belt.map((item)=> {
           if(item.id === action.payload.id){
            return action.payload
            } return item

      })
            })

   

    
       
    }})


  





    export const selectBelt = (state) => state.belts.belt
export const selectBeltStatus = (state) => state.belts.status

    export const selectBelt2 = (state) => state.belts.belt2
       export const selectBag = (state) => state.belts.bag
     
     


export default beltSlice.reducer

