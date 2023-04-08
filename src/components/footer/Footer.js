import React from 'react';
import classes from "./footer.module.css";
import logo_footer from "../../assets/images/Logo_footer.png"
import Ymap from "../map/Ymap";

function Footer() {
    return (
        <footer>
            <div className={`container ${classes.mainBlock}`}>
                <div className={classes.logoBlock}>
                    <img src={logo_footer} alt="logo"/>
                    <div className={classes.logoTitle}>
                        <div className={classes.title}>MangoRead</div>
                        <div className={classes.subtitle}>Читай мангу с нами</div>
                    </div>
                </div>
                <div className={classes.socialBlock}>
                    <ul className={classes.social_list}>
                        <li className={classes.social_item}>
                            <span className={classes.facebook}></span><a href="#">Link One</a>
                        </li>
                        <li className={classes.social_item}>
                            <span className={classes.instagram}/><a href="#">Link Two</a>
                        </li>
                        <li className={classes.social_item}>
                            <span className={classes.twitter}/><a href="#">Link Three</a>
                        </li>
                    </ul>
                </div>
                <div className={classes.map}>
                    <Ymap/> {/*google map api платная*/}
                </div>
            </div>
            <div className={classes.footerBottom}>
                <div className={classes.reserved}>©2022, All right reserved.</div>
                <ul className={`${classes.footerLinksList}`}>
                    <li className={classes.item}>
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li className={classes.item}>
                        <a href="#">Terms of Service</a>
                    </li>
                    <li className={classes.item}>
                        <a href="#">Cookies Settings</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;