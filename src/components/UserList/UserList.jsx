/*
Component Name: UserList.jsx
Description: The container for the follower and following interface.
References: https://mui.com/material-ui/react-tabs/
*/

import React, { useState, useEffect } from 'react';
import { IconButton, TextField, Box, AppBar, Tabs, Tab, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Following from './Following'
import Follower from './Follower'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserList() {
    const { userid, type } = useParams();
    const [value, setValue] = React.useState( parseInt(type, 10) );

    const handleChange = (event, newValue) => {
        setValue(newValue);
        window.history.pushState(null, '', `/#/userlist/${userid}/${newValue}`);
    };

    return (
        <Box sx={{ width: '90%' }}>
            <Box
                height={50}
                sx={{
                    padding: '5px',
                }}>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Following" {...a11yProps(0)} />
                    <Tab label="Followers" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Following userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Follower userid={userid} />
            </TabPanel>
        </Box>
    )
}
