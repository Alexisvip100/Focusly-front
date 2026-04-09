import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './theme';

import { ColorModeContext } from './ColorModeContext';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'light' || savedMode === 'dark' ? savedMode : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const toggle = () => {
          document.body.classList.add('theme-transitioning');
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
          }, 450);
        };

        // Modern browsers with View Transition API
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            toggle();
          });
        } else {
          // Fallback for non-supporting browsers
          toggle();
        }
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => getDesignTokens(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
