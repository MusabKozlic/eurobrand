"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import ProductTable from "./product-table";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import SearchArea from "pages-sections/vendor-dashboard/search-box";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "name", label: "Name", align: "left" },
  { id: "category", label: "Category", align: "left" },
  { id: "brand", label: "Brand", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "action", label: "Action", align: "center" }
];

// =============================================================================
type Props = { products: Product[] };
// =============================================================================

const ProductsPageView = ({ products }: Props) => {
  const [productList, setProductList] = useState([...products]);

  const router = useRouter();

  useEffect(() => {
    // Retrieve user information from cookie
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      router.push("/login/api/auth/login")
    }
  }, [router]);

  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Product"
        url="/admin/products/create"
        searchPlaceholder="Search Product..."
      />

      <Card>
        <Scrollbar autoHide={false}>
        <ProductTable products={productList} />
        </Scrollbar>
      </Card>
    </Box>
  );
};

export default ProductsPageView;
