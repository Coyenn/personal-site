'use client';

import CraftList from '@/src/components/craft/craft-list';
import CraftModeToggle from '@/src/components/craft/craft-mode-toggle';
import CraftSlider from '@/src/components/craft/craft-slider';
import { useCraftMode } from '@/src/hooks/use-craft-mode';

export default function CraftItems() {
  const mode = useCraftMode((state) => state.mode);

  return (
    <section className={'relative'}>
      <CraftModeToggle className="absolute right-0 top-0 z-10 animate-intro animation-delay-1" />
      {mode === 'list' ? <CraftList /> : <CraftSlider />}
    </section>
  );
}
