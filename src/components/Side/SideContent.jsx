import React, {useState, useRef, useEffect} from 'react'

// material-ui
import { TextField, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

// components
import UserSearch from './UserSearch'
import News from './News'

export default function SideContent() {
    const [isFocused, setIsFocused] = useState(false)
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const searchRef = useRef(null)

    // Listener
    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleInput = (event) => {
        setInput(event.target.value)
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            jumpSearch()
        }
    }
    const jumpSearch = () => {
        navigate(`/`)
        navigate(`/search/${input}`)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false)
                document.activeElement.blur()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchRef])

    return (
        <div ref={searchRef} style={{ height: '100vh', width: '100%', position: 'relative' }}>
            {/* <div style={{position: 'fixed' }}> */}
            <div>
                <TextField
                    placeholder="Search..."
                    sx={{ margin: '20px auto', width: '100%', display: 'block', textAlign: 'center' }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={jumpSearch} size="large">
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    onFocus={handleFocus}
                    onChange={handleInput}
                    onKeyPress={handleEnter}
                />
                {isFocused && 
                    <div style={{ overflowY: 'auto' }}>
                        <UserSearch input={input} />
                    </div>
                }
                {!isFocused && 
                    <div>
                        <News />
                    </div>
                }
            </div>
        </div>
    )
}