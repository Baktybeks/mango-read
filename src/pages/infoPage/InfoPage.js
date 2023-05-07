import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getInfoApi} from "../../axios/mangaApi"

import classes from "./infoPage.module.css"

import {setCommentModalActive} from "../../store/slices/infoSlice"

import Modal from "../../components/modal/Modal"
import AddComment from "../../components/addComment/AddComment"
import AppPaginationComment from "../../components/appPaginationComment/AppPaginationComment"

function InfoPage() {

    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const {filteredGenres} = useSelector(state => state.mangaReducer)
    const {card, commentModalActive, currentComments} = useSelector(state => state.infoReducer)
    const {user} = useSelector(state => state.usersReducer)
    const {error} = useSelector(state => state.errorReducer)
    const {preloaderCard} = useSelector(state => state.preloaderReducer)

    const handleAddComment = () => {
        if (!user || !Object.keys(user).length) {
            alert('Авторизируйтесь')
        } else {
            dispatch(setCommentModalActive(true))
        }
    }

    useEffect(() => {
            dispatch(getInfoApi(id))
    }, [dispatch, id])

    return (
        <div className={`container ${classes.card}`}>
            <button onClick={() => navigate('/')} className={classes.card__back}>
                <span className={classes.card__back_arrow_left}></span> Назад
            </button>
            {
                preloaderCard
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
                                    <img src={card.image} alt={card.image}
                                         className={classes.card__content_top_img}/>
                                    <div className={classes.card__content_top_info}>
                                        <div className={classes.card__content_top_title}>{card.ru_name} </div>
                                        <div className={classes.card__content_top_box}>
                                            <div className={classes.title}>Информация:</div>
                                            <div className={classes.subtitle}>Тип: <span>{card.type}</span></div>
                                            <div className={classes.subtitle}>Год: <span>{card.issue_year}</span></div>
                                            <div className={classes.subtitle}>Жанр: <span>{filteredGenres}</span></div>
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
                                     dangerouslySetInnerHTML={{__html: card.description}}
                                />
                            </div>
                            <div className={classes.card__divider}>
                                <div className={classes.card__divider_line}></div>
                            </div>
                            <div className={classes.card__comments}>
                                <div className={classes.card__comments_top}>
                                    <div className={classes.top}>Топ комментарий</div>
                                    <button
                                        className={classes.btn}
                                        onClick={handleAddComment}
                                    >
                                        Добавить комментарий
                                    </button>
                                </div>
                                <ul>
                                    {
                                        preloaderCard
                                            ?
                                            <h1 className={classes.loading}>Loading......</h1>
                                            :
                                            error
                                                ?
                                                <p>{error}</p>
                                                :
                                                <>
                                                    {currentComments.map(comment =>
                                                        <li className={classes.card__comments_comment}
                                                            key={comment.id}>
                                                            <div className={classes.img_box}>
                                                                <img className={classes.img}
                                                                     src={comment.user.image_file}
                                                                     alt={comment.user.nickname}/>
                                                            </div>
                                                            <div className={classes.divider}>
                                                                <div className={classes.divider_line}></div>
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
                                <div className={classes.pagination}>
                                    <AppPaginationComment id={id}/>
                                </div>
                            </div>
                        </>
            }
            <Modal active={commentModalActive} commentOrUser="comment">
                <AddComment id={id}/>
            </Modal>

        </div>

    )
}

export default InfoPage