import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import classes from "./mainPage.module.sass"

import {getMangaListApi} from "../../axios/mangaApi"

import Card from "../../components/card/Card"
import MuiCheckbox from "../../components/muiCheckbox/MuiCheckbox"
import AppPaginationManga from "../../components/appPaginationManga/AppPaginationManga"
import AppPaginationFilteredManga from "../../components/appPaginationFilteredManga/AppPaginationFilteredManga"

import {
    setGenreCheckbox, setInputYears,
    setSelectedInputs,
    setTypeCheckbox
} from "../../store/slices/filterSlice"

function MainPage() {

    const dispatch = useDispatch()

    const {genreValue, typeValue, mangaList} = useSelector(state => state.mangaReducer)
    const {
        typeCheckbox,
        genreCheckbox,
        selectedInputs,
        filteredManga,
        inputYears
    } = useSelector(state => state.filterReducer)
    const {preloader, preloaderFilter} = useSelector(state => state.preloaderReducer)
    const {error} = useSelector(state => state.errorReducer)

    const [manga, setManga] = useState(true)
    const [isEmptyType, setIsEmptyType] = useState(true)
    const [isEmptyGenre, setIsEmptyGenre] = useState(true)
    const [isFilter, setIsFilter] = useState(true)

    const isEmptyFilter = () => {
        isEmptyType && isEmptyGenre
            ? setIsFilter(true)
            : setIsFilter(false)
    }

    const handleClearType = () => {
        dispatch(setTypeCheckbox([]))
        dispatch(setInputYears({inp_year_first: '', inp_year_second: ''}))
        dispatch(setSelectedInputs({
            ...selectedInputs, selectedYears: {inp_year_first: '', inp_year_second: ''}, selectedType: []
        }))
        setIsEmptyType(true)
    }

    const handleClearGenre = () => {
        dispatch(setGenreCheckbox([]))
        dispatch(setSelectedInputs({
            ...selectedInputs, "selectedGenre": []
        }))
        setIsEmptyGenre(true)
    }

    const followBtn = () => setManga(!manga)

    const handleYearsChange = (event) => dispatch(setInputYears({
        ...inputYears, [event.target.name]: Number(event.target.value)
    }))

    const sentTypeGenre = () => {
        let sentTypeCheckbox = []
        let sentGenreCheckbox = [];
        (manga ? typeValue : genreValue).filter(check => {
            return manga ? typeCheckbox.includes(check.title) : genreCheckbox.includes(check.title)
        }).map(filteredCheck => {
            return manga ? sentTypeCheckbox.push(filteredCheck.title) : sentGenreCheckbox.push(filteredCheck.id)
        })
        if (manga) {
            (sentTypeCheckbox.length || inputYears.inp_year_first || inputYears.inp_year_second)
                ? setIsEmptyType(false)
                : setIsEmptyType(true)
            dispatch(setSelectedInputs({
                ...selectedInputs, "selectedType": sentTypeCheckbox, "selectedYears": inputYears
            }))
        } else {
            (sentGenreCheckbox.length) ? setIsEmptyGenre(false) : setIsEmptyGenre(true)
            dispatch(setSelectedInputs({
                ...selectedInputs, "selectedGenre": sentGenreCheckbox
            }))
        }
    }
    useEffect(() => {
        dispatch(getMangaListApi(3))
        isEmptyFilter()
    }, [dispatch, isEmptyType, isEmptyGenre])

    return (<main className={`container ${classes.main}`}>
        <div className={classes.main_box}>
            <aside className={classes.main__aside}>
                {manga ? <div className={classes.main__aside_manga_type} onClick={followBtn}>
                    Жанры
                    <div className={classes.nav}>
                        все <span className={classes.nav_arrow_right}></span>
                    </div>
                </div> : <div className={classes.main__aside_manga_genre} onClick={followBtn}>
                    <div className={classes.nav}>
                        <span className={classes.nav_arrow_left}></span> Назад
                    </div>
                </div>}
                <div className={`${classes.main__aside_types} ${!manga ? classes.type_true : ''}`}>
                    <MuiCheckbox muiCheckbox={manga ? typeValue : genreValue} manga={manga}/>
                </div>
                <div className={`${classes.main__aside_years} ${!manga ? classes.type_true : ""}`}>
                    <input className={classes.input}
                           type="number"
                           name="inp_year_first"
                           placeholder="От 0"
                           value={inputYears.inp_year_first}
                           onChange={handleYearsChange}
                    />
                    <div className={classes.hyphen}></div>
                    <input className={classes.input}
                           type="number"
                           name="inp_year_second"
                           placeholder="До 2022"
                           value={inputYears.inp_year_second}
                           onChange={handleYearsChange}
                    />
                </div>
                <div className={classes.main__aside_btn}>
                    <button className={classes.btn} onClick={manga ? handleClearType : handleClearGenre}>Сбросить
                    </button>
                    <button className={classes.btn} onClick={sentTypeGenre}>Применить</button>
                </div>
            </aside>
            <section className={classes.main__card}>
                {preloader ?
                    <h1 className={classes.loading}>Loading......</h1>
                    :
                    error
                        ?
                        <p>{error}</p>
                        :
                        preloaderFilter ?
                            <h1 className={classes.loading}>Loading......</h1>
                            :
                            filteredManga.length === 0 ?
                                <div style={{fontFamily: 'Montserrat', fontSize: '24px'}}>по вашему запросу ничего не
                                    найдено</div>
                                :
                                (isFilter ? mangaList : filteredManga).map(card => <Card key={card.id} card={card}/>)
                }
            </section>
        </div>
        <div className={classes.pagination}>
            {isFilter ? <AppPaginationManga limit={12}/> : <AppPaginationFilteredManga/>}
        </div>
    </main>)
}

export default MainPage