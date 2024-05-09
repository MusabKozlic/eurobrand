import { ChangeEventHandler, useEffect, useState } from "react";
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
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sortStatus, setSortStatus] = useState<string>('');

  // HANDLE CHANGE PAGE
  const handlePageChange = (_, page: number) => setPage(page);


  const handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setSearch(event.target.value);
  }

  const handleStatus = (event) => {
    setStatus(event);
  }

  const handleSortStatus = (event) => {
    setSortStatus(event);
  }

  // HANDLE THE CHANGE CATEGORY
  const handleCategoryChange = (category: string) => () => {
    setSelectedCategory(category);
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


  return {
    page,
    categories,
    productList,
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange,
    handleSaveOrder,
    handleSearch,
    search,
    handleStatus,
    status,
    handleSortStatus,
    sortStatus
  };
}
