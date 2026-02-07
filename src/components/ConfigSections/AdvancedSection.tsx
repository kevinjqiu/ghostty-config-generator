import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TextInput, NumberInput, SelectInput, Toggle } from '../Controls';

export const AdvancedSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <NumberInput
        label="Image Storage Limit"
        value={getValue('imageStorageLimit')}
        onChange={(v) => setValue('imageStorageLimit', v)}
        description="Maximum memory for image storage in MB."
        min={0}
        max={10000}
        step={10}
        showSlider={false}
      />

      <Toggle
        label="Confirm Close"
        value={getValue('confirmCloseSurface')}
        onChange={(v) => setValue('confirmCloseSurface', v)}
        description="Confirm before closing terminal with running process."
      />

      <Toggle
        label="Title Report"
        value={getValue('titleReport')}
        onChange={(v) => setValue('titleReport', v)}
        description="Allow programs to read the terminal title."
      />

      <TextInput
        label="Enquiry Response"
        value={getValue('enquiryResponse')}
        onChange={(v) => setValue('enquiryResponse', v)}
        description="Response to terminal enquiry (ENQ) character."
        placeholder="Leave empty for no response"
      />

      <Toggle
        label="Bold is Bright"
        value={getValue('boldIsBright')}
        onChange={(v) => setValue('boldIsBright', v)}
        description="Use bright colors for bold text (legacy behavior)."
      />

      <TextInput
        label="TERM Environment"
        value={getValue('termEnv')}
        onChange={(v) => setValue('termEnv', v)}
        description="Value for TERM environment variable."
        placeholder="ghostty"
      />

      <SelectInput
        label="Auto Update"
        value={getValue('autoUpdate')}
        onChange={(v) => setValue('autoUpdate', v)}
        options={['off', 'check', 'download']}
        description="Auto-update behavior."
      />

      <Toggle
        label="Custom Shader Animation"
        value={getValue('customShaderAnimation')}
        onChange={(v) => setValue('customShaderAnimation', v)}
        description="Enable time-based animation for custom shaders."
      />
    </div>
  );
};
