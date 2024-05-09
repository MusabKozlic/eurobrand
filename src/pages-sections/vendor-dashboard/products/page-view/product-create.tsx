"use client";

import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import ProductForm from "../product-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ProductCreatePageView = () => {
  const router = useRouter();

  useEffect(() => {
    // Retrieve user information from cookie
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/login/api/auth/login");
    }
  }, [router]);

  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm />
    </Box>
  );
};

export default ProductCreatePageView;
