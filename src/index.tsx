import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import './index.css';
import App from './App';

const rootElement =document.getElementById('root')
if (rootElement){
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                    <App></App>
            </BrowserRouter>
        </Provider>
    );
}
else{
alert('Something went wrong,please reload the page.')
}



