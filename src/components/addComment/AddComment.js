import React, {useState} from 'react'
import classes from "./addComment.module.sass"
import {useDispatch, useSelector} from "react-redux"
import {addCommentApi} from "../../axios/mangaApi"
import {setCommentModalActive} from "../../store/slices/infoSlice"


function AddComment({id}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.usersReducer)
    const [comment, setComment] = useState('')
    const isCommentFormValid = () => comment

    const submitComment = (e) => {
        e.preventDefault()
        if (isCommentFormValid()) {
            dispatch(addCommentApi(id,comment))
            dispatch(setCommentModalActive(false))
        } else {
            alert('Введите все данные')
        }
    }

    return (
        <form className={classes.add_comment_block} onSubmit={submitComment}>
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
                       name="comment"
                       value={comment}
                       onChange={e => setComment(e.target.value)}
                />
                <button className={classes.add_comment_btn} type="submit">добавить</button>
            </div>
        </form>
    )
}

export default AddComment