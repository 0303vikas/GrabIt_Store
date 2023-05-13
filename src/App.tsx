import React, { createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material'

import { darkMode, lightMode } from './themes/mainTheme'


const App = () => {
    const [darkTheme,setDarkTheme] = useState<false|true>(false)
    const changeMode = ()=> setDarkTheme(!darkTheme)
    const ModeContext = createContext<typeof changeMode|null>(null)
    
    if(darkTheme) return (
        <ThemeProvider theme={darkMode}>
            <div>App Dark</div>
        </ThemeProvider>
    )

    return (
        <ModeContext.Provider value={changeMode}>
            <ThemeProvider theme={lightMode}>
                <div>App Light</div>
            </ThemeProvider>
        </ModeContext.Provider>
    )
}

export default App