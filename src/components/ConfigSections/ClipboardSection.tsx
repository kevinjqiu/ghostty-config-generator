import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { SelectInput, Toggle } from '../Controls';
import { ClipboardAccess } from '../../types/config';

export const ClipboardSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <Toggle
        label="Copy on Select"
        value={getValue('copyOnSelect')}
        onChange={(v) => setValue('copyOnSelect', v)}
        description="Automatically copy selected text to clipboard."
      />

      <SelectInput
        label="Clipboard Read Access"
        value={getValue('clipboardRead')}
        onChange={(v) => setValue('clipboardRead', v as ClipboardAccess)}
        options={['ask', 'allow', 'deny']}
        description="Allow applications to read from clipboard."
      />

      <SelectInput
        label="Clipboard Write Access"
        value={getValue('clipboardWrite')}
        onChange={(v) => setValue('clipboardWrite', v as ClipboardAccess)}
        options={['ask', 'allow', 'deny']}
        description="Allow applications to write to clipboard."
      />

      <Toggle
        label="Paste Protection"
        value={getValue('clipboardPasteProtection')}
        onChange={(v) => setValue('clipboardPasteProtection', v)}
        description="Warn when pasting potentially dangerous content (e.g., commands with newlines)."
      />

      <Toggle
        label="Trim Trailing Spaces"
        value={getValue('clipboardTrimTrailingSpaces')}
        onChange={(v) => setValue('clipboardTrimTrailingSpaces', v)}
        description="Remove trailing spaces when copying."
      />
    </div>
  );
};
