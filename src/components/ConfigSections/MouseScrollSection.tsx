import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { NumberInput, Toggle } from '../Controls';

export const MouseScrollSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <Toggle
        label="Hide Mouse While Typing"
        value={getValue('mouseHideWhileTyping')}
        onChange={(v) => setValue('mouseHideWhileTyping', v)}
        description="Hide the mouse cursor while typing."
      />

      <NumberInput
        label="Scroll Multiplier"
        value={getValue('mouseScrollMultiplier')}
        onChange={(v) => setValue('mouseScrollMultiplier', v)}
        description="Multiplier for mouse scroll speed."
        min={0.1}
        max={10}
        step={0.1}
      />

      <NumberInput
        label="Scrollback Limit"
        value={getValue('scrollbackLimit')}
        onChange={(v) => setValue('scrollbackLimit', v)}
        description="Maximum lines of scrollback history. 0 for unlimited."
        min={0}
        max={100000000}
        step={1000}
        showSlider={false}
      />
    </div>
  );
};
