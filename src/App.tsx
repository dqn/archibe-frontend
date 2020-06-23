import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Home } from './components/pages/Home';
import { Navigation } from './components/templetes/Navigation';
import { ChannelList } from './components/pages/ChannelList';
import { VideoList } from './components/pages/VideoList';
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
          <Route path="/videos" component={VideoList} />
          {/* <Route path="/chats" component={ChatList} /> */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

type AppTheme = {
  bg: string;
  color: string;
  chat: {
    channelName: {
      normalColor: string;
      memberColor: string;
      verifiedColor: string;
      verifiedBg: string;
    };
    textColor: string;
    timeColor: string;
  };
};

const lightTheme: AppTheme = {
  bg: '#fff',
  color: '#111',
  chat: {
    channelName: {
      normalColor: '#11111199',
      memberColor: '#107516',
      verifiedColor: '#606060',
      verifiedBg: '#e9e9e9',
    },
    textColor: '#111',
    timeColor: '#11111168',
  },
};

const darkTheme: AppTheme = {
  bg: '#181818',
  color: '#fff',
  chat: {
    channelName: {
      normalColor: '#ffffffb2',
      memberColor: '#2ba640',
      verifiedColor: '#cccccc',
      verifiedBg: '#e9e9e9',
    },
    textColor: '#fff',
    timeColor: '#ffffff8a',
  },
};

const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
* {
  word-break: break-word;
  word-wrap: break-word;
}

input {
  color: #000;
}

.link {
  color: #56b3b4;
}

body {
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.15s linear;
}

.chat-channel-name {
  color: ${({ theme }) => theme.chat.channelName.normalColor};
}

.chat-channel-name-member {
  color: ${({ theme }) => theme.chat.channelName.memberColor};
}

.chat-channel-name-verified {
  color: ${({ theme }) => theme.chat.channelName.verifiedColor};
  background-color: ${({ theme }) => theme.chat.channelName.verifiedBg};
}

.chat-text {
  color: ${({ theme }) => theme.chat.textColor};
}

.chat-time {
  color: ${({ theme }) => theme.chat.timeColor};
}
`;
