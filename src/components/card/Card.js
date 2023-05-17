import React from 'react'
import {useNavigate} from "react-router-dom"
import classes from "./card.module.sass"

function Card({card}) {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/info/${card.id}/`)
    }

    let sliceName = card.ru_name.slice(0,20)
    if (sliceName.length < card.ru_name.length) {
        sliceName += '...'
    }

    return (
        <div className={classes.card} onClick={clickHandler}>
                    <img className={classes.card__img} src={card.image} alt="card"/>
                    <div className={classes.card__info}>
                        <div className={classes.card__info_year}>Год: {card.issue_year}</div>
                        <div className={classes.card__info_title}>{sliceName}</div>
                    </div>
        </div>
    )
}

export default Card