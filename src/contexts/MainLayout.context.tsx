import useToggle from "@/hooks/useToggle";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface LayoutSettings {
  showSidebar: boolean;
}

interface MainLayoutState extends LayoutSettings {
  toggleSidebar: VoidFunction;
}

const MainLayoutContext = createContext<Partial<MainLayoutState>>({});

const MainLayoutProvider = ({ children }: { children: ReactNode }) => {
  const layoutSettings: LayoutSettings = JSON.parse(
    localStorage.getItem("layout_settings") ?? "{}",
  );

  const { value, toggle } = useToggle(layoutSettings.showSidebar);

  useEffect(() => {
    const newLayoutSettings: LayoutSettings = {
      showSidebar: value!,
    };
    localStorage.setItem("layout_settings", JSON.stringify(newLayoutSettings));
  }, [value]);

  return (
    <MainLayoutContext.Provider
      value={{ showSidebar: value, toggleSidebar: toggle }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};

const useMainLayoutContext = () => useContext(MainLayoutContext);

// eslint-disable-next-line react-refresh/only-export-components
export { MainLayoutProvider, useMainLayoutContext };
