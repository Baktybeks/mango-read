import React from 'react'
import classes from "./modal.module.css"
import {setModalActive} from "../../store/slices/usersSlice"
import {useDispatch} from "react-redux"
import {setCommentModalActive} from "../../store/slices/infoSlice"

function Modal({active, commentOrUser, children}) {
    const dispatch = useDispatch()
    return (
        <div className={active ? `${classes.modal} ${classes.active}` : `${classes.modal}`}
             onClick={() => dispatch((commentOrUser==="user" ? setModalActive : setCommentModalActive)(false))}
                 >
            <div className={active ? `${classes.modal__content} ${classes.active}` : `${classes.modal__content}`}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal