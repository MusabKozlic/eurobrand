import { Metadata } from "next";
import { BrandsPageView } from "pages-sections/vendor-dashboard/brands/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
};

export default async function Brands() {
  const brands = await api.brands();
  return <BrandsPageView brands={brands} />;
}
