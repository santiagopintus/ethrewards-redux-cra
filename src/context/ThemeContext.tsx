import React, { ReactNode, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";

const ThemeContext = React.createContext({});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  // Get theme state from Redux
  const isDarkMode = useAppSelector(
    (state: RootState) => state.theme.isDarkMode
  );

  // Create MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#1f41bb",
          },
          secondary: {
            main: isDarkMode ? "#fc3c64" : "#9540fc",
          },
          background: {
            default: isDarkMode ? "#101728" : "#fafafa",
          },
        },
      }),
    [isDarkMode] // Recreate theme whenever isDarkMode changes
  );

  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalizing styles */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);
