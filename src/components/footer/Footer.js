import React from 'react';
import classes from "./footer.module.sass";
import logo_footer from "../../assets/images/Logo_footer.png"
import Ymap from "../map/Ymap";
import {Link} from "react-router-dom";
import {links} from "../../links/links";

function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.main}`}>
                <Link to={links.base} className={classes.logo}>
                    <img src={logo_footer} alt="logo" className={classes.logo__img}/>
                    <div className={classes.logo__title}>
                        <div className={classes.title}>MangoRead</div>
                        <div className={classes.subtitle}>Читай мангу с нами</div>
                    </div>
                </Link>
                <div className={classes.social}>
                    <ul className={classes.social__list}>
                        <li className={classes.social__list_item}>
                            <span className={classes.facebook}></span><Link to="#">Link One</Link>
                        </li>
                        <li className={classes.social__list_item}>
                            <span className={classes.instagram}></span><Link to="#">Link Two</Link>
                        </li>
                        <li className={classes.social__list_item}>
                            <span className={classes.twitter}></span><Link to="#">Link Three</Link>
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
                        <Link to="auth">Privacy Policy</Link>
                    </li>
                    <li className={classes.bottom__list_item}>
                        <Link to="#">Terms of Service</Link>
                    </li>
                    <li className={classes.bottom__list_item}>
                        <Link to="#">Cookies Settings</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;