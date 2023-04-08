import React from 'react';
import classes from "./header.module.css";
import logo from "../../assets/images/Logo.png"
import arrow from "../../assets/images/icon/arrow_drop_down.svg"
import profileImg from "../../assets/images/profilephoto.jpg"

function Header() {
    const isAuth = true

    return (
        <header>
            <nav className="container">
                <div className={classes.logoBlock}>
                    <img src={logo} alt="logo"/>
                    <div className={classes.logoTitle}>
                        <div className={classes.title}>MangoRead</div>
                        <div className={classes.subtitle}>Читай мангу с нами</div>
                    </div>
                </div>
                <div className={classes.searchBlock}>
                    <input
                        className={classes.search_input}
                        type="search"
                        placeholder="Placeholder"
                    />
                    <span className={classes.search_img}></span>
                </div>
                <div className={classes.authBlock}>
                    {isAuth ?
                        <div className={classes.profile}>
                            <div className={classes.userName}>
                                Alex Miller
                            </div>
                            <div className={classes.logedIn}>
                                <div className={classes.profileImg}>
                                    <img src={profileImg} alt="profileImg"/>
                                </div>
                                <div className={classes.dropDown}>
                                    <img src={arrow} alt="arrow"/>
                                </div>
                            </div>

                        </div>
                        :
                        <>
                            <button className={classes.btnLogin}>
                                войти
                            </button>
                            <button className={classes.btnReg}>
                                регистрация
                            </button>
                        </>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Header;