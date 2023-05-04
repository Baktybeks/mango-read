import React, {useEffect} from 'react'
import classes from "./header.module.css"
import logo from "../../assets/images/Logo.png"
import arrow from "../../assets/images/icon/arrow_drop_down.svg"
import Modal from "../modal/Modal"
import Auth from "../auth/Auth"
import {links} from "../../links/links"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {setLoginOrReg, setLogout, setModalActive} from "../../store/slices/usersSlice"
import {checkAuthApi, logoutApi} from "../../axios/usersApi"
import {getAllMangaListApi, getGenreListApi} from "../../axios/mangaApi"
import Search from "../search/Search"

function Header() {

    const {isAuth, user, loginOrReg, modalActive} = useSelector(state => state.usersReducer)

    const dispatch = useDispatch()

    const login = () => {
        dispatch(setModalActive(true))
        dispatch(setLoginOrReg(true))
    }
    const reg = () => {
        dispatch(setModalActive(true))
        dispatch(setLoginOrReg(false))
    }

    const logOut = () => {
        dispatch(logoutApi())
    }

    useEffect(() => {
        dispatch(getGenreListApi())
        dispatch(getAllMangaListApi())
        if (localStorage.getItem('CHECKED')) {
            dispatch(checkAuthApi())
        } else {
            dispatch(setLogout())
        }
    }, [dispatch])

    return (
        <header className={classes.header}>
            <div className={`container ${classes.main}`}>
                <Link to={links.base} className={classes.logo}>
                    <img src={logo} alt="logo" className={classes.logo__img}/>
                    <div className={classes.logo__title}>
                        <div className={classes.title}>MangoRead</div>
                        <div className={classes.subtitle}>Читай мангу с нами</div>
                    </div>
                </Link>
                <Search/>
                <div className={classes.auth}>
                    {isAuth ?
                        <div className={classes.auth__user}>
                            <div className={classes.auth__user_name}>
                                {user.username}
                            </div>
                            <div className={classes.auth__user_login}>
                                <img src={user.image_file} alt="profileImg" className={classes.auth__user_login_img}/>
                                <div className={classes.auth__user_login_dropdown} onClick={logOut}>
                                    <img src={arrow} alt="arrow"/>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={classes.auth__btn}>
                            <button className={classes.auth__btn_login} onClick={login}>
                                войти
                            </button>
                            <button className={classes.auth__btn_reg} onClick={reg}>
                                регистрация
                            </button>
                        </div>
                    }
                </div>
            </div>
            <Modal active={modalActive} commentOrUser="user">
                <Auth login={loginOrReg}/>
            </Modal>
        </header>
    )
}

export default Header