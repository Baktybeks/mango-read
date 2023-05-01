import React, {useEffect, useState} from 'react'
import Card from "../../components/card/Card"
import classes from "./mainPage.module.css"
import MuiCheckbox from "../../components/muiCheckbox/MuiCheckbox"
import {setManga} from "../../store/slices/mangaSlice"
import {useDispatch, useSelector} from "react-redux"
import AppPaginationManga from "../../components/appPaginationManga/AppPaginationManga"
import {getMangaListApi} from "../../axios/mangaApi"
import {setGenreCheckbox, setSelectedInputs, setTypeCheckbox} from "../../store/slices/filterSlice"

function MainPage() {

    const dispatch = useDispatch()

    const {manga, genreValue, typeValue, mangaList} = useSelector(state => state.mangaReducer)
    const {typeCheckbox, genreCheckbox, selectedInputs} = useSelector(state => state.filterReducer)
    console.log('selectedTypeGenre', selectedInputs)
    const {preloader} = useSelector(state => state.preloaderReducer)
    const {error} = useSelector(state => state.errorReducer)
    const [inputYears, setInputYears] = useState({inp_year_first:'', inp_year_second: ''})

    const handleClearType = () => {
        dispatch(setTypeCheckbox([]))
        setInputYears({inp_year_first:'', inp_year_second: ''})
        dispatch(setSelectedInputs({
            ...selectedInputs, selectedYears: {inp_year_first:'', inp_year_second: ''}, selectedType: []
        }))
    }
    const handleClearGenre = () => {
        dispatch(setGenreCheckbox([]))
        dispatch(setSelectedInputs({
            ...selectedInputs, "selectedGenre": []
        }))
    }


    const followBtn = () => dispatch(setManga(!manga))

    const handleYearsChange = (event) => setInputYears({
        ...inputYears,
        [event.target.name]: Number(event.target.value)
    })

    const sentTypeGenre = () => {
        let sentTypeCheckbox = []
        let sentGenreCheckbox = []
        {
            (manga ? typeValue : genreValue).map(check => {
                if (manga) {
                    if ((manga ? typeCheckbox : genreCheckbox).includes(check.title)) {
                        sentTypeCheckbox.push(check.title)
                    }
                } else {
                    if ((manga ? typeCheckbox : genreCheckbox).includes(check.title)) {
                        sentGenreCheckbox.push(check.id)
                    }
                }
            })
        }
        (manga ?
            dispatch(setSelectedInputs({
                ...selectedInputs, "selectedType": sentTypeCheckbox, "selectedYears": inputYears
            }))
            :
            dispatch(setSelectedInputs({
                ...selectedInputs, "selectedGenre": sentGenreCheckbox
            }))
        )
    }

    useEffect(() => {
        dispatch(getMangaListApi(12))
    }, [dispatch])


    // const numberInput = 2021
    // if (selectedInputs.selectedYears.inp_year_first <= numberInput && numberInput <= selectedInputs.selectedYears.inp_year_second) {
    //     console.log(numberInput, 'в интервале')
    // } else {
    //     console.log(numberInput, 'не в интервале')
    // }

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
                {preloader ? <h1 className={classes.loading}>Loading......</h1> : error ?
                    <p>{error}</p> : mangaList.map(card => <Card key={card.id} card={card}/>)}
            </section>
        </div>
        <div className={classes.pagination}>
            <AppPaginationManga limit={12}/>
        </div>
    </main>)
}

export default MainPage