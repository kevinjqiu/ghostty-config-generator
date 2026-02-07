import { GhosttyConfig, ConfigKey, Keybinding } from '../types/config';
import { defaultConfig } from '../data/configSchema';

// Reverse mapping from Ghostty's kebab-case to our camelCase keys
const reverseKeyMapping: Record<string, ConfigKey> = {
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-style-bold': 'fontStyleBold',
  'font-style-italic': 'fontStyleItalic',
  'font-style-bold-italic': 'fontStyleBoldItalic',
  'font-thicken': 'fontThicken',
  'font-synthetic-style': 'fontSyntheticStyle',
  'adjust-cell-width': 'adjustCellWidth',
  'adjust-cell-height': 'adjustCellHeight',
  'theme': 'theme',
  'background': 'background',
  'foreground': 'foreground',
  'cursor-color': 'cursorColor',
  'cursor-text': 'cursorText',
  'selection-background': 'selectionBackground',
  'selection-foreground': 'selectionForeground',
  'background-opacity': 'backgroundOpacity',
  'minimum-contrast': 'minimumContrast',
  'cursor-style': 'cursorStyle',
  'cursor-style-blink': 'cursorStyleBlink',
  'cursor-opacity': 'cursorOpacity',
  'cursor-click-to-move': 'cursorClickToMove',
  'window-width': 'windowWidth',
  'window-height': 'windowHeight',
  'window-padding-x': 'windowPaddingX',
  'window-padding-y': 'windowPaddingY',
  'window-padding-balance': 'windowPaddingBalance',
  'window-padding-color': 'windowPaddingColor',
  'window-decoration': 'windowDecoration',
  'window-theme': 'windowTheme',
  'window-vsync': 'windowVsync',
  'fullscreen': 'fullscreen',
  'maximize': 'maximize',
  'background-blur-radius': 'backgroundBlurRadius',
  'title': 'title',
  'class': 'className',
  'initial-window': 'initialWindow',
  'resize-overlay': 'resizeOverlay',
  'focus-follows-mouse': 'focusFollowsMouse',
  'mouse-hide-while-typing': 'mouseHideWhileTyping',
  'mouse-scroll-multiplier': 'mouseScrollMultiplier',
  'scrollback-limit': 'scrollbackLimit',
  'copy-on-select': 'copyOnSelect',
  'clipboard-read': 'clipboardRead',
  'clipboard-write': 'clipboardWrite',
  'clipboard-paste-protection': 'clipboardPasteProtection',
  'clipboard-trim-trailing-spaces': 'clipboardTrimTrailingSpaces',
  'shell-integration': 'shellIntegration',
  'shell-integration-features': 'shellIntegrationFeatures',
  'command': 'command',
  'working-directory': 'workingDirectory',
  'image-storage-limit': 'imageStorageLimit',
  'confirm-close-surface': 'confirmCloseSurface',
  'title-report': 'titleReport',
  'enquiry-response': 'enquiryResponse',
  'bold-is-bright': 'boldIsBright',
  'term': 'termEnv',
  'auto-update': 'autoUpdate',
  'custom-shader-animation': 'customShaderAnimation',
};

function parseValue(key: ConfigKey, value: string): unknown {
  const trimmedValue = value.trim();

  // Handle booleans
  if (trimmedValue === 'true') return true;
  if (trimmedValue === 'false') return false;

  // Get the default value to determine the expected type
  const defaultValue = defaultConfig[key];

  // If default is a number, parse as number
  if (typeof defaultValue === 'number') {
    const num = parseFloat(trimmedValue);
    return isNaN(num) ? defaultValue : num;
  }

  // If default is boolean, try to parse as boolean
  if (typeof defaultValue === 'boolean') {
    if (trimmedValue === 'true' || trimmedValue === '1') return true;
    if (trimmedValue === 'false' || trimmedValue === '0') return false;
    return defaultValue;
  }

  return trimmedValue;
}

export function parseConfig(configText: string): Partial<GhosttyConfig> {
  const config: Partial<GhosttyConfig> = {};
  const keybindings: Keybinding[] = [];
  const shellIntegrationFeatures: string[] = [];
  const palette: string[] = [];

  const lines = configText.split('\n');

  for (const line of lines) {
    // Skip empty lines and comments
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    // Parse key = value
    const equalsIndex = trimmedLine.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const rawKey = trimmedLine.substring(0, equalsIndex).trim();
    const rawValue = trimmedLine.substring(equalsIndex + 1).trim();

    // Handle keybindings specially
    if (rawKey === 'keybind') {
      const bindingEquals = rawValue.indexOf('=');
      if (bindingEquals !== -1) {
        keybindings.push({
          key: rawValue.substring(0, bindingEquals),
          action: rawValue.substring(bindingEquals + 1),
        });
      }
      continue;
    }

    // Handle shell-integration-features specially (can appear multiple times)
    if (rawKey === 'shell-integration-features') {
      shellIntegrationFeatures.push(rawValue);
      continue;
    }

    // Handle palette specially
    if (rawKey === 'palette') {
      const paletteEquals = rawValue.indexOf('=');
      if (paletteEquals !== -1) {
        const index = parseInt(rawValue.substring(0, paletteEquals), 10);
        const color = rawValue.substring(paletteEquals + 1);
        if (!isNaN(index) && index >= 0 && index < 256) {
          palette[index] = color;
        }
      }
      continue;
    }

    // Map to our internal key
    const internalKey = reverseKeyMapping[rawKey];
    if (!internalKey) {
      // Unknown key, skip
      continue;
    }

    const parsedValue = parseValue(internalKey, rawValue);
    // Type assertion needed because we're dynamically assigning
    (config as Record<string, unknown>)[internalKey] = parsedValue;
  }

  // Add collected arrays
  if (keybindings.length > 0) {
    config.keybindings = keybindings;
  }
  if (shellIntegrationFeatures.length > 0) {
    config.shellIntegrationFeatures = shellIntegrationFeatures;
  }
  if (palette.length > 0) {
    config.palette = palette;
  }

  return config;
}

export function mergeWithDefaults(partial: Partial<GhosttyConfig>): GhosttyConfig {
  return { ...defaultConfig, ...partial };
}
