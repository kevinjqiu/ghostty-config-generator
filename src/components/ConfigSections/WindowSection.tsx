import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TextInput, NumberInput, SelectInput, Toggle } from '../Controls';

export const WindowSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Window Width"
          value={getValue('windowWidth')}
          onChange={(v) => setValue('windowWidth', v)}
          description="Initial width in cells. 0 for auto."
          min={0}
          max={500}
          step={1}
          showSlider={false}
        />

        <NumberInput
          label="Window Height"
          value={getValue('windowHeight')}
          onChange={(v) => setValue('windowHeight', v)}
          description="Initial height in cells. 0 for auto."
          min={0}
          max={200}
          step={1}
          showSlider={false}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Padding X"
          value={getValue('windowPaddingX')}
          onChange={(v) => setValue('windowPaddingX', v)}
          description="Horizontal padding in pixels."
          min={0}
          max={100}
          step={1}
        />

        <NumberInput
          label="Padding Y"
          value={getValue('windowPaddingY')}
          onChange={(v) => setValue('windowPaddingY', v)}
          description="Vertical padding in pixels."
          min={0}
          max={100}
          step={1}
        />
      </div>

      <Toggle
        label="Balance Padding"
        value={getValue('windowPaddingBalance')}
        onChange={(v) => setValue('windowPaddingBalance', v)}
        description="Distribute extra space evenly around the terminal."
      />

      <SelectInput
        label="Padding Color"
        value={getValue('windowPaddingColor')}
        onChange={(v) => setValue('windowPaddingColor', v)}
        options={['background', 'extend', 'extend-always']}
        description="How to color the padding area."
      />

      <SelectInput
        label="Window Decoration"
        value={getValue('windowDecoration')}
        onChange={(v) => setValue('windowDecoration', v as 'auto' | 'client' | 'server' | 'none')}
        options={['auto', 'client', 'server', 'none']}
        description="Window decoration style."
      />

      <SelectInput
        label="Window Theme"
        value={getValue('windowTheme')}
        onChange={(v) => setValue('windowTheme', v as 'auto' | 'system' | 'light' | 'dark' | 'ghostty')}
        options={['auto', 'system', 'light', 'dark', 'ghostty']}
        description="Theme for window decorations."
      />

      <Toggle
        label="VSync"
        value={getValue('windowVsync')}
        onChange={(v) => setValue('windowVsync', v)}
        description="Enable vertical sync for smoother rendering."
      />

      <Toggle
        label="Fullscreen"
        value={getValue('fullscreen')}
        onChange={(v) => setValue('fullscreen', v)}
        description="Start in fullscreen mode."
      />

      <Toggle
        label="Maximize"
        value={getValue('maximize')}
        onChange={(v) => setValue('maximize', v)}
        description="Start with maximized window."
      />

      <NumberInput
        label="Background Blur Radius"
        value={getValue('backgroundBlurRadius')}
        onChange={(v) => setValue('backgroundBlurRadius', v)}
        description="Blur radius for background (0 to disable). Requires compositor support."
        min={0}
        max={100}
        step={1}
      />

      <TextInput
        label="Window Title"
        value={getValue('title')}
        onChange={(v) => setValue('title', v)}
        description="Custom window title. Leave empty for default."
        placeholder="My Terminal"
      />

      <Toggle
        label="Focus Follows Mouse"
        value={getValue('focusFollowsMouse')}
        onChange={(v) => setValue('focusFollowsMouse', v)}
        description="Focus window when mouse enters."
      />
    </div>
  );
};
