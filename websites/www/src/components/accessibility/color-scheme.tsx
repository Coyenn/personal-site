'use client';

import { useEffect } from 'react';

export enum ColorSchemeMode {
  Light = 'light',
  Dark = 'dark',
}

export default function ColorScheme() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const computedColorScheme = mediaQuery.matches
      ? ColorSchemeMode.Dark
      : ColorSchemeMode.Light;
    const html = document.documentElement;

    html.classList.remove('light', 'dark');
    html.classList.add(computedColorScheme);
  }, []);

  return <></>;
}
