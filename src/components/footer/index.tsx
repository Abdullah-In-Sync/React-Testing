import * as React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const footerStyle = {
    paddin: 2,
    fontSize: '0.6em',
    justifyContent: 'flex-end',
    zIndex: 1,
    background: 'rgb(58, 58, 60)',
    color: 'custom.light',
    width: '100%',
    // paddingRight: '40px',
    // paddingBottom: '3px',
    right: 0,
    bottom: 0,
    position: 'fixed'
}

const footerLink = {
    color: 'custom.light',
    textDecoration: 'none',
    margin: 2
}
const Footer = () => {

    return (
        <Box  sx={footerStyle}>
           
            <Grid item md={12}>
                <Grid container pt={0.5}>
                    <Grid item xs={12} md={9} >

                        <Link sx={footerLink} href="/about" >
                            About
                        </Link>
                        <Link sx={footerLink} href="/term">
                            Terms of Service
                        </Link>
                        <Link sx={footerLink} href="/policy">
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={3} style={{ textAlign: 'right', paddingRight: '40px' }}>
                        © {new Date().getFullYear()} MyHelp
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
};
export default Footer;

