'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, scriptProps, ...props }: ThemeProviderProps) {
  // next-themes injects a blocking <script> to prevent theme flash. React 19
  // warns when that script is re-rendered on the client during hydration. The
  // script only needs to run during SSR; mark it non-executable on the client.
  const resolvedScriptProps =
    typeof window === 'undefined'
      ? scriptProps
      : { ...scriptProps, type: 'application/json' };

  return (
    <NextThemesProvider {...props} scriptProps={resolvedScriptProps}>
      {children}
    </NextThemesProvider>
  );
}
