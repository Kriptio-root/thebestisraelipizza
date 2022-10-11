import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";

import './common/styles/app.scss'

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import {useDispatch, useSelector} from "react-redux";
import MainLayout from "./layouts/MainLayout";

export const SearchContext = React.createContext('')

function App() {

    const filter = useSelector((state) => state.filter.value)
    const dispatch = useDispatch()

    return (
        <Routes>
        <Route path='/' element={<MainLayout/>}>
            <Route exac path='' element={<Home/>} />
            <Route exac path='cart' element={<Cart/>} />
            <Route path='pizza/:id' element={<FullPizza/>} />
            <Route path='*' element={<NotFound/>} />
        </Route>
        </Routes>
    )}

export default App;
