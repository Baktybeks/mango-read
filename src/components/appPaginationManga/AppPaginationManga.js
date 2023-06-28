import React, {useEffect, useState} from 'react'
import {createTheme, Pagination, PaginationItem, ThemeProvider} from "@mui/material"
import {getMangaListApi} from "../../axios/mangaApi"
import {useDispatch, useSelector} from "react-redux"
import left_pag from '../../assets/images/icon/left_pag.svg';
import right_pag from '../../assets/images/icon/right_pag.svg';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#2fdf9a',
        },
    },
});


function AppPaginationManga({ limit }) {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const {mangaCount} = useSelector(state => state.mangaReducer)

    useEffect(() => {
        const offset = (page - 1) * limit;
        dispatch(getMangaListApi(limit, offset))
    }, [dispatch, limit, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getItemColor = (itemType) => {
        switch (itemType) {
            case 'next':
            case 'previous':
                return '#F2F2F2FF';
            case 'page':
                return 'gray';
            default:
                return 'black';
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Pagination
                count={Math.ceil(mangaCount / limit)}
                page={page}
                onChange={handlePageChange}
                color="secondary"
                renderItem={(item) => (
                    <PaginationItem
                        sx={{fontFamily: 'Montserrat',
                            fontSize: '24px',
                            color: getItemColor(item.type),
                            width: '45px',
                            height: '45px',
                            borderRadius: '100%',
                            p: '20px',
                            m: '0px',
                            '&.Mui-selected': {
                                color: 'white',
                            },
                            '&.MuiPaginationItem-ellipsis': {
                                color: 'gray',
                            },
                            '&.MuiPaginationItem-icon': {
                                color: 'gray',
                            },
                            '&.MuiPaginationItem-previousNext': {
                                backgroundImage: `url(${item.type === 'previous' ? left_pag : right_pag})`,
                                backgroundSize: '35%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            },
                        }}
                        {...item}
                    />
                )}
            />
        </ThemeProvider>
    );
}

export default AppPaginationManga