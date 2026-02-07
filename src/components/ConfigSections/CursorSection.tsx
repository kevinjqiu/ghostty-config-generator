import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { SelectInput, NumberInput, Toggle } from '../Controls';

export const CursorSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <SelectInput
        label="Cursor Style"
        value={getValue('cursorStyle')}
        onChange={(v) => setValue('cursorStyle', v as 'block' | 'bar' | 'underline' | 'block_hollow')}
        options={['block', 'bar', 'underline', 'block_hollow']}
        description="Visual style of the cursor."
      />

      <Toggle
        label="Cursor Blink"
        value={getValue('cursorStyleBlink')}
        onChange={(v) => setValue('cursorStyleBlink', v)}
        description="Whether the cursor should blink."
      />

      <NumberInput
        label="Cursor Opacity"
        value={getValue('cursorOpacity')}
        onChange={(v) => setValue('cursorOpacity', v)}
        description="Opacity of the cursor (0.0 to 1.0)."
        min={0}
        max={1}
        step={0.05}
      />

      <Toggle
        label="Click to Move Cursor"
        value={getValue('cursorClickToMove')}
        onChange={(v) => setValue('cursorClickToMove', v)}
        description="Allow clicking to move the cursor in supported applications."
      />
    </div>
  );
};
