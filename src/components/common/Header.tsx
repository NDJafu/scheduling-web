import { FileText, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import ToolBar from "../ToolBar";
import Profile from "../Profile";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";

const Header = () => {
  const { toggleSidebar } = useMainLayoutContext();

  return (
    <header className="p-2 shadow-md dark:shadow-gray-300/5">
      <div className="flex items-center">
        <button
          className="mx-1 rounded-full p-3 transition-colors hover:bg-gray-700/25 hover:text-black/90 focus:bg-gray-700/10 dark:hover:bg-white/25 dark:hover:text-white dark:focus:bg-white/10"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <Link to="/">
          <div className="gap flex items-center">
            <FileText
              floodColor="#fbbf24"
              className="text-amber-400"
              size={40}
            />
            <h1 className="pl-1 text-2xl font-bold hover:underline">
              Keep yourself safe
            </h1>
          </div>
        </Link>
        <SearchBar />
        <ToolBar />
        <SignedOut>
          <Button asChild className="ml-8">
            <Link to="/sign-up">Sign up</Link>
          </Button>
          <Button asChild className="mx-1 ml-4" variant="secondary">
            <Link to="/sign-in">Sign in</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Profile />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
