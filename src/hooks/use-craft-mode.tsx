import type { CraftMode } from '@/src/components/craft/craft-mode-toggle';
import { create } from 'zustand';

export interface UseCraftModeState {
  mode: CraftMode;
}

export interface UseCraftModeActions {
  setMode: (mode: CraftMode) => void;
}

export const useCraftMode = create<UseCraftModeState & UseCraftModeActions>(
  (set) => ({
    mode: 'list',
    setMode: (mode) => set({ mode }),
  }),
);
