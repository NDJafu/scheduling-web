import useToggle from "@/hooks/useToggle";
import { createContext, ReactNode, useContext } from "react";

interface MainLayoutState {
  showSidebar: boolean;
  toggleSidebar: VoidFunction;
}

const MainLayoutContext = createContext<Partial<MainLayoutState>>({});

const MainLayoutProvider = ({ children }: { children: ReactNode }) => {
  const { value, toggle } = useToggle(true);

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
