import { Metadata } from "next";
import Head from "next/head";
import IndexPageView from "pages-sections/landing/page-view";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme,laptopa,mobitela`,
  keywords: [
    "eurobrand",
    "prodaja i servis racunara",
    "laptopi",
    "racunari",
    "mobiteli",
    "racunarska oprema",
    "polovni racunari",
  ],
  icons: "/assets/eurobrand-logo/eurobrandLogo.png",
};

export default function IndexPage() {
  return (
    <UserProvider>
      <IndexPageView />
    </UserProvider>
  );
}
