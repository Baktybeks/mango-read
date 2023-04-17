import {Routes, Route} from "react-router-dom"
import React from 'react'
import {publicRoutes} from "./routes"

function AppRouter() {
    return (
        <Routes>
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
        </Routes>
    )
}

export default AppRouter