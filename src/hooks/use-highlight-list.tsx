import { create } from "zustand";

export interface UseHighlightListState {
	currentHighlightIndex: number | null;
}

export interface UseHighlightListActions {
	setHighlightIndex: (index: number | null) => void;
}

export const useHighlightList = create<
	UseHighlightListState & UseHighlightListActions
>((set) => ({
	currentHighlightIndex: null,
	setHighlightIndex: (index) => set({ currentHighlightIndex: index }),
}));
