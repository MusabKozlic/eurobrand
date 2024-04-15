import { Metadata } from "next";
import { CustomersPageView } from "pages-sections/vendor-dashboard/customers/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png"
};

export default async function Customers() {
  const customers = await api.customers();
  return <CustomersPageView customers={customers} />;
}
