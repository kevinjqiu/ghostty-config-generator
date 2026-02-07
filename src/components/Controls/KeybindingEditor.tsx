import React, { useState } from 'react';
import { Keybinding } from '../../types/config';

interface KeybindingEditorProps {
  label: string;
  value: Keybinding[];
  onChange: (value: Keybinding[]) => void;
  description?: string;
}

const commonActions = [
  'copy_to_clipboard',
  'paste_from_clipboard',
  'new_window',
  'new_tab',
  'close_surface',
  'close_window',
  'previous_tab',
  'next_tab',
  'goto_tab:1',
  'goto_tab:2',
  'goto_tab:3',
  'split:right',
  'split:down',
  'goto_split:previous',
  'goto_split:next',
  'equalize_splits',
  'resize_split:left,10',
  'resize_split:right,10',
  'resize_split:up,10',
  'resize_split:down,10',
  'scroll_page_up',
  'scroll_page_down',
  'scroll_to_top',
  'scroll_to_bottom',
  'increase_font_size:1',
  'decrease_font_size:1',
  'reset_font_size',
  'toggle_fullscreen',
  'inspector:toggle',
  'reload_config',
  'quit',
];

export const KeybindingEditor: React.FC<KeybindingEditorProps> = ({
  label,
  value,
  onChange,
  description,
}) => {
  const [newKey, setNewKey] = useState('');
  const [newAction, setNewAction] = useState('');

  const addKeybinding = () => {
    if (newKey && newAction) {
      onChange([...value, { key: newKey, action: newAction }]);
      setNewKey('');
      setNewAction('');
    }
  };

  const removeKeybinding = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-400 mb-2">{description}</p>
      )}

      {/* Existing keybindings */}
      {value.length > 0 && (
        <div className="mb-3 space-y-2">
          {value.map((binding, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded-md"
            >
              <code className="flex-1 text-sm text-purple-300 font-mono">
                {binding.key}
              </code>
              <span className="text-gray-500">=</span>
              <code className="flex-1 text-sm text-green-300 font-mono">
                {binding.action}
              </code>
              <button
                type="button"
                onClick={() => removeKeybinding(index)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new keybinding */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Key (e.g., ctrl+c)"
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono"
        />
        <select
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="">Select action...</option>
          {commonActions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addKeybinding}
          disabled={!newKey || !newAction}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};
