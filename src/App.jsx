"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchContext = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./common/styles/app.scss");
var Home_1 = require("./pages/Home");
var NotFound_1 = require("./pages/NotFound");
var Cart_1 = require("./pages/Cart");
var FullPizza_1 = require("./pages/FullPizza");
var react_redux_1 = require("react-redux");
var MainLayout_1 = require("./layouts/MainLayout");
exports.SearchContext = react_1.default.createContext('');
function App() {
    var filter = (0, react_redux_1.useSelector)(function (state) { return state.filter.value; });
    var dispatch = (0, react_redux_1.useDispatch)();
    return (<react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<MainLayout_1.default />}>
            <react_router_dom_1.Route path='' element={<Home_1.default />}/>
            <react_router_dom_1.Route path='cart' element={<Cart_1.default />}/>
            <react_router_dom_1.Route path='pizza/:id' element={<FullPizza_1.default />}/>
            <react_router_dom_1.Route path='*' element={<NotFound_1.default />}/>
        </react_router_dom_1.Route>
        </react_router_dom_1.Routes>);
}
exports.default = App;
