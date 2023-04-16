import React from 'react';
import {YMaps, Map} from '@pbe/react-yandex-maps';
import classes from "./ymap.module.css";

function YMap() {
    return (
        <div className={classes.ymap}>
            <YMaps>
                <Map
                    defaultState={{center: [37.777353, -122.422467], zoom: 14}}
                    width={400}
                    height={250}
                />
            </YMaps>
        </div>
    );
}

export default YMap;