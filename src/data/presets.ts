import { ConfigPreset } from '../types/config';

export const presets: ConfigPreset[] = [
  {
    name: 'Dracula',
    description: 'A dark theme with purple accents',
    config: {
      background: '#282a36',
      foreground: '#f8f8f2',
      cursorColor: '#f8f8f2',
      cursorText: '#282a36',
      selectionBackground: '#44475a',
      selectionForeground: '#f8f8f2',
    },
  },
  {
    name: 'Nord',
    description: 'An arctic, north-bluish color palette',
    config: {
      background: '#2e3440',
      foreground: '#d8dee9',
      cursorColor: '#d8dee9',
      cursorText: '#2e3440',
      selectionBackground: '#434c5e',
      selectionForeground: '#eceff4',
    },
  },
  {
    name: 'Gruvbox Dark',
    description: 'Retro groove color scheme',
    config: {
      background: '#282828',
      foreground: '#ebdbb2',
      cursorColor: '#ebdbb2',
      cursorText: '#282828',
      selectionBackground: '#504945',
      selectionForeground: '#ebdbb2',
    },
  },
  {
    name: 'One Dark',
    description: 'Atom One Dark theme colors',
    config: {
      background: '#282c34',
      foreground: '#abb2bf',
      cursorColor: '#528bff',
      cursorText: '#282c34',
      selectionBackground: '#3e4451',
      selectionForeground: '#abb2bf',
    },
  },
  {
    name: 'Catppuccin Mocha',
    description: 'Soothing pastel theme for the high-spirited',
    config: {
      background: '#1e1e2e',
      foreground: '#cdd6f4',
      cursorColor: '#f5e0dc',
      cursorText: '#1e1e2e',
      selectionBackground: '#45475a',
      selectionForeground: '#cdd6f4',
    },
  },
  {
    name: 'Tokyo Night',
    description: 'A clean dark theme celebrating Tokyo city lights',
    config: {
      background: '#1a1b26',
      foreground: '#c0caf5',
      cursorColor: '#c0caf5',
      cursorText: '#1a1b26',
      selectionBackground: '#283457',
      selectionForeground: '#c0caf5',
    },
  },
  {
    name: 'Solarized Dark',
    description: 'Precision colors for machines and people',
    config: {
      background: '#002b36',
      foreground: '#839496',
      cursorColor: '#839496',
      cursorText: '#002b36',
      selectionBackground: '#073642',
      selectionForeground: '#93a1a1',
    },
  },
  {
    name: 'Monokai Pro',
    description: 'Professional dark theme with vibrant colors',
    config: {
      background: '#2d2a2e',
      foreground: '#fcfcfa',
      cursorColor: '#fcfcfa',
      cursorText: '#2d2a2e',
      selectionBackground: '#403e41',
      selectionForeground: '#fcfcfa',
    },
  },
  {
    name: 'GitHub Dark',
    description: 'GitHub\'s dark mode colors',
    config: {
      background: '#0d1117',
      foreground: '#c9d1d9',
      cursorColor: '#58a6ff',
      cursorText: '#0d1117',
      selectionBackground: '#264f78',
      selectionForeground: '#c9d1d9',
    },
  },
  {
    name: 'Rosé Pine',
    description: 'All natural pine, faux fur and a bit of soho vibes',
    config: {
      background: '#191724',
      foreground: '#e0def4',
      cursorColor: '#e0def4',
      cursorText: '#191724',
      selectionBackground: '#2a273f',
      selectionForeground: '#e0def4',
    },
  },
];

export const getPresetByName = (name: string): ConfigPreset | undefined => {
  return presets.find((preset) => preset.name === name);
};
