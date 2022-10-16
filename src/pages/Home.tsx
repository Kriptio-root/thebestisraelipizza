import React from "react";
import qs from "qs"
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from "react-router-dom";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import pizzas from "../components/Skeleton/pizza.json";
import Skeleton from "../components/Skeleton/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";
import ErrorBlock from "../components/ErrorBlock/ErrorBlock";
import {RootState} from "../redux/store";

const Home: React.FunctionComponent = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const categoryId = useSelector((state: RootState) => state.filter.categoryId)
    const sortType = useSelector((state: RootState) => state.filter.sortProperty)
    const currentPage = useSelector((state: RootState) => state.filter.currentPage)
    const sortList = useSelector((state: RootState) => state.filter.sortList)
    const searchValue = useSelector((state: RootState) => state.filter.searchValue)
    const {items, status} = useSelector((state: RootState) => state.pizza)

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])
    const onChangePage = (num: number) => {
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
    }, [searchValue, navigate, categoryId, sortType.sortProperty, currentPage])
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
    }, [searchValue, navigate, categoryId, sortType.sortProperty, currentPage])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        async function fetchData() {
            const sortBy = sortType.sortProperty.toString().replace('-', '')
            const order = sortType.sortProperty.toString().includes('-') ? 'asc' : 'desc'
            const category = categoryId > 0 ? `category=${categoryId}` : ''
            const search = searchValue ? `&search=${searchValue}` : ''
            // @ts-ignore
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

    }, [searchValue, navigate, categoryId, sortType.sortProperty, currentPage])

    const pizzasComp = items.map((obj: any) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj}/></Link>)

    const skeletonsComp = pizzas.map((obj) => <Skeleton key={obj.id}/>)

    return (
        <div className="container">
            {status === 'loading' ? 'Loading...' : ''}
            <div className="content__top">
                <Categories val={categoryId} onChangeCategory={(i: number) => onChangeCategory(i)}></Categories>
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