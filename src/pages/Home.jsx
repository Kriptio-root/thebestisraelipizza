import React from "react";
import axios from "axios";
import qs from "qs"
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import pizzas from "../components/Skeleton/pizza.json";
import Skeleton from "../components/Skeleton/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

 const Home = () => {
     const navigate =useNavigate()

     const dispatch = useDispatch()

     const isSearch = React.useRef(false)
     const isMounted = React.useRef(false)

     const categoryId = useSelector(state => state.filter.categoryId)
     const sortType = useSelector((state) => state.filter.sortProperty)
     const currentPage = useSelector((state) => state.filter.currentPage)
     const sortList = useSelector(state => state.filter.sortList)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
     const {searchValue} =React.useContext(SearchContext)

     const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
     }
     const onChangePage = num => {
         dispatch(setCurrentPage(num))
      }

     React.useEffect(() => {
         console.log(isMounted.current)
         if (isMounted.current){
             const queryString = qs.stringify({
                 sortType:sortType.sortProperty,
                 categoryId,
                 currentPage,
             })
             navigate(`?${queryString}`)
         }
         isMounted.current=true
     },[navigate,categoryId,sortType.sortProperty,currentPage])

     React.useEffect(() => {
         if (window.location.search) {
             const params =qs.parse(window.location.search.substring(1))
             const sortProperty = sortList.find(obj => obj.sortProperty === params.sortType)
             dispatch(
                 setFilters({
                     ...params,
                     sortProperty
                 })
             )
             isSearch.current = true
         }
     })

    React.useEffect(() => {
        window.scrollTo(0,0)
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
        if (isSearch.current===true) {
            fetchData()
        }
        isSearch.current=false

    }, [categoryId,sortType.sortProperty,searchValue,currentPage])


     const pizzasComp = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

     const skeletonsComp = pizzas.map((obj) => <Skeleton key={obj.id}/>)

    return (
        <div className="container">
            {isLoading?'Loading...':''}
            <div className="content__top">
                <Categories val={categoryId} onChangeCategory={(i)=>onChangeCategory(i)}></Categories>
                <Sort></Sort>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoading ? skeletonsComp : pizzasComp
                }
            </div>
<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default Home