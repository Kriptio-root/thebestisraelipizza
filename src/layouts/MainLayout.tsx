import React from "react";
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";

const MainLayout:React.FunctionComponent = () => {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout