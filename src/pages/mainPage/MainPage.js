import React from 'react';
import Card from "../../components/card/Card";
import classes from "./mainPage.module.css";
import MuiCheckbox from "../../components/muiCheckbox/MuiCheckbox";
import {setGenreManga, setManga, setTypeManga} from "../../store/slices/mangaSlice";
import {useDispatch, useSelector} from "react-redux";

const typeManga = ["Манга","Манхва","Комиксы","Маньхуа"]
const genreManga = ["Боевик","Боевые искусства","Гарем","Гендерная интрига", "Героическое фэнтези",
    "Детектив","Дзёсэй","Додзинси","Драма","Игра","История","Киберпанк","Кодомо",
    "Детектив","Дзёсэй","Додзинси","Драма","Игра","История","Киберпанк","Кодомо",]



function MainPage() {

    const dispatch = useDispatch()

    const handleClearType=() => dispatch(setTypeManga([]))
    const handleClearGenre=() => dispatch(setGenreManga([]))

    const {manga} = useSelector(state => state.mangaReducer)
    console.log(manga)

    const toGenreBtn = () => {
        dispatch(setManga(!manga))
    }

    return (
        <main className={`container ${classes.main}`}>
            <aside className={classes.main__aside}>
                <div className={classes.main__aside_genre}>
                    Жанры
                    <div className={classes.nav} onClick={toGenreBtn}>
                        все <span className={classes.nav_arrow_right}></span>
                    </div>
                </div>
                <div className={classes.main__aside_type}>

                    <MuiCheckbox muiCheckbox={manga ? typeManga : genreManga} manga={manga}/>

                </div>
                <div className={classes.main__aside_years}>
                    <input className={classes.input} type="number" name="inp_year_first" placeholder="От 0"/>
                    <div className={classes.hyphen}></div>
                    <input className={classes.input} type="number" name="inp_year_second" placeholder="До 2022"/>
                </div>
                <div className={classes.main__aside_btn}>
                    <button className={classes.btn} onClick={handleClearType}>Сбросить</button>
                    <button className={classes.btn} onClick={handleClearGenre}>Применить</button>
                </div>
            </aside>
            <div className={classes.main__card}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>


        </main>
    );
}

export default MainPage;