import { api } from ".";

export type NoteToTag = {
  noteId: string;
  tagId: string;
};

export const addNoteToTag = async (relation: NoteToTag) => {
  await api.post(`/relations/note-to-tag`, { relation });
};

export const deleteNoteFromTag = async (relation: NoteToTag) => {
  await api.delete(`/relations/note-to-tag`, {
    params: {
      noteId: relation.noteId,
      tagId: relation.tagId,
    },
  });
};
