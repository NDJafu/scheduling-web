import { api } from ".";
import { RequiredFields } from "@/lib/helpers";
import { Tags } from "./tags.api";

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  remindAt: string | null;
  images: { url: string }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  tags: Tags[];
}

export const NOTES_KEY = "notes";

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNotesByUser = async (userId: string): Promise<Note[]> => {
  const response = await api.get(`/notes/user/${userId}`);
  return response.data;
};

interface TagWithNotes extends Tags {
  notes: Note[];
}

export const getNotesByTagName = async (
  tagName: string,
): Promise<TagWithNotes> => {
  const response = await api.get(`/tags/name/${tagName}`);
  return response.data;
};

export const addNotes = async (note: Partial<Note> | Partial<Note>[]) => {
  await api.post("/notes", { note });
};

export const updateNote = async (note: RequiredFields<Partial<Note>, "id">) => {
  await api.patch(`/notes/${note.id}`, { ...note });
};

export const deleteNote = async (noteId: string) => {
  await api.delete(`/notes/${noteId}`);
};
