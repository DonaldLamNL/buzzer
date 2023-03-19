import React, {useState} from 'react'
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import UserSearch from './UserSearch';
import Recommendation from './Recommendation';



export default function Searching() {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }


    return ( <>
        <TextField
            placeholder="Search..."
            sx={{
                margin: '20px auto',
                width: '90%',
                display: 'block',
                textAlign: 'center'
            }}
            InputProps={{
                endAdornment: (
                    <Link to="/search">
                        <IconButton size="large">
                            <SearchIcon />
                        </IconButton>
                    </Link>
                ),
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
        {isFocused && (
            <UserSearch />
        )}
        {!isFocused && (
            <Recommendation />
        )}
    </>)
}
