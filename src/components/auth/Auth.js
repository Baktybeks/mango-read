import React, {useState} from 'react'
import classes from "./auth.module.sass"
import profileImg from "../../assets/images/profilephoto.png"
import exit from "../../assets/images/exit.svg"
import {useDispatch} from "react-redux"
import {setLoginOrReg, setModalActive} from "../../store/slices/usersSlice"
import {regApi, signInApi} from "../../axios/usersApi"

const passwordRegExp = /^.{8,40}$/
const userRegExp = /^.{10,50}$/

function Auth({login}) {
    const dispatch = useDispatch()

    const [loginMyCheck, setLoginMyCheck] = useState(false)
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regImage, setRegImage] = useState('')
    const [regNickname, setRegNickname] = useState('')

    const handleChange = (event) => {
        setLoginMyCheck(event.target.checked)
    }

    const isLoginFormValid = () => loginUsername && loginPassword

    const submitLoginHandler = (e) => {
        e.preventDefault()
        if (isLoginFormValid()) {
            dispatch(signInApi(loginUsername, loginPassword, loginMyCheck))
        } else {
            alert('Введите все данные')
        }
    }
    const submitRegHandler = async (e) => {
        e.preventDefault()
        if (!userRegExp.test(regUsername)) {
            return alert("Ваш Username должен содержать не менее 10 символов")
        }
        if (!userRegExp.test(regNickname)) {
            return alert("Ваш Nickname должен содержать не менее 10 символов")
        }
        if (!passwordRegExp.test(regPassword)) {
            return alert("Ваш пароль должен содержать не менее 8 символов")
        }
        if (!regImage) {
            return alert("добавьте фотографию")
        }
        const formData = new FormData()
        formData.append('username', regUsername)
        formData.append('nickname', regNickname)
        formData.append('image_file', regImage)
        formData.append('password', regPassword)
        dispatch(regApi(formData))
    }

    return (
        <div className={classes.auth}>
            <img className={classes.auth__exit} src={exit} alt="exit" onClick={() => {
                dispatch(setModalActive(false))
            }}
            />
            <div className={classes.auth__title}>
                <div
                    className={login ? `${classes.login} ${classes.active}` : `${classes.login}`}
                    onClick={() => {
                        dispatch(setLoginOrReg(true))
                    }}
                >
                    Вход
                </div>
                <div
                    className={!login ? `${classes.reg} ${classes.active}` : `${classes.reg}`}
                    onClick={() => {
                        dispatch(setLoginOrReg(false))
                    }}
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
                    <form className={`${classes.auth__form} ${classes.login}`}
                          onSubmit={submitLoginHandler}>
                        <div
                            className={login ? `${classes.auth__form_text_box} ${classes.login}` : `${classes.auth__form_text_box} ${classes.reg}`}>
                            <input
                                className={classes.text}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={loginUsername}
                                onChange={e => setLoginUsername(e.target.value)}
                            />
                            <input
                                className={classes.text}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                            />
                            <div className={classes.checkbox}>
                                <label htmlFor="checkbox" className={classes.checkbox__label}>
                                    <input
                                        className={classes.checkbox__label_input}
                                        type="checkbox"
                                        id="checkbox"
                                        onChange={handleChange}/>
                                    <div
                                        className={loginMyCheck ? `${classes.checkbox__box} ${classes.checked}` : `${classes.checkbox__box}`}>
                                        <span className={classes.checkbox__box_tick}></span>
                                    </div>
                                    <div className={classes.checkbox__label_title}>Запомнить меня</div>
                                </label>
                            </div>
                            <button type="submit">Вход</button>
                        </div>
                    </form>
                    :
                    <form className={`${classes.auth__form} ${classes.reg}`}
                          onSubmit={submitRegHandler}>
                        <div className={classes.auth__form_img}>
                            <img src={profileImg} alt="profileImg"/>
                            <input
                                className={login ? `${classes.text} ${classes.login}` : `${classes.text} ${classes.reg}`}
                                type="file"
                                name="image_file"
                                id="add_img"
                                accept="/image/*, .png, .jpg, .gif, .web"
                                onChange={e => setRegImage(e.target.files[0])}
                            />
                            <label htmlFor="add_img">{!regImage ? "дОБАВИТЬ ФОТО" : "фото добавлено"}</label>
                        </div>
                        <div
                            className={login ? `${classes.auth__form_text_box} ${classes.login}` : `${classes.auth__form_text_box} ${classes.reg}`}>

                            <input
                                className={classes.text}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={regUsername}
                                onChange={e => setRegUsername(e.target.value)}
                            />
                            <input
                                className={classes.text}
                                type="text"
                                name="nickname"
                                placeholder="Nickname"
                                value={regNickname}
                                onChange={e => setRegNickname(e.target.value)}
                            />
                            <input
                                className={classes.text}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                            />
                            <button type="submit">регистрация</button>
                        </div>
                    </form>
            }
        </div>
    )
}

export default Auth