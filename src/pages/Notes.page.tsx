import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotesPage = () => {
  return (
    <div>
      <p>NotesPage</p>
      <Button asChild>
        <Link to="/reminders">Go to reminders</Link>
      </Button>
    </div>
  );
};

export default NotesPage;
