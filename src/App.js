import React from "react";
import axios from "axios";
import './common/styles/app.scss'
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";

function App() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

React.useEffect(() => {
    async function fetchData() {
        setIsLoading(true)
        try {
            const [itemsResponse] = await Promise.all([
                axios.get('https://63388ad3937ea77bfdc19517.mockapi.io/items'),
            ])

            setIsLoading(false)
            setItems(itemsResponse.data);
        } catch (error) {
            alert('Error while sending data  request')
        }

        setIsLoading(false)

    }

    fetchData();
},[])

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
                        {items.map((obj) => (
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
