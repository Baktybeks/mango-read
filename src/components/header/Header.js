import React, {useState} from 'react';
import classes from "./header.module.sass";
import logo from "../../assets/images/Logo.png"
import arrow from "../../assets/images/icon/arrow_drop_down.svg"
import profileImg from "../../assets/images/profilephoto.jpg"
import Modal from "../modal/Modal";
import Auth from "../auth/Auth";
import {links} from "../../links/links";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoginOrReg, setModalActive} from "../../store/slices/usersSlice";

function Header() {

    const [isAuth, setIsAuth] = useState(false)
    const dispatch = useDispatch()
    const {loginOrReg, modalActive} = useSelector (state => state.usersReducer)
    console.log('loginOrReg',loginOrReg)
    console.log('modalActive',modalActive)

    const login = () => {
        dispatch(setModalActive(true))
        dispatch(setLoginOrReg(true))
        setIsAuth(true)
    }
    const reg = () => {
        dispatch(setModalActive(true))
        dispatch(setLoginOrReg(false))
    }

    const logOut = () => {
        setIsAuth(false)
    }

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
                <div className={classes.search}>
                    <input
                        className={classes.search__input}
                        type="search"
                        placeholder="Placeholder"
                    />
                    <span className={classes.search__img}></span>
                </div>
                <div className={classes.auth}>
                    {isAuth ?
                        <div onClick={logOut} className={classes.auth__user}>
                            <div className={classes.auth__user_name}>
                                Alex Miller
                            </div>
                            <div className={classes.auth__user_login}>
                                <img src={profileImg} alt="profileImg" className={classes.auth__user_login_img}/>
                                <div className={classes.auth__user_login_dropdown}>
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
            <Modal active={modalActive}>
                <Auth login={loginOrReg}/>
            </Modal>
        </header>
    );
}

export default Header;