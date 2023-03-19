import React, {useState} from 'react'
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import UserSearch from './UserSearch';
import Recommendation from './Recommendation';

export default function Searching() {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleMouseLeave = () => {
        setIsFocused(false);
        document.activeElement.blur();
      };

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate("/search");
        }
    };

    return (
        <div onMouseLeave={handleMouseLeave}>
            <TextField
                placeholder="Search..."
                sx={{
                    margin: '20px auto',
                    width: '100%',
                    display: 'block',
                    textAlign: 'center',
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
                // onBlur={handleBlur}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
            />
            {isFocused && 
                <div>
                    <UserSearch input={input} />
                </div>
            }
            {!isFocused && <Recommendation />}
        </div>
    )
}
