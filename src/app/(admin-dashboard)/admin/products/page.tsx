"use client";

import { ProductsPageView } from "pages-sections/vendor-dashboard/products/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "../../../../utils/axiosInstance";

export default async function Products() {
  const router = useRouter();

  useEffect(() => {
    // Retrieve user information from cookie
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      router.push("/login/api/auth/login")
    }
  }, []);

  const products = (await axios.get("/api/sales-2/products")).data;
  return <ProductsPageView products={products} />;
}
