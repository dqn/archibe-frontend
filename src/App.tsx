import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { ChannelList } from './components/pages/ChannelList';
import { Home } from './components/pages/Home';
import { VideoDetails } from './components/pages/VideoDetails';
import { Navigation } from './components/templetes/Navigation';
import { AppTheme, darkTheme, lightTheme } from './lib/theme';

// import { ChatList } from './components/pages/ChatList';

export const App: React.FC = () => {
  const themeLocalStorageKey = 'tubekids-theme';
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem(themeLocalStorageKey) === 'dark',
  );

  const handleToggleTheme = (checked: boolean) => {
    localStorage.setItem(themeLocalStorageKey, checked ? 'dark' : 'light');
    setIsDarkMode(checked);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Navigation isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />

        <Switch>
          <Route path="/channels" component={ChannelList} />
          <Route path="/videos/:id" component={VideoDetails} />
          {/* <Route path="/chats" component={ChatList} /> */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
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
