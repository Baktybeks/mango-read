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
import {setGenreManga, setTypeManga} from "../../store/slices/mangaSlice"

const theme = createTheme({typography: {fontFamily: 'Montserrat', fontSize: '24px'}})

const checkboxStyle = {
    '& .MuiSvgIcon-root': {fontSize: 49, color: "#2FE09B"},
    '&.Mui-checked': {color: "#2FE09B"},
    mr: "10px",
    ml: "10px"
}

function MuiCheckbox({muiCheckbox, manga}) {

    const dispatch = useDispatch()

    const {typeManga, genreManga} = useSelector(state => state.mangaReducer)

    // console.log("type", typeManga)
    // console.log("genre", genreManga)

    const setManga = manga ? typeManga : genreManga

    const setMangaFunc = (set, event) => {
        dispatch(set(event.target.checked))
        const index = setManga.indexOf(event.target.value)
        if (index === -1) {
            dispatch(set([...setManga, event.target.value]))
        } else {
            dispatch(set(setManga.filter(setManga => setManga !== event.target.value)))
        }
    }

    const handleSkillChange = (event) => (manga) ? setMangaFunc(setTypeManga, event) : setMangaFunc(setGenreManga, event)

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
                                label={<Typography theme={theme}>{checkBox}</Typography>}
                                control={<Checkbox
                                    sx={checkboxStyle}
                                    value={checkBox}
                                    key={checkBox}
                                    checked={setManga.includes(checkBox)}
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