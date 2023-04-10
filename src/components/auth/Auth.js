import React, {useState} from 'react';
import classes from "./auth.module.sass";
import profileImg from "../../assets/images/profilephoto.jpg"
import exit from "../../assets/images/exit.svg"

function Auth({login}) {

    let [myCheck, setMyCheck] = useState(false)

    const handleChange = (event) => {
        setMyCheck(event.target.checked);
    }



    return (
        <div className={classes.auth}>
            <img className={classes.auth__exit} src={exit} alt="exit"/>
            <div className={classes.auth__title}>
                <div
                    className={login ? `${classes.login} ${classes.active}` : `${classes.login}`}

                >
                    Вход
                </div>
                <div
                    className={!login ? `${classes.reg} ${classes.active}` : `${classes.reg}`}

                >
                    Регистрация
                </div>
            </div>
            <div className={classes.auth__divider}>
                <div className={classes.auth__divider_line}></div>
            </div>
            {
                login
                    ?
                    <form className={`${classes.auth__form} ${classes.login}`}>
                        <div
                            className={login ? `${classes.auth__form_text_box} ${classes.login}` : `${classes.auth__form_text_box} ${classes.reg}`}>
                            <input
                                className={classes.text}
                                type="text"
                                name="username"
                                placeholder="Username"
                            />
                            <input
                                className={classes.text}
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <div className={classes.checkbox}>
                                <label htmlFor="checkbox" className={classes.checkbox__label}>
                                    <input
                                        className={classes.checkbox__label_input}
                                        type="checkbox"
                                        id="checkbox"
                                        onChange={handleChange}/>
                                    <div
                                        className={myCheck ? `${classes.checkbox__box} ${classes.checked}` : `${classes.checkbox__box}`}>
                                        <span className={classes.checkbox__box_tick}></span>
                                    </div>
                                    <div className={classes.checkbox__label_title}>Запомнить меня</div>
                                </label>
                            </div>
                            <button type="button">Вход</button>
                        </div>
                    </form>
                    :
                    <form className={`${classes.auth__form} ${classes.reg}`}>
                        <div className={classes.auth__form_img}>
                            <img src={profileImg} alt="profileImg"/>
                            <input
                                className={login ? `${classes.text} ${classes.login}` : `${classes.text} ${classes.reg}`}
                                type="file"
                                name="photo"
                                id="add_img"/>
                            <label htmlFor="add_img">дОБАВИТЬ ФОТО</label>
                        </div>
                        <div className={login ? `${classes.auth__form_text_box} ${classes.login}` : `${classes.auth__form_text_box} ${classes.reg}`}>

                            <input
                                className={classes.text}
                                type="text"
                                name="username"
                                placeholder="Username"
                            />
                            <input
                                className={classes.text}
                                type="text"
                                name="nickname"
                                placeholder="Nickname"
                            />
                            <input
                                className={classes.text}
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <button type="button">регистрация</button>
                        </div>
                    </form>
            }

        </div>
    );
}

export default Auth;