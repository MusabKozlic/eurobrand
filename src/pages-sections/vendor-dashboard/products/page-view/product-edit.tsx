"use client";

import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import ProductForm from "../product-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ProductFormUpdate from "../product-form-update";

const INITIAL_VALUES = {
  brand: "",
  model: "",
  status: "",
  stock: 0,
  price: "",
  category: "",
  description: "",
  images: [] as string[],
};

const EditProductPageView = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://www.eurobrand.ba/api"
      : "http://localhost:8080";

  useEffect(() => {
    // Retrieve user information from cookie
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/login/api/auth/login");
    }
  }, [router]);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${url}/products/${slug}`);
      if (response.data) {
        setProduct({
          id: response.data.id,
          brand: response.data.brand,
          model: response.data.model,
          status: response.data.productStatus.id,
          stock: response.data.stock,
          price: response.data.price,
          category: response.data.category.id,
          description: response.data.description,
          images: response.data.images.map((image) => image.imageUrl)
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [slug]);

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      {product && <ProductFormUpdate product={product}/>}
    </Box>
  );
};

export default EditProductPageView;
