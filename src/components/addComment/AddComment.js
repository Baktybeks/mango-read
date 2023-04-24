import React from 'react'
import classes from "./addComment.module.css"

function AddComment() {

    return (
        <div className={classes.comment}>
            <img className={classes.img} src={comment.user.image_file} alt={comment.user.nickname}/>
            <div className={classes.content}>
                {comment.user.username}, {comment.user.nickname}
            </div>
        </div>
    )
}

export default AddComment