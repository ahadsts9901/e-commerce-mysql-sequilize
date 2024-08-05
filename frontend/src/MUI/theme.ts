import '@fontsource/josefin-sans/300.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/500.css';
import '@fontsource/josefin-sans/700.css';

import { createTheme } from '@mui/material/styles';

export const theme: any = {

    palette: {
        primary: {
            light: '#3F5873',
            main: '#364B63',
            dark: '#2D3F52',
            contrastText: '#EEF4F6',
        },
        secondary: {
            light: '#fff',
            main: '#fff',
            dark: '#fff',
            contrastText: '#364B63',
        },
        success: {
            light: '#19B373',
            main: '#138656',
            dark: '#0D5939',
            contrastText: '#E9FCF4',
        },
        error: {
            light: '#F07575',
            main: '#EE5D5D',
            dark: '#EC4646',
            contrastText: '#FCE8E8',
        },
        warning: {
            light: '#F4E98B',
            main: '#F1E574',
            dark: '#F0E15C',
            contrastText: '#453F07',
        },
        info: {
            light: '#0081CC',
            main: '#0071B3',
            dark: '#006199',
            contrastText: '#E6F6FF',
        },
        grey: {
            light: '#5F7686',
            main: '#556977',
            dark: '#4A5C68',
            contrastText: '#F0F3F4',
        },
        text: {
            primary: '#555',
            secondary: '#777',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: 'Josefin Sans, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "10px 20px"
                },
                containedSecondary: {
                    border: "1px solid #364B63",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                        border: "2px solid #364B63",
                        padding: "8.75px 19px"
                    }
                },
            }
        }
    }

}

export const muiTheme = createTheme(theme);