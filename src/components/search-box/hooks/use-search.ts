import ProductList from "pages-sections/sales/product-list";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import api from "utils/__api__/products";

export default function useSearch() {
  const parentRef = useRef();

  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [state, setState] = useState("*");
  const [resultList, setResultList] = useState<string[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("Sve kategorije");
  const [stateTitle, setStateTitle] = useState("Sve");
  const [stateSortTitle, setStateSortTitle] = useState("Sortiraj");
  const [sortTitle, setSortTitle] = useState("default");

  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange = (cat: { title: string; value: string }) => () => {
    setCategory(cat.value);
    setCategoryTitle(cat.title);
  };

  const handleSortChange = (cat: { title: string; value: string }) => () => {
    setCategory(cat.value);
    setSortTitle(cat.title);
  };

 // HANDLE CHANGE THE STATE
 const handleChangeStateTitle = (state: { title: string; value: string }) => () => {
  setState(state.value);
  setStateTitle(state.title);
};

const handleChangeStateSortTitle = (state: { title: string; value: string }) => () => {
  setStateSortTitle(state.title);
};

  // FETCH PRODUCTS VIA API
  const getProducts = async (searchText: string, category?: string) => {
    const data = await api.searchProducts(searchText, category);
    setResultList(data);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const value = e.target?.value;
      if (!value) setResultList([]);
      else getProducts(value);
      console.log(resultList)
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return {
    category,
    parentRef,
    resultList,
    handleSearch,
    categoryTitle,
    handleCategoryChange,
    handleChangeStateTitle,
    handleSortChange,
    handleChangeStateSortTitle,
    stateTitle,
    stateSortTitle,
    sortTitle,
  };
}
