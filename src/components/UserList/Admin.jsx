import React, { useState, useEffect } from 'react';
import { IconButton, TextField, Box, AppBar, Tabs, Tab, Typography } from '@mui/material'
import PropTypes from 'prop-types';

import UserManagement from './UserManagement'
import BuzzManagement from './BuzzManagement'



// TabPanel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
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
        </div>
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

export default function Admin() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                    <Tab label="Users Management" {...a11yProps(0)} />
                    <Tab label="Buzzes Management" {...a11yProps(1)} />
                    {/* <Tab label="User List" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserManagement />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BuzzManagement />
            </TabPanel>
        </Box>
    )
}