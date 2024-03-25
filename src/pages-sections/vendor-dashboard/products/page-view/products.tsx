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
import Cookies from "js-cookie";
import SearchArea from "pages-sections/vendor-dashboard/search-box";
import axiosInstance from "../../../../utils/axiosInstance";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "name", label: "Name", align: "left" },
  { id: "category", label: "Category", align: "left" },
  { id: "brand", label: "Brand", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

// =============================================================================
type Props = { products: Product[] };
// =============================================================================

const ProductsPageView = () => {
  const [productList, setProductList] = useState();
  const url =
    process.env.NODE_ENV === "production"
      ? "https://www.eurobrand.ba/api"
      : "http://localhost:8080";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    await axios.delete(`${url}/products/${idToDelete}`);
    await fetchProducts();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProducts = async () => {
    const products = (await axiosInstance.get("/api/sales-2/products")).data;
    setProductList(products);
  };

  const handleDeleteProduct = async (id: number) => {
    setIdToDelete(id);
    setOpen(true);
  };

  useEffect(() => {
    fetchProducts();
    // Retrieve user information from cookie
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/login/api/auth/login");
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
          {productList && (
            <ProductTable
              products={productList}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
        </Scrollbar>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Da li ste sigurni da želite izbrisati ovaj proizvod iz vaše baze podataka?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
          Izbriši
          </Button>
          <Button onClick={handleClose} autoFocus>
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPageView;
