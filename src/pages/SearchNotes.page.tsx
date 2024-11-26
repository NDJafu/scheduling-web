import { getNotesByUser, NOTES_KEY } from "@/apis/notes.api";
import EditNoteCard from "@/components/EditNoteCard";
import { useMainLayoutContext } from "@/contexts/MainLayout.context";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  // Tân
  const { user } = useUser();
  const { layoutMode } = useMainLayoutContext();
  // hook này để lấy chuỗi để so sánh từ url
  const [searchParams] = useSearchParams();
  // giá trị nhận lại được từ chuỗi lấy được từ khoá
  // VD: lấy từ khoá "q" trong URL này:
  // https://localhost:5173/?q=abc
  // Thì giá trị sẽ là abc
  const query = searchParams.get("q");

  // hook lấy data từ api
  const { data: notes } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: () => getNotesByUser(user!.id),
  });

  // tạo regex để so sánh data với chuỗi lấy được url
  const regex = useMemo(() => new RegExp(query ?? "", "i"), [query]);

  return (
    <div
      className={cn({
        "flex flex-wrap items-start gap-4": layoutMode === "grid",
        "mx-auto flex w-2/3 flex-col gap-4 lg:w-1/3": layoutMode === "list",
      })}
    >
      {/* Sử dụng regex đấy, dùng hàm filter để lọc qua hàm test của regex với chuỗi
        từ nội dung của ghi chú
       */}
      {notes
        ?.filter((note) => regex.test(note.content))
        ?.map((note) => <EditNoteCard key={note.id} note={note} />)}
    </div>
  );
};

export default SearchResults;
