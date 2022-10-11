import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const FullPizza = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [pizza,setPizza] = React.useState()

    React.useEffect(() => {
        async function fetchPizza() {
        try{
            const {data} = await axios.get('https://63388ad3937ea77bfdc19517.mockapi.io/items/'+id)
            setPizza(data)
        }
            catch (error){
                alert('error while getting pizza')
                navigate('/')
            }
        }
        fetchPizza()
    },[])
if(!pizza){
    return 'Loading...'
}
    return(
        <PizzaBlock key={pizza.id} {...pizza}/>
    )
}

export default FullPizza