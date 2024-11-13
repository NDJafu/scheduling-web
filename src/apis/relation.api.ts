import { api } from ".";

type NewNotesToTags = {
  noteId: string;
  tagId: string;
};

export const addNoteToTag = async (relation: NewNotesToTags) => {
  await api.post(`/relations/note-to-tag`, { relation });
};
