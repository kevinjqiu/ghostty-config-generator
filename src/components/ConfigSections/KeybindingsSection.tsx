import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { KeybindingEditor } from '../Controls';

export const KeybindingsSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Keybinding Format</h3>
        <p className="text-xs text-gray-400 mb-3">
          Keys use modifiers like <code className="text-purple-300">ctrl</code>,{' '}
          <code className="text-purple-300">alt</code>,{' '}
          <code className="text-purple-300">shift</code>,{' '}
          <code className="text-purple-300">super</code> (cmd on macOS).
        </p>
        <p className="text-xs text-gray-400">
          Example: <code className="text-purple-300">ctrl+shift+t</code> for Ctrl+Shift+T
        </p>
      </div>

      <KeybindingEditor
        label="Custom Keybindings"
        value={getValue('keybindings')}
        onChange={(v) => setValue('keybindings', v)}
        description="Add custom keyboard shortcuts. These will override defaults."
      />

      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Common Actions</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li><code className="text-green-300">copy_to_clipboard</code> - Copy selected text</li>
          <li><code className="text-green-300">paste_from_clipboard</code> - Paste from clipboard</li>
          <li><code className="text-green-300">new_tab</code> - Open a new tab</li>
          <li><code className="text-green-300">close_surface</code> - Close current tab/split</li>
          <li><code className="text-green-300">split:right</code> - Split horizontally</li>
          <li><code className="text-green-300">split:down</code> - Split vertically</li>
          <li><code className="text-green-300">goto_split:next</code> - Focus next split</li>
          <li><code className="text-green-300">increase_font_size:1</code> - Increase font size</li>
          <li><code className="text-green-300">toggle_fullscreen</code> - Toggle fullscreen</li>
        </ul>
      </div>
    </div>
  );
};
