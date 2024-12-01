import { create } from "zustand";

export interface UseHighlightListState {
	highlightIndex: number | null;
}

export interface UseHighlightListActions {
	setHighlightIndex: (index: number | null) => void;
}

export const useHighlightList = create<
	UseHighlightListState & UseHighlightListActions
>((set) => ({
	highlightIndex: null,
	setHighlightIndex: (index) => set({ highlightIndex: index }),
}));
