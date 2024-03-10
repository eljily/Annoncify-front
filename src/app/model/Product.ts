import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    createDate: Date;
    updateDate: Date;
    images: Image[];
    category: Category;
  }