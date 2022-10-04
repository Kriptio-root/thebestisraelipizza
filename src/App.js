import React from "react";
import {Route, Routes} from "react-router-dom";

import './common/styles/app.scss'

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext('')

function App() {
    const  [searchValue,setSearchValue]=React.useState('')

    return (
        <div className="App">
        <div className="wrapper">
<SearchContext.Provider value={{searchValue,setSearchValue}}>
    <Header></Header>
    <div className="content">
        <Routes>
            <Route exac path='/' element={<Home/>}></Route>
            <Route exac path='/cart' element={<Cart/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
</SearchContext.Provider>
        </div>
    </div>
    )}

export default App;
