import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/vendor-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png"
};

export default async function OrderDetails({ params }: { params: { id: number } }) {
  try {
    return <OrderDetailsPageView id={params.id} />;
  } catch (error) {
    notFound();
  }
}
