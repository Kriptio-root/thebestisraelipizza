import './common/styles/app.scss'
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";

import pizzas from './common/db/pizza.json'

function App() {
    return (<div className="App">
        <div className="wrapper">
            <Header></Header>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories></Categories>
                        <Sort></Sort>
                    </div>
                    <h2 className="content__title">All pizzas</h2>
                    <div className="content__items">
                        {pizzas.map((obj) => (
                            <PizzaBlock
                                key={obj.id}
                                {...obj}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default App;
