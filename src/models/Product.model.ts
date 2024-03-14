import Category from "./Category.model";
import Images from "./Images.model";

interface Product {
  id: string;
  brand?: string;
  model: string;
  description: string;
  stock: number;
  images?: Images[];
  categories: Category;
  price: number;
}

export default Product;
