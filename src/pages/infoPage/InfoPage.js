import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import classes from "./info.module.css"
import {useDispatch, useSelector} from "react-redux"
import {getCardApi, getCommentsApi} from "../../axios/mangaApi"
import Modal from "../../components/modal/Modal"

function InfoPage() {

    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    const [modalActive, setModalActive] = useState(false)

    const {card, comments} = useSelector(state => state.mangaReducer)
    const {user} = useSelector(state => state.usersReducer)
    const {error} = useSelector(state => state.errorReducer)
    const {preloader} = useSelector(state => state.preloaderReducer)

    useEffect(() => {
        dispatch(getCardApi(id))
        dispatch(getCommentsApi(id))
    }, [dispatch])

    return (
        <div className={`container ${classes.card}`}>
            <button onClick={() => navigate(-1)}
                    className={classes.card__back}
            >
                <span className={classes.card__back_arrow_left}></span> Назад
            </button>
            {
                preloader
                    ?
                    <h1 className={classes.loading}>Loading......</h1>
                    :
                    error
                        ?
                        <p>{error}</p>
                        :
                        <>
                            <div className={classes.card__content}>
                                <div className={classes.card__content_top}>
                                    <img src={card.image} alt="image"
                                         className={classes.card__content_top_img}/>
                                    <div className={classes.card__content_top_info}>
                                        <div className={classes.card__content_top_title}>{card.ru_name} </div>
                                        <div className={classes.card__content_top_box}>
                                            <div className={classes.title}>Информация:</div>
                                            <div className={classes.subtitle}>Тип: <span>{card.type}</span></div>
                                            <div className={classes.subtitle}>Год: <span>{card.issue_year}</span></div>
                                            <div className={classes.subtitle}>Жанр: <span>{card.genre}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.card__divider}>
                                <div className={classes.card__divider_line}></div>
                            </div>
                            <div className={classes.card__description}>
                                <div className={classes.card__description_title}>Синопсис</div>
                                <div className={classes.card__description_info}
                                     dangerouslySetInnerHTML={{__html: card.description}}/>
                            </div>
                            <div className={classes.card__divider}>
                                <div className={classes.card__divider_line}></div>
                            </div>
                            <div className={classes.card__comments}>
                                <div className={classes.card__comments_top}>
                                    <div className={classes.top}>Топ комментарий</div>
                                    <button
                                        className={classes.btn}
                                        onClick={() => setModalActive(true)}
                                    >
                                        Добавить комментарий
                                    </button>
                                </div>
                                <ul>
                                        {
                                            preloader
                                                ?
                                                <h1 className={classes.loading}>Loading......</h1>
                                                :
                                                error
                                                    ?
                                                    <p>{error}</p>
                                                    :
                                                    <>
                                                        {comments.map(comment =>
                                                            <li className={classes.card__comments_comment}>
                                                                <div className={classes.img_box}>
                                                                    <img className={classes.img}
                                                                         src={comment.user.image_file}
                                                                         alt={comment.user.nickname}/>
                                                                </div>
                                                                <div className={classes.divider}>
                                                                    <div className={classes.divider_line}></div>
                                                                </div>
                                                                <div className={classes.divider_hr}>
                                                                    <hr/>
                                                                </div>
                                                                <div className={classes.content}>
                                                                    <div className={classes.user_info_name}>
                                                                        {comment.user.username}, {comment.user.nickname}
                                                                    </div>
                                                                    <div className={classes.text}>
                                                                        {comment.text}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                        }
                                                    </>
                                        }
                                </ul>
                            </div>

                        </>
            }
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={classes.add_comment_block}>
                    <div className={classes.user_info}>
                        <img className={classes.img} src={user.image_file} alt={user.nickname}/>
                        <div className={classes.user_info_name}>
                            {user.username}, {user.nickname}
                        </div>
                    </div>
                    <div className={classes.add_comment}>
                        <input className={classes.add_comment_input}
                               type="text"
                               placeholder="Добавьте комментарий"
                        />
                        <button className={classes.add_comment_btn}>добавить</button>
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default InfoPage