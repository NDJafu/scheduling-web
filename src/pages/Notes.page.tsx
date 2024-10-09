import { getNotes, Notes, NOTES_KEY } from "@/apis/notes.api";
import { useQuery } from "@tanstack/react-query";

const NotesPage = () => {
  const { data } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: getNotes,
  });

  return (
    <section className="px-6 py-3">
      {data?.map((note: Notes, index) => <div key={index}>{note.name}</div>)}
    </section>
  );
};

export default NotesPage;
