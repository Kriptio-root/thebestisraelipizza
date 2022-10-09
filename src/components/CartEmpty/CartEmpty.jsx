import React from "react";
import {Link} from "react-router-dom";
import styles from './cartEmpty.module.scss'
const CartEmpty = () => {
    return(
        <div className="cart cart--empty">
            <h2>Cart is empty <icon>😕</icon></h2>
            <p>
                You don't added any pizza yet<br/>
                To add pizza to cart go to <span className={styles.root}><Link to="/">main page</Link></span>
            </p>
            <img src="/img/empty-cart.png" alt="Empty cart"/>
            <Link to="/" className="button button--black">
                <span>Go back</span>
            </Link>
        </div>
    )
}
export default CartEmpty