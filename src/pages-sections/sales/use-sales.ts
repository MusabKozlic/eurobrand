import { useEffect, useState } from "react";
// TYPESCRIPT INTERFACE FOR DATA SHAPE
import Category from "models/Category.model";
import Product from "models/Product.model";
// SALES API FUNCTIONS
import api from "utils/__api__/sales";
import OrderDetails from "models/OrderDetails.model";

export default function useSales(defaultSelectCategory = "racunari", fetchCategory = 0) {
  const PRODUCT_PER_PAGE = 28;

  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectCategory);

  // HANDLE CHANGE PAGE
  const handlePageChange = (_, page: number) => setPage(page);

  // HANDLE THE CHANGE CATEGORY
  const handleCategoryChange = (category: string) => () => {
    setSelectedCategory(category)
  };

  const handleSaveOrder = (order: OrderDetails) => () => {
    api.saveOrderDetails(order);
  }

  // FETCH CATEGORIES FROM SERVER
  useEffect(() => {
    if (fetchCategory === 1) {
      api.getCategoriesTwo().then((data) => setCategories(data));
    }
  }, [fetchCategory]);

  // FETCH PRODUCTS FROM SERVER
  useEffect(() => {
    api.getProducts(page).then((data) => setProductList(data));
  }, [page]);

  return {
    page,
    categories,
    productList,
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange,
    handleSaveOrder
  };
}
