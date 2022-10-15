import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";

interface sortPropertyState {
    name: string;
    sortProperty: string;
}

export interface sortListState {
    name: string;
    sortProperty: string;
}

// Define a type for the slice state
interface FilterState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sortProperty:sortPropertyState,
    sortList: sortListState[],
}

const initialState:FilterState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sortProperty: {
        name: 'popularity',
        sortProperty: 'rating'
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
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action:PayloadAction<sortPropertyState>) {
            state.sortProperty = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action:PayloadAction<any>) {
            state.currentPage = Number(action.payload.currentPage)
            state.sortProperty = action.payload.sortProperty
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer