import { cache } from "react";
import axios from "../../utils/axiosInstance";
import Product from "models/Product.model";
import Category from "models/Category.model";


const getCategoriesTwo = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/sales-2/categories");
  return response.data;
});

const getProducts = cache(async (page: number = 1): Promise<Product[]> => {
  const products = (await axios.get("/api/sales-2/products")).data;

  // @ts-ignore
  return products;
});

export default { getProducts, getCategoriesTwo };
