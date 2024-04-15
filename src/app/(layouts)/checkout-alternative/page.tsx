import { Metadata } from "next";
import { CheckoutAlternativePageView } from "pages-sections/checkout/page-view";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png"
};

export default async function CheckoutAlternative() {
  return <CheckoutAlternativePageView />;
}
