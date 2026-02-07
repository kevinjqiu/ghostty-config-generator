import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GhosttyConfig, ConfigKey, ConfigCategory } from '../types/config';
import { defaultConfig } from '../data/configSchema';
import { generateConfig } from '../utils/configGenerator';
import { parseConfig, mergeWithDefaults } from '../utils/configParser';
import { isTauri, readConfigFile, writeConfigFile } from '../utils/tauriFs';

type ConfigAction =
  | { type: 'SET_VALUE'; key: ConfigKey; value: GhosttyConfig[ConfigKey] }
  | { type: 'SET_CONFIG'; config: Partial<GhosttyConfig> }
  | { type: 'RESET' }
  | { type: 'LOAD'; config: GhosttyConfig }
  | { type: 'IMPORT'; config: GhosttyConfig }
  | { type: 'MARK_CLEAN' }
  | { type: 'SET_LOADING'; loading: boolean };

interface ConfigState {
  config: GhosttyConfig;
  activeCategory: ConfigCategory;
  searchQuery: string;
  isLoading: boolean;
  isDirty: boolean;
}

type ConfigContextAction =
  | ConfigAction
  | { type: 'SET_CATEGORY'; category: ConfigCategory }
  | { type: 'SET_SEARCH'; query: string };

interface ConfigContextType {
  state: ConfigState;
  dispatch: React.Dispatch<ConfigContextAction>;
  setValue: <K extends ConfigKey>(key: K, value: GhosttyConfig[K]) => void;
  getValue: <K extends ConfigKey>(key: K) => GhosttyConfig[K];
  applyPreset: (presetConfig: Partial<GhosttyConfig>) => void;
  resetConfig: () => void;
  importConfig: (config: GhosttyConfig) => void;
  saveToFile: () => Promise<void>;
  loadFromFile: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

function configReducer(state: ConfigState, action: ConfigContextAction): ConfigState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        isDirty: true,
        config: {
          ...state.config,
          [action.key]: action.value,
        },
      };
    case 'SET_CONFIG':
      return {
        ...state,
        isDirty: true,
        config: {
          ...state.config,
          ...action.config,
        },
      };
    case 'RESET':
      return {
        ...state,
        isDirty: true,
        config: { ...defaultConfig },
      };
    case 'LOAD':
      return {
        ...state,
        isLoading: false,
        isDirty: false,
        config: action.config,
      };
    case 'IMPORT':
      return {
        ...state,
        isDirty: true,
        config: action.config,
      };
    case 'MARK_CLEAN':
      return {
        ...state,
        isDirty: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        activeCategory: action.category,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.query,
      };
    default:
      return state;
  }
}

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(configReducer, {
    config: { ...defaultConfig },
    activeCategory: 'fonts',
    searchQuery: '',
    isLoading: isTauri(),
    isDirty: false,
  });

  // On mount, read config file if running in Tauri
  useEffect(() => {
    if (!isTauri()) return;

    (async () => {
      try {
        const content = await readConfigFile();
        if (content) {
          const parsed = parseConfig(content);
          const full = mergeWithDefaults(parsed);
          dispatch({ type: 'LOAD', config: full });
        } else {
          dispatch({ type: 'LOAD', config: { ...defaultConfig } });
        }
      } catch (err) {
        console.error('Failed to load config file:', err);
        dispatch({ type: 'LOAD', config: { ...defaultConfig } });
      }
    })();
  }, []);

  const setValue = <K extends ConfigKey>(key: K, value: GhosttyConfig[K]) => {
    dispatch({ type: 'SET_VALUE', key, value });
  };

  const getValue = <K extends ConfigKey>(key: K): GhosttyConfig[K] => {
    return state.config[key];
  };

  const applyPreset = (presetConfig: Partial<GhosttyConfig>) => {
    dispatch({ type: 'SET_CONFIG', config: presetConfig });
  };

  const resetConfig = () => {
    dispatch({ type: 'RESET' });
  };

  const importConfig = (config: GhosttyConfig) => {
    dispatch({ type: 'IMPORT', config });
  };

  const saveToFile = useCallback(async () => {
    const content = generateConfig(state.config);
    await writeConfigFile(content);
    dispatch({ type: 'MARK_CLEAN' });
  }, [state.config]);

  const loadFromFile = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const content = await readConfigFile();
      if (content) {
        const parsed = parseConfig(content);
        const full = mergeWithDefaults(parsed);
        dispatch({ type: 'LOAD', config: full });
      } else {
        dispatch({ type: 'LOAD', config: { ...defaultConfig } });
      }
    } catch (err) {
      console.error('Failed to reload config file:', err);
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        state,
        dispatch,
        setValue,
        getValue,
        applyPreset,
        resetConfig,
        importConfig,
        saveToFile,
        loadFromFile,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
