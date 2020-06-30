import '../styles.css';

import { AppProps } from 'next/app';
import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Navigation } from '@/components/templetes/Navigation';
import { AppTheme, darkTheme, lightTheme } from '@/lib/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  // const themeLocalStorageKey = 'tubekids-theme';
  const [isDarkMode, setIsDarkMode] = useState(
    // localStorage.getItem(themeLocalStorageKey) === 'dark',
    true,
  );

  const handleToggleTheme = (checked: boolean) => {
    // localStorage.setItem(themeLocalStorageKey, checked ? 'dark' : 'light');
    setIsDarkMode(checked);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Navigation isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
* {
  word-break: break-word;
  word-wrap: break-word;
}

body {
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.15s linear;
}

input {
  color: #000;
}

.link {
  color: #56b3b4;
}
`;

export default App;
