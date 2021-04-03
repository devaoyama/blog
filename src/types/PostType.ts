import { CategoryType } from "./CategoryType";

export type PostType = {
  id: string
  title: string
  description: string
  body: string
  category: CategoryType
  publishedAt: string
  revisedAt: string
};
