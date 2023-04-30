import React, {useEffect} from 'react'
import Card from "../../components/card/Card"
import classes from "./mainPage.module.css"
import MuiCheckbox from "../../components/muiCheckbox/MuiCheckbox"
import {
    setGenreCheckbox,
    setManga, setSelectedTypeGenre,
    setTypeCheckbox,
    setYearsManga
} from "../../store/slices/mangaSlice"
import {useDispatch, useSelector} from "react-redux"
import {getGenreListApi, getMangaListApi} from "../../axios/mangaApi"
import {checkAuthApi} from "../../axios/usersApi"
import {setLogout} from "../../store/slices/usersSlice"

function MainPage() {

    const dispatch = useDispatch()

    const {
        manga,
        inputYears,
        genreValue,
        typeValue,
        typeCheckbox,
        genreCheckbox,
        selectedTypeGenre,
        mangaList
    } = useSelector(state => state.mangaReducer)

    const {preloader} = useSelector(state => state.preloaderReducer)
    const {error} = useSelector(state => state.errorReducer)

    const handleClearType = () => dispatch(setTypeCheckbox([]))
    const handleClearGenre = () => dispatch(setGenreCheckbox([]))

    const followBtn = () => dispatch(setManga(!manga))

    const handleYearsChange = (event) =>
        dispatch(setYearsManga({...inputYears, [event.target.name]: Number(event.target.value)}))

    useEffect(() => {
        dispatch(getGenreListApi())
        dispatch(getMangaListApi(12))
        if (localStorage.getItem('CHECKED')){
            dispatch(checkAuthApi())
        } else {
            dispatch(setLogout())
        }

    }, [dispatch])

    console.log('mangaList',mangaList)

    const sentTypeGenre = () => {

        let sentTypeCheckbox = []
        let sentGenreCheckbox = []

        {(manga ? typeValue : genreValue).map(check => {
                if (manga) {
                    if ((manga ? typeCheckbox : genreCheckbox).includes(check.title)) {
                        sentTypeCheckbox.push(check.title)
                    }
                } else {
                    if ((manga ? typeCheckbox : genreCheckbox).includes(check.title)) {
                        sentGenreCheckbox.push(check.id)
                    }
                }
            }
        )}
        (manga
            ?
            dispatch(setSelectedTypeGenre({...selectedTypeGenre, "selectedType": sentTypeCheckbox}))
            :
            dispatch(setSelectedTypeGenre({...selectedTypeGenre, "selectedGenre": sentGenreCheckbox}))
        )
    }


    // const numberInput = 2021
    // if (inputYears.inp_year_first <= numberInput && numberInput <= inputYears.inp_year_second) {
    //     console.log(numberInput, 'в интервале')
    // } else {
    //     console.log(numberInput,'не в интервале')
    // }

    return (
        <main className={`container ${classes.main}`}>
            <aside className={classes.main__aside}>
                {
                    manga ?
                        <div className={classes.main__aside_manga_type} onClick={followBtn}>
                            Жанры
                            <div className={classes.nav}>
                                все <span className={classes.nav_arrow_right}></span>
                            </div>
                        </div>
                        :
                        <div className={classes.main__aside_manga_genre} onClick={followBtn}>
                            <div className={classes.nav}>
                                <span className={classes.nav_arrow_left}></span> Назад
                            </div>
                        </div>
                }

                <div className={`${classes.main__aside_types} ${!manga ? classes.type_true : ''}`}>

                    <MuiCheckbox muiCheckbox={manga ? typeValue : genreValue} manga={manga}/>

                </div>
                <div className={`${classes.main__aside_years} ${!manga ? classes.type_true : ""}`}>
                    <input className={classes.input}
                           type="number"
                           name="inp_year_first"
                           placeholder="От 0"
                           onChange={handleYearsChange}
                    />
                    <div className={classes.hyphen}></div>
                    <input className={classes.input}
                           type="number"
                           name="inp_year_second"
                           placeholder="До 2022"
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
                {
                    preloader
                        ?
                        <h1 className={classes.loading}>Loading......</h1>
                        :
                        error
                            ?
                            <p>{error}</p>
                            :
                            // ''
                            mangaList.map(card => <Card key={card.id} card={card}/>)
                }
            </section>
        </main>
    )
}

export default MainPage