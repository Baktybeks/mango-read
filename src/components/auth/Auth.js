import React from 'react';
import classes from "./auth.module.sass";
// import profileImg from "../../assets/images/profilephoto.jpg"
import exit from "../../assets/images/exit.svg"

function Auth() {
    const isAuth = true
    return (
        <div className={classes.auth}>
            <img className={classes.auth__exit} src={exit} alt="exit"/>
            <div className={classes.auth__title}>
                <div className={isAuth ? `${classes.login} ${classes.active}` : `${classes.login}`}>Вход</div>
                <div className={!isAuth ? `${classes.reg} ${classes.active}` : `${classes.reg}`}>Регистрация</div>
            </div>
            <form className={classes.auth__form}>
                <input
                    className={classes.username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className={classes.password}
                    type="password"
                    placeholder="Password"
                />
                <div className={classes.checkbox}>
                    <input type="checkbox" id={`check`}/>
                    <label htmlFor="check">Запомнить меня</label>
                </div>
                <button type="button">Вход</button>
            </form>
        </div>
    );
}

export default Auth;