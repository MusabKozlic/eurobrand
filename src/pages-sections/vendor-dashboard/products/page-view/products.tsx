"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// Local CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import ProductTable from "./product-table";

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
