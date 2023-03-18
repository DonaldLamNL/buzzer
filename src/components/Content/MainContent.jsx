import { LinearProgress } from '@mui/material'
import React, { Component } from 'react'
import Buzz from './MainContent/Buzz'
import PostBuzz from './MainContent/Post'

export default class MainContent extends Component {
    render() {
        return (
        <div>
            <PostBuzz />
            <Buzz />
            <Buzz />
            <Buzz />
            <Buzz />
            <Buzz />
            <LinearProgress />
        </div>
        )
    }
}
