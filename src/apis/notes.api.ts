import { api } from ".";

export interface Notes {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  remindAt: Date;
  images: { url: string } | { url: string }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export const NOTES_KEY = "notes";

export const getNotes = async (): Promise<Notes[]> => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNotesByUser = async (userId: string): Promise<Notes[]> => {
  const response = await api.get(`/notes/user/${userId}`);
  return response.data;
};

export const addNotes = async (note: Partial<Notes> | Partial<Notes>[]) => {
  await api.post("/notes", { note });
};
