import React, { useRef, useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { parseConfig, mergeWithDefaults } from '../utils/configParser';
import { isTauri } from '../utils/tauriFs';

export const ImportExport: React.FC = () => {
  const { importConfig } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleImportClick = async () => {
    if (isTauri()) {
      await handleTauriImport();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleTauriImport = async () => {
    setImportError(null);
    setImportSuccess(false);

    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const { readTextFile } = await import('@tauri-apps/plugin-fs');

      const selected = await open({
        multiple: false,
        filters: [{ name: 'Config', extensions: ['*'] }],
      });

      if (!selected) return;

      const text = await readTextFile(selected as string);
      const parsed = parseConfig(text);
      const fullConfig = mergeWithDefaults(parsed);
      importConfig(fullConfig);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch {
      setImportError('Failed to import config file');
      setTimeout(() => setImportError(null), 3000);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    try {
      const text = await file.text();
      const parsed = parseConfig(text);
      const fullConfig = mergeWithDefaults(parsed);
      importConfig(fullConfig);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch {
      setImportError('Failed to parse config file');
    }

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      {!isTauri() && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      )}
      <button
        onClick={handleImportClick}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          importSuccess
            ? 'bg-green-600 text-white'
            : importError
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {importSuccess ? 'Imported!' : importError ? 'Error' : 'Import'}
      </button>
    </div>
  );
};
