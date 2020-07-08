import '@/styles.css';
import 'react-tippy/dist/tippy.css';

import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Navigation } from '@/components/templetes/Navigation';
import { AppTheme, darkTheme, lightTheme } from '@/lib/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const themeKey = 'archibe-theme';

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem(themeKey) === 'dark');
  }, []);

  const handleToggleTheme = (checked: boolean) => {
    localStorage.setItem(themeKey, checked ? 'dark' : 'light');
    setIsDarkMode(checked);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="font-sans">
        <Navigation isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
        <Component {...pageProps} />
      </div>
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
}

input {
  color: #000;
}

.link {
  color: #c53030;
}
`;

export default App;
