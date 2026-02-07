export type CursorStyle = 'block' | 'bar' | 'underline' | 'block_hollow';
export type WindowDecoration = 'auto' | 'client' | 'server' | 'none';
export type WindowTheme = 'auto' | 'system' | 'light' | 'dark' | 'ghostty';
export type ClipboardAccess = 'ask' | 'allow' | 'deny';
export type ShellIntegration = 'none' | 'detect' | 'bash' | 'elvish' | 'fish' | 'zsh';

export interface Keybinding {
  key: string;
  action: string;
}

export interface GhosttyConfig {
  // Font settings
  fontFamily: string;
  fontSize: number;
  fontStyleBold: string;
  fontStyleItalic: string;
  fontStyleBoldItalic: string;
  fontThicken: boolean;
  fontSyntheticStyle: boolean;
  adjustCellWidth: string;
  adjustCellHeight: string;

  // Colors & Theme
  theme: string;
  background: string;
  foreground: string;
  cursorColor: string;
  cursorText: string;
  selectionBackground: string;
  selectionForeground: string;
  backgroundOpacity: number;
  minimumContrast: number;
  palette: string[];

  // Cursor
  cursorStyle: CursorStyle;
  cursorStyleBlink: boolean;
  cursorOpacity: number;
  cursorClickToMove: boolean;

  // Window
  windowWidth: number;
  windowHeight: number;
  windowPaddingX: number;
  windowPaddingY: number;
  windowPaddingBalance: boolean;
  windowPaddingColor: string;
  windowDecoration: WindowDecoration;
  windowTheme: WindowTheme;
  windowVsync: boolean;
  fullscreen: boolean;
  maximize: boolean;
  backgroundBlurRadius: number;
  title: string;
  className: string;
  initialWindow: boolean;
  resizeOverlay: string;
  focusFollowsMouse: boolean;

  // Mouse & Scrolling
  mouseHideWhileTyping: boolean;
  mouseScrollMultiplier: number;
  scrollbackLimit: number;

  // Clipboard
  copyOnSelect: boolean;
  clipboardRead: ClipboardAccess;
  clipboardWrite: ClipboardAccess;
  clipboardPasteProtection: boolean;
  clipboardTrimTrailingSpaces: boolean;

  // Shell Integration
  shellIntegration: ShellIntegration;
  shellIntegrationFeatures: string[];
  command: string;
  workingDirectory: string;

  // Keybindings
  keybindings: Keybinding[];

  // Advanced
  imageStorageLimit: number;
  confirmCloseSurface: boolean;
  titleReport: boolean;
  enquiryResponse: string;
  boldIsBright: boolean;
  termEnv: string;
  autoUpdate: string;
  customShaderAnimation: boolean;
}

export type ConfigKey = keyof GhosttyConfig;

export interface ConfigOption {
  key: ConfigKey;
  label: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'multiselect' | 'keybindings' | 'palette';
  default: GhosttyConfig[ConfigKey];
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  category: ConfigCategory;
}

export type ConfigCategory =
  | 'fonts'
  | 'colors'
  | 'cursor'
  | 'window'
  | 'mouse'
  | 'clipboard'
  | 'shell'
  | 'keybindings'
  | 'advanced';

export interface ConfigPreset {
  name: string;
  description: string;
  config: Partial<GhosttyConfig>;
}
