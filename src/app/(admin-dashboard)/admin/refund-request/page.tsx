import { Metadata } from "next";
import { RefundRequestPageView } from "pages-sections/vendor-dashboard/refund-request/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png"
};

export default async function RefundRequest() {
  const requests = await api.refundRequests();
  return <RefundRequestPageView requests={requests} />;
}
