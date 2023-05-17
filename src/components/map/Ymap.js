import React from 'react'
import classes from "./ymap.module.sass"

function YMap() {
    return (
        <div className={classes.ymap}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3153.565511505052!2d-122.4253101452513!3d37.77678480698059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1684327410190!5m2!1sru!2skg"
                width="400" height="250"  allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, borderRadius:20 }}>
            </iframe>
        </div>
    )
}

export default YMap