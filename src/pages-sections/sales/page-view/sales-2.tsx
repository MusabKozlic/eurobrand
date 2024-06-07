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
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange,
    search,
    handleSearch,
    handleStatus,
    status,
    sortStatus,
    handleSortStatus,
  } = useSales("laptopi", 1);
  const url =
    process.env.NODE_ENV === "production"
      ? "https://www.eurobrand.ba/api"
      : "http://localhost:8080";
  const [productList, setProductList] = useState<Product[]>([]);
  const [bannerProducts, setBannerProducts] = useState([]);

  const fetchProductsByCategory = async (
    category,
    search,
    status,
    sortStatus
  ) => {
    try {
      const response = await axios.get(`${url}/products/byCategory`, {
        params: {
          category: category,
          search: search,
          status: status,
          sortStatus: sortStatus,
        },
      });
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(selectedCategory, search, status, sortStatus);
  }, [selectedCategory, search, status, sortStatus]);

  // Filter products based on the current page
  const startIndex = (page - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const paginatedProducts = productList.slice(startIndex, endIndex);

  // CATEGORY NAV LIST
  const CATEGORY_NAV = (
    <Sticky fixedOn={0} scrollDistance={200}>
      <SaleNavbar
        selected={selectedCategory}
        onChangeCategory={handleCategoryChange}
      />
    </Sticky>
  );

  return (
    <SalesLayout
      type="two"
      categoryNav={CATEGORY_NAV}
      handleSearch={handleSearch}
      handleStatus={handleStatus}
      status={status}
      bannerProducts={bannerProducts}
      handleSortStatus={handleSortStatus}
      sortStatus={sortStatus}
    >
      <Container className="mt-2">
        {/* PRODUCT LIST AREA */}
        <ProductList products={paginatedProducts} />

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
