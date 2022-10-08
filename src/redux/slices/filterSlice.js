import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortProperty: {
        name:'popularity',
        sortProperty:'rating'
    },
  sortList: [
        {name: 'popularity(DESC)', sortProperty: 'rating'},
        {name: 'popularity(ASC)', sortProperty: '-rating'},
        {name: 'price(DESC)', sortProperty: 'price'},
        {name: 'price(ASC)', sortProperty: '-price'},
        {name: 'alphabet(DESC)', sortProperty: 'alphabet'},
        {name: 'alphabet(ASC)', sortProperty: '-alphabet'}
    ],
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state,action){
            state.categoryId = action.payload
        },
        setSort(state,action){
            state.sortProperty=action.payload
        },
        setCurrentPage(state,action) {
            state.currentPage = action.payload
        },
        setFilters(state,action){
            console.log('action.payload')
            console.log(action.payload)
           state.currentPage = Number(action.payload.currentPage)
            state.sortProperty = action.payload.sortProperty
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})

export  const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer