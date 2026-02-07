import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { generateConfig } from '../../utils/configGenerator';
import { presets } from '../../data/presets';
import { isTauri } from '../../utils/tauriFs';

export const PreviewPanel: React.FC = () => {
  const { state, applyPreset, resetConfig, saveToFile } = useConfig();
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const configOutput = generateConfig(state.config);
  const inTauri = isTauri();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([configOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    setSaveState('saving');
    try {
      await saveToFile();
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch (err) {
      console.error('Failed to save config:', err);
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 3000);
    }
  };

  return (
    <aside className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-200 mb-3">Config Preview</h2>
        <div className="flex gap-2">
          {inTauri && (
            <button
              onClick={handleSave}
              disabled={!state.isDirty && saveState === 'idle'}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                saveState === 'saved'
                  ? 'bg-green-600 text-white'
                  : saveState === 'error'
                  ? 'bg-red-600 text-white'
                  : saveState === 'saving'
                  ? 'bg-purple-700 text-white opacity-75'
                  : state.isDirty
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saveState === 'saving'
                ? 'Saving...'
                : saveState === 'saved'
                ? 'Saved!'
                : saveState === 'error'
                ? 'Error!'
                : 'Save'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              inTauri
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Download
          </button>
        </div>
        {inTauri && saveState === 'saved' && (
          <p className="mt-2 text-xs text-gray-500">
            Press <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-400">Cmd+Shift+,</kbd> in Ghostty to reload
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-all leading-relaxed">
          {configOutput || '# No configuration changes'}
        </pre>
      </div>

      <div className="p-4 border-t border-gray-800">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {presets.slice(0, 6).map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.config)}
              className="px-3 py-2 bg-gray-800 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors truncate"
              title={preset.description}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: preset.config.background }}
              />
              {preset.name}
            </button>
          ))}
        </div>
        <button
          onClick={resetConfig}
          className="w-full px-3 py-2 bg-gray-800 text-gray-400 rounded-md text-xs font-medium hover:bg-red-900 hover:text-red-300 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </aside>
  );
};
