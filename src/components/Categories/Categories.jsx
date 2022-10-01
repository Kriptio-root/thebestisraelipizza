import React from 'react'

import './_categories.scss'

function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Hot Spice', 'Closed']

    const onClickCategory = event => {
        setActiveIndex(Number(event.currentTarget.id))
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => {
                    return <li
                        key={index.toString()}
                        id={index.toString()}
                        onClick={onClickCategory}
                        className={Number(activeIndex) === Number(index) ? "active" : ''}>
                        {value.toString()}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Categories