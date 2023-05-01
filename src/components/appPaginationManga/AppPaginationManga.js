import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material"
import {getMangaListApi} from "../../axios/mangaApi"
import {useDispatch, useSelector} from "react-redux"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

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

    return (
        <>
            <Pagination
                count={Math.ceil(mangaCount / limit)}
                page={page}
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
        </>
    );
}

export default AppPaginationManga