import { api } from ".";

export interface Tags {
  id: string;
  name: string;
  createdBy: string;
}

export const TAGS_KEY = "tags";

export const getTagsByUser = async (userId: string): Promise<Tags[]> => {
  const response = await api.get(`/tags/user/${userId}`);
  return response.data;
};

export const addTag = async (tag: Partial<Tags>) => {
  await api.post(`/tags`, { tag });
};

export const updateTag = async (tag: Partial<Tags>) => {
  await api.patch(`/tags/${tag.id}`, { ...tag });
};
