import useToggle from "@/hooks/useToggle";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LayoutSettings {
  showSidebar: boolean;
  layoutMode: "grid" | "list";
}

interface MainLayoutState extends LayoutSettings {
  toggleSidebar: VoidFunction;
  setLayoutMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}

const MainLayoutContext = createContext<MainLayoutState>({
  showSidebar: true,
  toggleSidebar: () => {},
  layoutMode: "grid",
  setLayoutMode: () => {},
});

const MainLayoutProvider = ({ children }: { children: ReactNode }) => {
  const layoutSettings: LayoutSettings = JSON.parse(
    localStorage.getItem("layout_settings") ?? "{}",
  );

  const { value, toggle } = useToggle(layoutSettings.showSidebar);

  const [layoutMode, setLayoutMode] = useState<"grid" | "list">(
    layoutSettings.layoutMode,
  );

  useEffect(() => {
    const newLayoutSettings: LayoutSettings = {
      showSidebar: value!,
      layoutMode,
    };
    localStorage.setItem("layout_settings", JSON.stringify(newLayoutSettings));
  }, [value, layoutMode]);

  return (
    <MainLayoutContext.Provider
      value={{
        showSidebar: value!,
        toggleSidebar: toggle,
        layoutMode,
        setLayoutMode,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};

const useMainLayoutContext = () => useContext(MainLayoutContext);

// eslint-disable-next-line react-refresh/only-export-components
export { MainLayoutProvider, useMainLayoutContext };
