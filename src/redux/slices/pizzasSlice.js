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
        const {data} = await axios.get(
            `https://63388ad3937ea77bfdc19517.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
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
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending,
            (state) => {
                state.status = 'loading'
                state.items = []
            }
        )
            builder.addCase(fetchPizzas.fulfilled,
                (state, action) => {
                    state.items = action.payload
                    state.status = 'success'
                }
            )
            builder.addCase(fetchPizzas.rejected,
                (state) => {
                    state.status = 'It was error while sending...'
                    state.items = []
                }
            )
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer