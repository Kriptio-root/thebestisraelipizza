import React from "react";
import {Link} from "react-router-dom";
import styles from './ErrorBlock.module.scss'
const ErrorBlock = () => {
    return(
        <div className="cart cart--empty">
            <h2>It was error while sending data... <icon>😕</icon></h2>
            <p>
               Impossible to get pizzas<br/>
              Try to reload or go to <span className={styles.root}><Link to="/">main page</Link></span>
            </p>
            <img src="/img/empty-cart.png" alt="Empty cart"/>
            <Link to="/" className="button button--black">
                <span>Go back</span>
            </Link>
        </div>
    )
}
export default ErrorBlock