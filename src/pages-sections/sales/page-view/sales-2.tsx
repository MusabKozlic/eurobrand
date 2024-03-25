"use client";

import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import SaleNavbar from "../sales-navbar";
import ProductList from "../product-list";
import ProductPagination from "../product-pagination";
// GLOBAL CUSTOM COMPONENTS
import Sticky from "components/sticky";
import SalesLayout from "components/layouts/sales-layout";
// LOCAL CUSTOM HOOK
import useSales from "../use-sales";
import { useEffect, useState } from "react";
import Product from "models/Product.model";
import axios from "axios";

export default function SalesTwoPageView() {
  const {
    page,
    categories,
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange,
    search,
    handleSearch,
    handleStatus,
    status
  } = useSales("laptopi", 1);
  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductsByCategory = async (category, search, status) => {
    try {
      const response = await axios.get(`${url}/products/byCategory`, {
        params: {
          category: category,
          search: search,
          status: status
        },
      });
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(selectedCategory, search, status);
  }, [selectedCategory, search, status]);

  // CATEGORY NAV LIST
  const CATEGORY_NAV = (
    <Sticky fixedOn={0} scrollDistance={200}>
      <SaleNavbar
        categories={categories}
        selected={selectedCategory}
        onChangeCategory={handleCategoryChange}
      />
    </Sticky>
  );

  return (
    <SalesLayout type="two" categoryNav={CATEGORY_NAV} handleSearch={handleSearch} handleStatus={handleStatus} status={status}>
      <Container className="mt-2">
        {/* PRODUCT LIST AREA */}
        <ProductList products={productList} />

        {/* PAGINATION AREA */}
        <ProductPagination
          page={page}
          perPage={PRODUCT_PER_PAGE}
          handlePageChange={handlePageChange}
          totalProducts={productList.length}
        />
      </Container>
    </SalesLayout>
  );
}
