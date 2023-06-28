import React, {useEffect, useState} from 'react'
import {createTheme, Pagination, PaginationItem, ThemeProvider} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setFilteredManga} from "../../store/slices/filterSlice"
import left_pag from "../../assets/images/icon/left_pag.svg"
import right_pag from "../../assets/images/icon/right_pag.svg"


const theme = createTheme({
    palette: {
        secondary: {
            main: '#2fdf9a',
        },
    },
})


function AppPaginationFilteredManga() {

    const dispatch = useDispatch()

    const itemsPerPage = 12

    const {selectedInputs, allMangaList} = useSelector(state => state.filterReducer)

    const {selectedGenre, selectedType, selectedYears} = selectedInputs
    const {inp_year_first, inp_year_second} = selectedYears

    const filteredManga = allMangaList.filter((item) => {
        const isType = selectedType.length === 0 || selectedType.includes(item.type)
        const isYear = (!inp_year_first && !inp_year_second) ||
            (item.issue_year >= inp_year_first && item.issue_year <= inp_year_second)
        const isGenre = selectedGenre.length === 0 || selectedGenre.every(genre => item.genre.includes(genre))
        return isGenre && isType && isYear
    })

    const totalPages = Math.ceil(filteredManga.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = filteredManga.slice(startIndex, endIndex)

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        dispatch(setFilteredManga(currentPageData))
    }, [dispatch, currentPage, selectedGenre, selectedType, selectedYears])

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
                !totalPages ? "" :
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
            }
        </>
    )
}

export default AppPaginationFilteredManga