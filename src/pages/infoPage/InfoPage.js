import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import classes from "./infoPage.module.css"
import {useDispatch, useSelector} from "react-redux"
import {getCardApi, getCommentsApi} from "../../axios/mangaApi"
import Modal from "../../components/modal/Modal"
import AddComment from "../../components/addComment/AddComment"
import {setCommentModalActive} from "../../store/slices/mangaSlice"
import AppPaginationComment from "../../components/appPaginationComment/AppPaginationComment"

function InfoPage() {

    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const {card, commentModalActive, currentComments, genreValue} = useSelector(state => state.mangaReducer)
    const {user} = useSelector(state => state.usersReducer)
    const {error} = useSelector(state => state.errorReducer)
    const {preloader} = useSelector(state => state.preloaderReducer)
    const [filteredGenres, setFilteredGenres] = useState('')

    const handleAddComment = () => {
        if (!Object.keys(user).length) {
            alert('Авторизируйтесь')
        } else {
            dispatch(setCommentModalActive(true))
        }
    }

    const genreNames = () => {
        const filteredGenres = genreValue.filter(genres => card.genre.includes(genres.id))
        return filteredGenres.map(genre => genre.title).join(', ')
    }

    useEffect(() => {
        dispatch(getCardApi(id))
        dispatch(getCommentsApi(id))
        setFilteredGenres(genreNames())
    }, [dispatch, id])

    return (
        <div className={`container ${classes.card}`}>
            <button onClick={() => navigate('/')} className={classes.card__back}>
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
                                        preloader
                                            ?
                                            <h1 className={classes.loading}>Loading......</h1>
                                            :
                                            error
                                                ?
                                                <p>{error}</p>
                                                :
                                                <>
                                                    {currentComments.map(comment =>
                                                        <li className={classes.card__comments_comment}>
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
                                    <AppPaginationComment/>
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