import React from 'react';
import classes from "./header.module.css";
import logo from "../../assets/images/Logo.png"

function Header() {
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
                    <button className={classes.defBtnLogin}>
                        войти
                    </button>
                    <button className={classes.defBtnReg}>
                        регистрация
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;