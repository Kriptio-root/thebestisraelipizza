import React from "react";
import axios from "axios";
import qs from "qs"
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from "react-router-dom";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import pizzas from "../components/Skeleton/pizza.json";
import Skeleton from "../components/Skeleton/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";
import styles from "../components/CartEmpty/cartEmpty.module.scss";
import ErrorBlock from "../components/ErrorBlock/ErrorBlock";

const Home = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const categoryId = useSelector(state => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sortProperty)
    const currentPage = useSelector((state) => state.filter.currentPage)
    const sortList = useSelector(state => state.filter.sortList)
    const searchValue = useSelector(state => state.filter.searchValue)
    const {items, status} = useSelector(state => state.pizza)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = num => {
        dispatch(setCurrentPage(num))
    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sortType.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [searchValue,navigate,categoryId,sortType.sortProperty,currentPage])
//[navigate,categoryId,sortType.sortProperty,currentPage]
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sortProperty = sortList.find(obj => obj.sortProperty === params.sortType)
            dispatch(
                setFilters({
                    ...params,
                    sortProperty
                })
            )
            isSearch.current = true
        }
    }, [searchValue,navigate,categoryId,sortType.sortProperty,currentPage])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        async function fetchData() {
            const sortBy = sortType.sortProperty.toString().replace('-', '')
            const order = sortType.sortProperty.toString().includes('-') ? 'asc' : 'desc'
            const category = categoryId > 0 ? `category=${categoryId}` : ''
            const search = searchValue ? `&search=${searchValue}` : ''
            console.log(order)
            dispatch(fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            }))

        }

        if (isSearch.current === true) {
            fetchData()
        }
        isSearch.current = false

    }, [searchValue,navigate,categoryId,sortType.sortProperty,currentPage])


    console.log(items)

    const pizzasComp = items.map((obj) =><Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj}/></Link> )

    const skeletonsComp = pizzas.map((obj) => <Skeleton key={obj.id}/>)

    return (
        <div className="container">
            {status === 'loading' ? 'Loading...' : ''}
            <div className="content__top">
                <Categories val={categoryId} onChangeCategory={(i) => onChangeCategory(i)}></Categories>
                <Sort></Sort>
            </div>
            <h2 className="content__title">All pizzas</h2>
            {
                status === 'It was error while sending...' ? (
                    <ErrorBlock></ErrorBlock>
                ) : (

                    <div className="content__items">
                        {
                            status === 'loading' ? skeletonsComp : pizzasComp
                        }
                    </div>
                )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default Home