import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TextInput, SelectInput, MultiSelect } from '../Controls';
import { ShellIntegration } from '../../types/config';

export const ShellSection: React.FC = () => {
  const { getValue, setValue } = useConfig();

  return (
    <div className="space-y-6">
      <SelectInput
        label="Shell Integration"
        value={getValue('shellIntegration')}
        onChange={(v) => setValue('shellIntegration', v as ShellIntegration)}
        options={['none', 'detect', 'bash', 'elvish', 'fish', 'zsh']}
        description="Shell integration mode. 'detect' automatically detects your shell."
      />

      <MultiSelect
        label="Shell Integration Features"
        value={getValue('shellIntegrationFeatures')}
        onChange={(v) => setValue('shellIntegrationFeatures', v)}
        options={['cursor', 'sudo', 'title', 'no-cursor', 'no-sudo', 'no-title']}
        description="Features to enable for shell integration."
      />

      <TextInput
        label="Shell Command"
        value={getValue('command')}
        onChange={(v) => setValue('command', v)}
        description="Command to run instead of default shell. Leave empty for default."
        placeholder="/bin/zsh, /usr/bin/fish, etc."
      />

      <TextInput
        label="Working Directory"
        value={getValue('workingDirectory')}
        onChange={(v) => setValue('workingDirectory', v)}
        description="Initial working directory. Leave empty for home directory."
        placeholder="~/projects"
      />
    </div>
  );
};
