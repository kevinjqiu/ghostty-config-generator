import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { FontSection } from '../ConfigSections/FontSection';
import { ColorsSection } from '../ConfigSections/ColorsSection';
import { CursorSection } from '../ConfigSections/CursorSection';
import { WindowSection } from '../ConfigSections/WindowSection';
import { MouseScrollSection } from '../ConfigSections/MouseScrollSection';
import { ClipboardSection } from '../ConfigSections/ClipboardSection';
import { ShellSection } from '../ConfigSections/ShellSection';
import { KeybindingsSection } from '../ConfigSections/KeybindingsSection';
import { AdvancedSection } from '../ConfigSections/AdvancedSection';

const sectionComponents = {
  fonts: FontSection,
  colors: ColorsSection,
  cursor: CursorSection,
  window: WindowSection,
  mouse: MouseScrollSection,
  clipboard: ClipboardSection,
  shell: ShellSection,
  keybindings: KeybindingsSection,
  advanced: AdvancedSection,
};

const sectionTitles = {
  fonts: 'Font Configuration',
  colors: 'Colors & Theme',
  cursor: 'Cursor Settings',
  window: 'Window Settings',
  mouse: 'Mouse & Scrolling',
  clipboard: 'Clipboard Settings',
  shell: 'Shell Integration',
  keybindings: 'Keybindings',
  advanced: 'Advanced Settings',
};

export const MainContent: React.FC = () => {
  const { state } = useConfig();
  const SectionComponent = sectionComponents[state.activeCategory];

  return (
    <main className="flex-1 overflow-y-auto bg-gray-950">
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-6">
          {sectionTitles[state.activeCategory]}
        </h2>
        <SectionComponent />
      </div>
    </main>
  );
};
