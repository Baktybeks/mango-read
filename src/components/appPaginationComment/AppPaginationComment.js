import React, {useEffect, useState} from 'react'
import {createTheme, Pagination, PaginationItem, ThemeProvider} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setCurrentComments} from "../../store/slices/infoSlice"
import left_pag from "../../assets/images/icon/left_pag.svg"
import right_pag from "../../assets/images/icon/right_pag.svg"

const theme = createTheme({
    palette: {
        secondary: {
            main: '#2fdf9a',
        },
    },
});

function AppPaginationComment() {

    const dispatch = useDispatch()

    const itemsPerPage = 3

    const {comments} = useSelector(state => state.infoReducer)

    const totalPages = Math.ceil(comments.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = comments.slice(startIndex, endIndex)

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        dispatch(setCurrentComments(currentPageData))
    }, [dispatch, currentPage])
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
        <>
            {
                !totalPages ? <div style={{fontFamily: 'Montserrat', fontSize: '24px'}}>Комментарий: Ещё нету</div> :
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
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
                                        m: 0.3,
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
                                            backgroundPosition: 'center', // Отцентровать изображение
                                        },
                                    }}
                                    {...item}
                                />
                            )}
                        />
                    </ThemeProvider>
            }
        </>
    )
}

export default AppPaginationComment