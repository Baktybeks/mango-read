import React from 'react';
// import {useNavigate} from "react-router-dom";
import classes from "./card.module.css";
import card from "../../assets/images/card.png"

function Card() {
    // const navigate = useNavigate()

    // const clickHandler = () => navigate(`/products/${product.product_slug}`)
    // let sliceName = product.name.slice(0,16);
    // if (sliceName.length < product.name.length) {
    //     sliceName += '...';
    // }

    return (
        <div className={classes.card}>
            <img className={classes.card__img} src={card} alt="card"/>
            <div className={classes.card__info}>
                <div className={classes.card__info_year}>Год: 2000</div>
                <div className={classes.card__info_title}>Название аниме оно может быть ...</div>
            </div>
        </div>
    );
}

export default Card;