import {links} from "./links"
import {Navigate} from "react-router-dom"

import MainPage from "../pages/mainPage/MainPage"
import InfoPage from "../pages/infoPage/InfoPage"


export const publicRoutes = [
    {
        path: links.base,
        element: <MainPage/>
    },
    {
        path: links.info,
        element: <InfoPage/>
    },
    {
        path: '*',
        element: <Navigate to='/'/>
    },

]