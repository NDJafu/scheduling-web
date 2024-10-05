import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-1 justify-center">
      <form
        onSubmit={onSubmitForm}
        className="ml-2 mr-8 flex max-w-3xl flex-1 rounded-lg bg-neutral-100 transition-colors focus-within:bg-gray-200 focus-within:text-black dark:bg-neutral-800 dark:focus-within:bg-white"
      >
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
