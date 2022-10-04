import React from "react";
import axios from "axios";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import pizzas from "../components/Skeleton/pizza.json";
import Skeleton from "../components/Skeleton/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";

 const Home = () => {
    const [items, setItems] = React.useState([]);
     const [categoryId,setCategoryId] = React.useState(0);
     const [sortType,setSortType] = React.useState({
         name:'popularity',sortProperty:'rating'
     });
    const [isLoading, setIsLoading] = React.useState(true);
    const  [currentPage,setCurrentPage] = React.useState(1 )
     const {searchValue} =React.useContext(SearchContext)

    React.useEffect(() => {
        async function fetchData() {
            setIsLoading(true)

            const sortBy = sortType.sortProperty.toString().replace('-','')
            const order = sortType.sortProperty.toString().includes('-')?'asc':'desc'
            const category = categoryId>0?`category=${categoryId}`:''
            const search = searchValue ? `&search=${searchValue}`:''

            try {
                const [itemsResponse] = await Promise.all([
                    axios.get(`https://63388ad3937ea77bfdc19517.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`),
                ])

                setIsLoading(false)
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Error while sending data  request')
            }

            setIsLoading(false)

        }

        fetchData();
        window.scrollTo(0,0)
    }, [categoryId,sortType,searchValue,currentPage])

     // const pizzasComp = items.filter(obj => {
     //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
     //         return true
     //     }
     //     else {
     //         return false
     //     }
     // }).map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
     //    locall render search
     const pizzasComp = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

     const skeletonsComp = pizzas.map((obj) => <Skeleton key={obj.id}/>)

    return (
        <div className="container">
            {isLoading?'Loading...':''}
            <div className="content__top">
                <Categories val={categoryId} onChangeCategory={(i)=>setCategoryId(i)}></Categories>
                <Sort sortType={sortType} onChangeSort={(i)=>setSortType(i)}></Sort>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoading ? skeletonsComp : pizzasComp
                }
            </div>
<Pagination onChangePage={(num)=> setCurrentPage(num)}/>
        </div>
    )
}
export default Home