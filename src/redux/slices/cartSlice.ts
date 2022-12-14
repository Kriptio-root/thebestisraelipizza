import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type CartItem = {
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    type:number[],
    size:number[],
    count:number
}

interface CartSliceState {
    categoryId: number,
    items:CartItem[],
    totalPrice:number,
}

const initialState:CartSliceState = {
    categoryId: 0,
    items:[],
    totalPrice:0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state,action){
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum
            },0)
        },
        removeItem(state,action:PayloadAction<string>){
            state.items=state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state){
            state.items=[]
            state.totalPrice=0
        },
        plusItem(state, action:PayloadAction<string>){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem){
                findItem.count++
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum
            },0)

        },
        minusItem(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.count !== 0)
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem){
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum
            },0)
        },
    }
})

 export const selectCart = (state:RootState) => state.cart

export  const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer