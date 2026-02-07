# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ghostty Config Generator — a client-side React web app that provides a GUI for generating, importing, and exporting Ghostty terminal emulator configuration files. No backend; all state is persisted to localStorage.

## Commands

- `npm run dev` — Start Vite dev server with hot reload
- `npm run build` — TypeScript type-check (`tsc`) then Vite production build
- `npm run preview` — Preview production build locally

There is no test runner, linter, or formatter configured.

## Tech Stack

React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3. No routing library, no external state management, no API calls.

## Architecture

### State Management

`src/context/ConfigContext.tsx` uses React Context + `useReducer` to manage a single `GhosttyConfig` object. Actions: `SET_VALUE`, `SET_CONFIG`, `RESET`, `LOAD`, `SET_CATEGORY`, `SET_SEARCH`. Config auto-persists to localStorage under key `'ghostty-config'`.

### Layout (3-column)

`App.tsx` renders: **Sidebar** (category nav) → **MainContent** (config form for active category) → **PreviewPanel** (live config text output, presets, reset).

### Data Flow

User interacts with a control → `ConfigContext.setValue()` dispatches `SET_VALUE` → state updates + localStorage write → `PreviewPanel` calls `generateConfig()` to render the config text.

### Key Directories

- `src/components/ConfigSections/` — One component per config category (Font, Colors, Cursor, Window, MouseScroll, Clipboard, Shell, Keybindings, Advanced)
- `src/components/Controls/` — Reusable form inputs (TextInput, NumberInput, Toggle, SelectInput, MultiSelect, ColorPicker, KeybindingEditor)
- `src/components/Layout/` — Sidebar, MainContent, PreviewPanel
- `src/utils/configGenerator.ts` — Converts config object → Ghostty config text (kebab-case keys, grouped by category, skips defaults)
- `src/utils/configParser.ts` — Parses Ghostty config text → config object (reverse kebab-to-camelCase mapping, type inference)
- `src/data/configSchema.ts` — Default values and metadata for all config options
- `src/data/presets.ts` — 10 built-in color theme presets (Dracula, Nord, Gruvbox Dark, etc.)
- `src/types/config.ts` — `GhosttyConfig` interface (90+ properties), enums, `ConfigCategory` union type

### Config Generation/Parsing

The generator and parser are inverse operations. The generator outputs Ghostty's native format (kebab-case keys like `font-family`, one per line). Arrays (keybindings, palette colors, shell features) emit repeated keys. The parser handles the reverse, including type coercion based on default values.

## TypeScript

Strict mode is on with `noUnusedLocals` and `noUnusedParameters`. The `GhosttyConfig` interface in `src/types/config.ts` is the central type — all config sections, controls, and utilities reference it.

## Styling

Dark theme using Tailwind utility classes. Accent color is purple-600. Custom webkit scrollbar styles defined in `src/index.css`.
