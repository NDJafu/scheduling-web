import { getNotes, Notes, NOTES_KEY } from "@/apis/notes.api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const NotesPage = () => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [NOTES_KEY],
    queryFn: getNotes,
  });

  if (isFetching) return <div>Loading...</div>;

  if (isError) console.log(error);

  return (
    <div>
      {data?.map((note: Notes) => <div>{note.name}</div>)}

      <Button asChild>
        <Link to="/reminders">Go to reminders</Link>
      </Button>
    </div>
  );
};

export default NotesPage;
