import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import {setFilteredManga} from "../../store/slices/filterSlice"

function AppPaginationFilteredManga() {

    const dispatch = useDispatch()

    const itemsPerPage = 12

    const {selectedInputs, allMangaList} = useSelector(state => state.filterReducer)

    const {selectedGenre, selectedType, selectedYears} = selectedInputs
    const {inp_year_first, inp_year_second} = selectedYears

    const filteredManga = allMangaList.filter((item) => {
        const isType = selectedType.length === 0 || selectedType.includes(item.type)
        const isYear = (!inp_year_first && !inp_year_second) ||
            item.issue_year >= inp_year_first && item.issue_year <= inp_year_second
        const isGenre = selectedGenre.length === 0 || selectedGenre.every(genre => item.genre.includes(genre));
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

    return (
        <>
            {
                !totalPages ? <div style={{fontFamily: 'Montserrat', fontSize: '24px'}}>по вашему запросу не найдено</div> :
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="success"
                        renderItem={(item) => (
                            <PaginationItem
                                sx={{fontFamily: 'Montserrat', fontSize: '24px', m: 0.3}}
                                size="large"
                                slots={{previous: ArrowBackIosNewIcon, next: ArrowForwardIosIcon}}
                                {...item}
                            />
                        )}
                    />
            }
        </>
    )
}

export default AppPaginationFilteredManga