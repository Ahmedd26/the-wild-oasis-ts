import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({
    isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
        "isDarkMode"
    );
    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }
        },
        [isDarkMode]
    );
    function toggleDarkMode() {
        setIsDarkMode((isDark: boolean) => !isDark);
    }
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export { DarkModeContext, DarkModeProvider };
