import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

function AppPaginationComment({items, pageSize, setItems}) {

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })

    const service = {
        getData: ({from, to}) => {
            return new Promise((resolve) => {
                const data = items.slice(from, to)
                resolve({
                    count: items.length,
                    data: data
                })
            })
        }
    }

    useEffect(() => {
        service.getData({from: pagination.from, to: pagination.to}).then(response => {
            setPagination({...pagination, count: response.count})
            setItems(response.data)
            console.log(response)
        })
    }, [pagination.from, pagination.to])

    const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize
        setPagination({...pagination, from: from, to: to})
    }
    const countPerPage = Math.ceil(pagination.count / pageSize)
    return (
        <div>
            {
                !countPerPage ? <div style={{fontFamily: 'Montserrat', fontSize: '24px'}}>Комментарий: Ещё нету</div> :
                    <Pagination
                        count={countPerPage}
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

        </div>

    )
}

export default AppPaginationComment