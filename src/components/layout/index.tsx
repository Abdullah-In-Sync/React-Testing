import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from '../navbar';
import SideBar from '../sidebar'


export default function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            <SideBar />
            
        </Box>
    );
}
