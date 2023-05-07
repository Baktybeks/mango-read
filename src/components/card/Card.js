import React from 'react'
import {useNavigate} from "react-router-dom"
import classes from "./card.module.sass"
import {setGenreCheckbox, setSelectedInputs, setTypeCheckbox} from "../../store/slices/filterSlice"
import {useDispatch, useSelector} from "react-redux"

function Card({card}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {selectedInputs} = useSelector(state => state.filterReducer)

    const clickHandler = () => {
        dispatch(setTypeCheckbox([]))
        dispatch(setSelectedInputs({
            ...selectedInputs, selectedYears: {inp_year_first: '', inp_year_second: ''}, selectedType: []
        }))
        dispatch(setGenreCheckbox([]))
        dispatch(setSelectedInputs({
            ...selectedInputs, "selectedGenre": []
        }))
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