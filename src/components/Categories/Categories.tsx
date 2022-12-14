import React from 'react'

import './_categories.scss'

type CategoriesProps ={
    val:number,
    onChangeCategory:(i:number)=>void
}

const Categories:React.FunctionComponent<CategoriesProps> = React.memo(
    ({val, onChangeCategory}) => {
        const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Hot Spice', 'Closed']

        return (
            <div className="categories">
                <ul>
                    {categories.map((categoryName, index) => {
                        return <li
                            key={index.toString()}
                            id={index.toString()}
                            onClick={() => onChangeCategory(index)}
                            className={Number(val) === Number(index) ? "active" : ''}>
                            {categoryName.toString()}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
)

export default Categories