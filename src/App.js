import React from "react";
import {Route, Routes} from "react-router-dom";

import './common/styles/app.scss'

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

function App() {
    return (<div className="App">
        <div className="wrapper">
            <Header></Header>
            <div className="content">
                    <Routes>
                        <Route exac path='/' element={<Home/>}></Route>
                        <Route exac path='/cart' element={<Cart/>}></Route>
                        <Route path='*' element={<NotFound/>}></Route>
                    </Routes>
            </div>
        </div>
    </div>);
}

export default App;
