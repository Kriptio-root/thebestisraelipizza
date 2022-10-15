"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("react-dom/client");
var store_1 = require("./redux/store");
var react_redux_1 = require("react-redux");
require("./index.css");
var App_tsx_1 = require("./App.tsx");
var root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_redux_1.Provider store={store_1.store}>
        <react_router_dom_1.BrowserRouter>
            <react_1.default.StrictMode>
                <App_tsx_1.default></App_tsx_1.default>
            </react_1.default.StrictMode>
        </react_router_dom_1.BrowserRouter>
    </react_redux_1.Provider>);
