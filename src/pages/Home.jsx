import React from "react";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import pizzas from "../components/Skeleton/pizza.json";
import Skeleton from "../components/Skeleton/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import axios from "axios";

 const Home = () => {
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
    }, [])
    return (
        <>
            {isLoading?'Loading...':''}
            <div className="content__top">
                <Categories></Categories>
                <Sort></Sort>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoading ? pizzas.map((obj) => <Skeleton key={obj.id}></Skeleton>)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj}></PizzaBlock>)
                }
            </div>
        </>
    )
}
export default Home