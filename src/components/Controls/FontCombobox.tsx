import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { isTauri } from '../../utils/tauriFs';
import { TextInput } from './TextInput';

interface FontComboboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: string;
}

export const FontCombobox: React.FC<FontComboboxProps> = (props) => {
  const { label, value, onChange, description, placeholder } = props;
  const [fonts, setFonts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isTauri()) return;
    setLoading(true);
    import('@tauri-apps/api/core')
      .then(({ invoke }) => invoke<string[]>('list_monospaced_fonts'))
      .then((result) => setFonts(result))
      .catch((err) => console.error('Failed to load fonts:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateDropdownPosition = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updateDropdownPosition();
    // Reposition on scroll/resize since any ancestor might scroll
    window.addEventListener('scroll', updateDropdownPosition, true);
    window.addEventListener('resize', updateDropdownPosition);
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [open, updateDropdownPosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  if (!isTauri()) {
    return <TextInput {...props} />;
  }

  const filtered = fonts.filter((f) =>
    f.toLowerCase().includes(value.toLowerCase())
  );

  const select = (font: string) => {
    onChange(font);
    setOpen(false);
    setHighlightIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && e.key === 'ArrowDown') {
      setOpen(true);
      setHighlightIndex(0);
      e.preventDefault();
      return;
    }

    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          select(filtered[highlightIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setHighlightIndex(-1);
        break;
    }
  };

  const dropdown =
    open && !loading && filtered.length > 0
      ? createPortal(
          <ul
            ref={listRef}
            style={dropdownStyle}
            className="z-[9999] max-h-60 overflow-auto rounded-md bg-gray-800 border border-gray-700 shadow-lg"
          >
            {filtered.map((font, i) => (
              <li
                key={font}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(font);
                }}
                onMouseEnter={() => setHighlightIndex(i)}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  i === highlightIndex
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700'
                }`}
              >
                {font}
              </li>
            ))}
          </ul>,
          document.body
        )
      : null;

  return (
    <div className="mb-4" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-400 mb-2">{description}</p>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>
      {dropdown}
    </div>
  );
};
