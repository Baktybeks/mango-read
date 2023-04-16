import React from 'react';
import {
    Box,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
    Typography,
    createTheme
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setGenreManga, setTypeManga} from "../../store/slices/mangaSlice";

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

    const handleSkillChange = (event) => {
        if (manga === "type") {
            dispatch(setTypeManga(event.target.checked))
            const index = typeManga.indexOf(event.target.value)
            if (index === -1) {
                dispatch(setTypeManga([...typeManga, event.target.value]))
            } else {
                dispatch(setTypeManga(typeManga.filter(typeManga => typeManga !== event.target.value)))
            }
        } else {
            dispatch(setGenreManga(event.target.checked))
            const index = genreManga.indexOf(event.target.value)
            if (index === -1) {
                dispatch(setGenreManga([...genreManga, event.target.value]))
            } else {
                dispatch(setGenreManga(genreManga.filter(genreManga => genreManga !== event.target.value)))
            }
        }
    }

    return (
        <Box>
            <Box>
                <FormControl>
                    <FormLabel theme={theme} sx={{mb: "10px"}}>Тип</FormLabel>
                    <FormGroup sx={{gap: "10px"}}>
                        {muiCheckbox.map(checkBox =>
                            <FormControlLabel
                                label={<Typography theme={theme}>{checkBox}</Typography>}
                                control={<Checkbox
                                    sx={checkboxStyle}
                                    value={checkBox}
                                    checked={(manga === "type" ? typeManga : genreManga).includes(checkBox)}
                                    onChange={handleSkillChange}/>}
                            />
                        )}
                    </FormGroup>
                </FormControl>
            </Box>
        </Box>
    );
}

export default MuiCheckbox;

// defaultChecked
// sx={{
//     '& .MuiSvgIcon-root': {fontSize: 49},
//     size: 455,
//         color: "#2FE09B",
//         '&.Mui-checked': {
//         color: "#2FE09B"
//     },

// function MuiCheckbox(props) {
//     const [check, setChecked] = useState(false)
//     const handleChange = (event) => {
//         setChecked(event.target.checked)
//     }
//     console.log(check)
//     return (
//         <Box>
//             <Box>
//                 <FormControlLabel
//                     label='Я красавчег'
//                     control={<Checkbox checked={check} onChange={handleChange}/>}
//                 />
//             </Box>
//         </Box>
//     );
// }