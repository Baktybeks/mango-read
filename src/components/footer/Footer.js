import React from 'react';
import classes from "./footer.module.sass";
import logo_footer from "../../assets/images/Logo_footer.png"
import Ymap from "../map/Ymap";

function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.main}`}>
                <div className={classes.logo}>
                    <img className={classes.logo__img} src={logo_footer} alt="logo"/>
                    <div className={classes.logo__title}>
                        <div className={classes.title}>MangoRead</div>
                        <div className={classes.subtitle}>Читай мангу с нами</div>
                    </div>
                </div>
                <div className={classes.social}>
                    <ul className={classes.social__list}>
                        <li className={classes.social__list_item}>
                            <span className={classes.facebook}></span><a href="#">Link One</a>
                        </li>
                        <li className={classes.social__list_item}>
                            <span className={classes.instagram}/><a href="#">Link Two</a>
                        </li>
                        <li className={classes.social__list_item}>
                            <span className={classes.twitter}/><a href="#">Link Three</a>
                        </li>
                    </ul>
                </div>
                <div className={classes.map}>
                    <Ymap/> {/*google map api платная*/}
                </div>
            </div>
            <div className={classes.bottom}>
                <div className={classes.bottom__reserved}>©2022, All right reserved.</div>
                <ul className={`${classes.bottom__list}`}>
                    <li className={classes.bottom__list_item}>
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li className={classes.bottom__list_item}>
                        <a href="#">Terms of Service</a>
                    </li>
                    <li className={classes.bottom__list_item}>
                        <a href="#">Cookies Settings</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;