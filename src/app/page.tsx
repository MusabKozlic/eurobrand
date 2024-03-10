import { Metadata } from "next";
import Head from "next/head";
import IndexPageView from "pages-sections/landing/page-view";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: ["eurobrand", "prodaja i servis racunara", "laptopi", "racunari", "mobiteli", "racunarska oprema", "polovni racunari"],
  icons: "../../public/assets/eurobrand-logo/logo.jpg"
};

export default function IndexPage() {
  return <IndexPageView />;
}
