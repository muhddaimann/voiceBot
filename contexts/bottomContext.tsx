import React, { createContext, useContext, useState } from "react";

const TabVisibilityContext = createContext<{
  hideTabBar: boolean;
  setHideTabBar: (value: boolean) => void;
}>({
  hideTabBar: false,
  setHideTabBar: () => {},
});

export const useTabVisibility = () => useContext(TabVisibilityContext);

export const TabVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hideTabBar, setHideTabBar] = useState(false);

  return (
    <TabVisibilityContext.Provider value={{ hideTabBar, setHideTabBar }}>
      {children}
    </TabVisibilityContext.Provider>
  );
};
