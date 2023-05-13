import { createTheme, experimental_extendTheme as extendTheme  } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',            
        },
        secondary:{
            main: '#008080',
            light: '#f3e5f5',
            dark: '#ab47bc'
        },        
        error:{
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f'
        },
        warning:{
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#f57c00'
        },
        info:{
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1'
        },
        success:{
            main: '#66bb6a',
            light: '#81c784',
            dark: '#388e3c'
        }        
    }
})


const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',            
        },
        secondary:{
            main: '#008080',
            light: '#f3e5f5',
            dark: '#ab47bc'
        },        
        error:{
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f'
        },
        warning:{
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#f57c00'
        },
        info:{
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1'
        },
        success:{
            main: '#66bb6a',
            light: '#81c784',
            dark: '#388e3c'
        }        
    }
})

const commonTheme = createTheme(
    {
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: 16,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '1.5rem 0',
            },
            h2: {
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.3,
              margin: '1.3rem 0',
            },
            h3: {
              fontSize: '1.8rem',
              fontWeight: 700,
              lineHeight: 1.4,
              margin: '1.2rem 0',
            },
            h4: {
              fontSize: '1.5rem',
              fontWeight: 700,
              lineHeight: 1.5,
              margin: '1rem 0',
            },
            h5: {
              fontSize: '1.3rem',
              fontWeight: 700,
              lineHeight: 1.6,
              margin: '0.8rem 0',
            },
            h6: {
              fontSize: '1.2rem',
              fontWeight: 700,
              lineHeight: 1.7,
              margin: '0.6rem 0',
            },
            body1: {
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.6,
              margin: '1rem 0',
            },
            body2: {
              fontSize: '0.9rem',
              fontWeight: 400,
              lineHeight: 1.6,
              margin: '0.8rem 0',
            }
        }
    }
)

export const darkMode = extendTheme(darkTheme,commonTheme)
export const lightMode = extendTheme(lightTheme, commonTheme)


