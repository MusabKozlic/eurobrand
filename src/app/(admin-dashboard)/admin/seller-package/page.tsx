import { Metadata } from "next";
import { SellerPackagePageView } from "pages-sections/vendor-dashboard/seller-package/page-view";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png"
};

export default async function SellerPackage() {
  return <SellerPackagePageView />;
}
