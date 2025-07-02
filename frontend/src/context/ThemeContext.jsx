import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const mode = sessionStorage.getItem('theme');
        if (mode) setTheme(mode);
    }, []);

    useEffect(() => {
        document.body.className = theme;
        sessionStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { useTheme, ThemeProvider };
