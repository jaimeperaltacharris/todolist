import { Category } from "@core/entities/category";

export interface IEditCategory {
    isEdited: boolean;
    categoryInfo?: Category
}