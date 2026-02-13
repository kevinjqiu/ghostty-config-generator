import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TextInput, NumberInput, Toggle, FontCombobox } from '../Controls';

export const FontSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <FontCombobox
        label="Font Family"
        value={getValue('fontFamily')}
        onChange={(v) => setValue('fontFamily', v)}
        description="The font family to use for text. Leave empty to use the default."
        placeholder="JetBrains Mono, Fira Code, etc."
      />

      <NumberInput
        label="Font Size"
        value={getValue('fontSize')}
        onChange={(v) => setValue('fontSize', v)}
        description="The size of the font in points."
        min={6}
        max={72}
        step={1}
      />

      <TextInput
        label="Bold Font Style"
        value={getValue('fontStyleBold')}
        onChange={(v) => setValue('fontStyleBold', v)}
        description="Font to use for bold text. Leave empty to derive from font family."
        placeholder="JetBrains Mono Bold"
      />

      <TextInput
        label="Italic Font Style"
        value={getValue('fontStyleItalic')}
        onChange={(v) => setValue('fontStyleItalic', v)}
        description="Font to use for italic text. Leave empty to derive from font family."
        placeholder="JetBrains Mono Italic"
      />

      <TextInput
        label="Bold Italic Font Style"
        value={getValue('fontStyleBoldItalic')}
        onChange={(v) => setValue('fontStyleBoldItalic', v)}
        description="Font to use for bold italic text. Leave empty to derive from font family."
        placeholder="JetBrains Mono Bold Italic"
      />

      <Toggle
        label="Font Thicken"
        value={getValue('fontThicken')}
        onChange={(v) => setValue('fontThicken', v)}
        description="Thicken the font strokes for improved visibility on macOS."
      />

      <Toggle
        label="Synthetic Font Styles"
        value={getValue('fontSyntheticStyle')}
        onChange={(v) => setValue('fontSyntheticStyle', v)}
        description="Allow synthetic bold/italic when font lacks native styles."
      />

      <TextInput
        label="Adjust Cell Width"
        value={getValue('adjustCellWidth')}
        onChange={(v) => setValue('adjustCellWidth', v)}
        description="Adjustment to cell width (e.g., '1' or '10%')."
        placeholder="e.g., 1 or 10%"
      />

      <TextInput
        label="Adjust Cell Height"
        value={getValue('adjustCellHeight')}
        onChange={(v) => setValue('adjustCellHeight', v)}
        description="Adjustment to cell height (e.g., '1' or '10%')."
        placeholder="e.g., 1 or 10%"
      />
    </div>
  );
};
