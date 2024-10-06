import { api } from ".";

export interface Notes {
  id: string;
  name: string;
}

export const NOTES_KEY = "notes";

export const getNotes = async (): Promise<Notes[]> => {
  const response = await api.get("/notes");
  return response.data;
};
