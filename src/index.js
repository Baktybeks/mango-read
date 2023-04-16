import React from 'react';
import App from './App';
import './assets/css/core.sass'
import './assets/fonts/roboto/stylesheet.css'
import './assets/fonts/montserrat/stylesheet.css'

import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
