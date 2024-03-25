"use client";

import Box from "@mui/material/Box";
// CUSTOM COMPONENTS
import Footer from "../footer";
import Setting from "components/settings";
import { SalesTwoPageView } from "pages-sections/sales/page-view";

export default function IndexPageView() {

  return (
    <Box id="top" overflow="hidden" bgcolor="background.paper">
      <SalesTwoPageView />
      <Footer />
      <Setting />
    </Box>
  );
}
