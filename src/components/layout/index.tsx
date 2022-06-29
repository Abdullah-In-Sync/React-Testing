import * as React from 'react';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import Footer from '../footer';

const contentStyle = {
    marginTop: 55,
    backgroundColor: "#F5F5F5",
    width: '100vw',
    height: '90vh'
};
const wrapper = {
    backgroundColor: "white",
    borderRadius: "10px",
    margin: '5px 10px'
}
export default function Layout(props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar />
            <SideBar />
            <Box style={contentStyle}>
                <Box style={wrapper}>
                    {props.children}
                </Box>
            </Box>
            <Footer/>
        </Box>
    );
}
