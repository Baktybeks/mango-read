import React from 'react';
import classes from "./modal.module.sass";
import {useDispatch} from "react-redux";
import {setModalActive} from "../../store/slices/usersSlice";

function Modal({active, children}) {
    const dispatch = useDispatch()
    return (
        <div className={active ? `${classes.modal} ${classes.active}` : `${classes.modal}`}
             onClick={() => dispatch(setModalActive(false))}>
            <div className={active ? `${classes.modal__content} ${classes.active}` : `${classes.modal__content}`}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;