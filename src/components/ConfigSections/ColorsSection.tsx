import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TextInput, NumberInput, ColorPicker } from '../Controls';

export const ColorsSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <TextInput
        label="Theme"
        value={getValue('theme')}
        onChange={(v) => setValue('theme', v)}
        description="Color theme name from Ghostty's built-in themes. Leave empty to use custom colors below."
        placeholder="e.g., dracula, nord, gruvbox"
      />

      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Custom Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Background"
            value={getValue('background')}
            onChange={(v) => setValue('background', v)}
            description="Background color of the terminal."
          />

          <ColorPicker
            label="Foreground"
            value={getValue('foreground')}
            onChange={(v) => setValue('foreground', v)}
            description="Text color of the terminal."
          />

          <ColorPicker
            label="Cursor Color"
            value={getValue('cursorColor')}
            onChange={(v) => setValue('cursorColor', v)}
            description="Color of the cursor."
          />

          <ColorPicker
            label="Cursor Text"
            value={getValue('cursorText')}
            onChange={(v) => setValue('cursorText', v)}
            description="Color of text under cursor."
          />

          <ColorPicker
            label="Selection Background"
            value={getValue('selectionBackground')}
            onChange={(v) => setValue('selectionBackground', v)}
            description="Background for selected text."
          />

          <ColorPicker
            label="Selection Foreground"
            value={getValue('selectionForeground')}
            onChange={(v) => setValue('selectionForeground', v)}
            description="Text color for selected text."
          />
        </div>
      </div>

      <NumberInput
        label="Background Opacity"
        value={getValue('backgroundOpacity')}
        onChange={(v) => setValue('backgroundOpacity', v)}
        description="Opacity of the background (0.0 to 1.0). Requires compositor support."
        min={0}
        max={1}
        step={0.05}
      />

      <NumberInput
        label="Minimum Contrast"
        value={getValue('minimumContrast')}
        onChange={(v) => setValue('minimumContrast', v)}
        description="Minimum contrast ratio between foreground and background (1 to 21)."
        min={1}
        max={21}
        step={0.5}
      />
    </div>
  );
};
