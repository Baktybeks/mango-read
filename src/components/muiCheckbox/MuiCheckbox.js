import React from 'react'
import {
    Box,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormGroup,
    Typography,
    createTheme, FormLabel
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setGenreCheckbox, setTypeCheckbox} from "../../store/slices/mangaSlice"

const theme = createTheme({typography: {fontFamily: 'Montserrat', fontSize: '24px'}})

const checkboxStyle = {
    '& .MuiSvgIcon-root': {fontSize: 49, color: "#2FE09B"},
    '&.Mui-checked': {color: "#2FE09B"},
    mr: "10px",
    ml: "10px"
}

function MuiCheckbox({muiCheckbox, manga}) {

    const dispatch = useDispatch()

    const {typeCheckbox, genreCheckbox} = useSelector(state => state.mangaReducer)
    //
    // console.log("type", typeValue)
    // console.log("genreCheckbox", genreCheckbox)
    // console.log("typeCheckbox", typeCheckbox)

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
                        manga ? <FormLabel theme={theme} sx={{mb: "10px"}}>Тип</FormLabel> :
                            <FormLabel theme={theme} sx={{mb: "10px"}}>Жанр</FormLabel>
                    }
                    <FormGroup sx={{gap: "10px"}}>
                        {muiCheckbox.map((checkBox) =>
                            <FormControlLabel
                                label={<Typography theme={theme}>{checkBox.title}</Typography>}
                                control={<Checkbox
                                    sx={checkboxStyle}
                                    value={checkBox.title}
                                    key={checkBox.id}
                                    checked={setManga.includes(checkBox.title)}
                                    onChange={handleSkillChange}/>}
                            />
                        )}
                    </FormGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

export default MuiCheckbox