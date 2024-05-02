"use client";

import { ChangeEventHandler, Fragment, ReactNode } from "react";
import Divider from "@mui/material/Divider";
// CUSTOM GLOBAL COMPONENTS
import Topbar from "components/topbar";
import Header from "components/header";
import { Navbar } from "components/navbar";
import { Footer1 } from "components/footer";
import { SearchInputWithCategory } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
import ImageSlider from "components/navbar/banner";
import Banner from "components/header/Banner";

/** USED: SALES-1 & SALES-2 PAGES */

// =============================================================

interface withOutCategory {
  type?: "one";
  categoryNav?: never;
  children: ReactNode;
  handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleStatus: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  status: string;
}

interface withCategory {
  type?: "two";
  children: ReactNode;
  categoryNav: ReactNode;
  handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleStatus: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  status: string;
}

type SaleLayoutProps = withOutCategory | withCategory;
// =============================================================

export default function SalesLayout(props: SaleLayoutProps) {
  const { children, type = "one", categoryNav, handleSearch, handleStatus, status } = props;

  let CONTENT = null;

  // FOR SALES 1 PAGE
  if (type == "one") {
    CONTENT = (
      <Fragment>
        <Navbar />
        {children}
      </Fragment>
    );
  }

  // FOR SALES 2 PAGE
  if (type == "two") {
    CONTENT = (
      <Fragment>
        <Divider />
        {categoryNav}
        {/* <ImageSlider /> */}
        <div className="section-after-sticky">{children}</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* BANNER */}
      
      <Banner />


      {/* HEADER AREA */}
      <Header midSlot={<SearchInputWithCategory handleSearch={handleSearch} handleStatus={handleStatus} status={status} />} />

      {/* RENDER MAIN CONTENT AREA */}
      {CONTENT}

      {/* FOOTER AREA */}
      <Footer1 />
      
    </Fragment>
  );
}
