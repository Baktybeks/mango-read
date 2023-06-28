import React from 'react'
import {
    Box,
    FormControl,
    FormGroup,
    createTheme, FormLabel
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setGenreCheckbox, setTypeCheckbox} from "../../store/slices/filterSlice"
import classes from "./muiCheckbox.module.sass"

const theme = createTheme({
    typography:
        {
            fontFamily: 'Montserrat',
            fontSize: '24px',
            mr: "10px",
            ml: "10px"
        },
})

function MuiCheckbox({muiCheckbox, manga}) {

    const dispatch = useDispatch()

    const {typeCheckbox, genreCheckbox} = useSelector(state => state.filterReducer)

    const setManga = manga ? typeCheckbox : genreCheckbox

    const setMangaFunc = (set, event) => {
        dispatch(set(event.target.checked))
        const index = setManga.indexOf(event.target.value)
        if (index === -1) {
            dispatch(set([...setManga, event.target.value]))
        } else {
            dispatch(set(setManga.filter(setManga => setManga !== event.target.value)))
        }
    }

    const handleSkillChange = (event) => (manga) ? setMangaFunc(setTypeCheckbox, event) : setMangaFunc(setGenreCheckbox, event)

    return (
        <Box>
            <Box>
                <FormControl>
                    {
                        manga ? <FormLabel theme={theme} sx={
                            {
                                mt: "33px",
                                mb: "10px",
                                color: "#000000"
                            }
                        }>Тип</FormLabel> :
                            <FormLabel theme={theme} sx={
                                {
                                    mt: "8px",
                                    mb: "5px",
                                    fontSize: 35,
                                    color: "#000000"
                                }
                            }>Жанры</FormLabel>
                    }

                    <FormGroup sx={{gap: "10px"}}>
                        {muiCheckbox.map((checkBox) =>
                                <label htmlFor="checkbox" className={classes.label}>
                                    <input
                                        className={classes.label_input}
                                        type="checkbox"
                                        value={checkBox.title}
                                        key={checkBox.id}
                                        checked={setManga.includes(checkBox.title)}
                                        onChange={handleSkillChange}
                                    />
                                    <div className={classes.label_title}>{checkBox.title}</div>
                                </label>
                        )}
                    </FormGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

export default MuiCheckbox