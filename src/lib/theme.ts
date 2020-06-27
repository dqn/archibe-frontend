export const lightTheme = {
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
} as const;

export const darkTheme = {
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
} as const;

export type AppTheme = typeof lightTheme | typeof darkTheme;
