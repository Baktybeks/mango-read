import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import {setCurrentComments} from "../../store/slices/mangaSlice"

function AppPaginationComment() {

    const dispatch = useDispatch()

    const itemsPerPage = 3

    const {comments} = useSelector(state => state.mangaReducer)

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
    }, [dispatch,currentPage])

    return (
        <>
            {
                !totalPages ? <div style={{fontFamily: 'Montserrat', fontSize: '24px'}}>Комментарий: Ещё нету</div> :
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

export default AppPaginationComment