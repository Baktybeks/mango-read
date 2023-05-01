import React, {useEffect, useState} from 'react'
import {useDebounce} from "../../hook/debounce"
import {$api} from "../../axios"
import classes from "./search.module.sass"
import {useNavigate} from "react-router-dom"


function Search() {

    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('')

    const debounced = useDebounce(inputValue, 500)

    const [dropdown, setDropdown] = useState(false)

    const [search, setSearch] = useState([])

    const searchApi = async () => {
        const {data} = await $api.get(`v1/manga/`,
            {
                params: {
                    search: debounced
                }
            }
        )
        setSearch(data)
    }

    useEffect(() => {
        if (debounced.length >= 2) {
            searchApi().then(() => {
                setDropdown(true)
            })
        } else {
            setDropdown(false)
        }
    }, [debounced])

    return (
        <div className={classes.search}>
            <input
                className={classes.search__input}
                type="search"
                value={inputValue}
                placeholder="Placeholder"
                onChange={event => setInputValue(event.target.value)}
            />
            <span className={classes.search__img}></span>
            {dropdown &&
                <ul className={classes.search__dropdown}>
                    {
                        search.map(search => (
                            <li
                                key={search.id}
                                onClick={() => {
                                    navigate(`info/${search.id}`)
                                    setDropdown(false)
                                    setInputValue('')
                                }}
                            >
                                {search.ru_name}
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default Search