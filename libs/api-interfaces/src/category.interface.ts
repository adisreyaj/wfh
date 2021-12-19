export interface CategoryBase {
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryRequest = CategoryBase;

export interface Category extends CategoryBase {
  id: string;
}

export interface CategoryDocument extends CategoryBase, Document {}
