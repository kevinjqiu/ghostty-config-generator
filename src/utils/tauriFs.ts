export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export async function readConfigFile(): Promise<string | null> {
  try {
    const { homeDir, join } = await import('@tauri-apps/api/path');
    const { readTextFile, exists } = await import('@tauri-apps/plugin-fs');

    const home = await homeDir();
    const configPath = await join(home, '.config', 'ghostty', 'config');

    if (!(await exists(configPath))) {
      return null;
    }

    return await readTextFile(configPath);
  } catch (err) {
    console.error('Failed to read config file:', err);
    return null;
  }
}

export async function writeConfigFile(content: string): Promise<void> {
  const { homeDir, join } = await import('@tauri-apps/api/path');
  const { writeTextFile, mkdir } = await import('@tauri-apps/plugin-fs');

  const home = await homeDir();
  const configDir = await join(home, '.config', 'ghostty');
  const configPath = await join(configDir, 'config');

  // Ensure directory exists; ignore errors if it already does
  try {
    await mkdir(configDir, { recursive: true });
  } catch {
    // Directory likely already exists
  }

  await writeTextFile(configPath, content);
}

