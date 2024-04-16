import { Metadata } from "next";
import Head from "next/head";
import IndexPageView from "pages-sections/landing/page-view";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import FixedAvatarMenu from "./fixedAvatarMenu";

export const metadata: Metadata = {
  title: "Eurobrand",
  description: `Prodaja i servis novih i polovnih računara i računarske opreme, laptopa, mobitela`,
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
      <Head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.toString()} />
        <link rel="icon" href={metadata.icons.toString()} />
      </Head>
      <IndexPageView />
      
      <FixedAvatarMenu/>
    </UserProvider>
  );
}
