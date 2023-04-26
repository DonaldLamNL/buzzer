/*
Component Name: SideContent.jsx
Description: The container of the side content components, including News and UserSearch.
*/

import React, { useState, useRef, useEffect } from 'react'
import { TextField, IconButton, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import UserSearch from './UserSearch'
import News from './News'
import Cookies from 'js-cookie'

export default function SideContent() {
    const [isFocused, setIsFocused] = useState(false)
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const searchRef = useRef(null)

    // when user click the user searching box, switch to the UserSearch component
    const handleFocus = () => {
        setIsFocused(true)
    }
    // set input box content based on user input
    const handleInput = (event) => {
        setInput(event.target.value)
    }
    // when user click enter, navigate to the buzz searching page
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            jumpSearch()
        }
    }
    const jumpSearch = () => {
        navigate(`/`)
        navigate(`/search/${input}`)
    }

    useEffect( () => {
        // when user click the area out of the side content, switch to the News component
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
        <div ref={searchRef}
            style={{
                width: '90%',
                position: 'relative',
                justifyContent: 'center',
                margin: '0 auto'
            }}>
            <div>
                {/* Searching input box */}
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

                {/* Display the component based on inout box state */}
                {isFocused &&
                    <div style={{ overflowY: 'auto' }}>
                        <UserSearch input={input} key={input}/>
                    </div>
                }
                {!isFocused &&
                    <div>
                        <News />
                    </div>
                }
                <Box marginBottom={'50px'}></Box>
            </div>
        </div>
    )
}