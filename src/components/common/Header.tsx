import { FileText, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import ToolBar from "../ToolBar";
import Profile from "../Profile";

const Header = () => {
  return (
    <header className="p-2 shadow-md shadow-gray-300/5">
      <div className="flex items-center">
        <button className="mx-1 rounded-full p-3 transition-colors hover:bg-white/25 focus:bg-white/10">
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
        <Profile />
      </div>
    </header>
  );
};

export default Header;
