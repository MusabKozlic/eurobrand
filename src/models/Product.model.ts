import Category from "./Category.model";
import Images from "./Images.model";

interface Product {
  id: number;
  brand?: string;
  model: string;
  description: string;
  stock: number;
  images?: Images[];
  category: Category;
  price: number;
  name: string;
  slug: string;
  title: string;
}

export default Product;
