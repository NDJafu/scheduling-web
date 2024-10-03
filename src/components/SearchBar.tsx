import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-1 justify-center">
      <form className="ml-2 mr-8 flex max-w-3xl flex-1 rounded-lg bg-neutral-800 transition-colors focus-within:bg-white focus-within:text-black">
        <button className="m-[3px] p-2" type="button">
          <Search className="text-inherit" size={24} />
        </button>
        <input
          className="peer flex-1 bg-inherit text-inherit outline-none ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={cn("m-[3px] p-2", { invisible: !searchQuery })}
          type="button"
          onClick={() => setSearchQuery("")}
        >
          <X className="text-inherit" size={24} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
