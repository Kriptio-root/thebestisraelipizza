import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage
        } = params
        const { data } = await axios.get(
            `https://63388ad3937ea77bfdc19517.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        console.log('itemsResponse')
        console.log(data)
        return data
    })

const initialState = {
    items: [],
    status: ''
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log(action)
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'It was error while sending...'
            state.items = []
        },
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer