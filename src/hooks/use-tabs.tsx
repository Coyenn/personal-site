import { useState } from 'react';

export interface Tab {
  title: string;
  href: string;
  description?: string;
  img?: string;
}

function UseTabs(tabs: Tab[]) {
  const [selectedTabIndex, setSelectedTab] = useState<number | undefined>(
    undefined,
  );

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      setSelectedTab,
    },
    selectedTab: selectedTabIndex ? tabs[selectedTabIndex] : undefined,
  };
}

export default UseTabs;
