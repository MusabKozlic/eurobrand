import Link from "next/link";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
// CUSTOM ICON COMPONENTS
import Icon from "icons";
// LOCAL CUSTOM COMPONENTS
import DialogDrawer from "./dialog-drawer";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import { SearchInput } from "components/search-box";
import { MobileMenu } from "components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM HOOK
import useHeader from "../hooks/use-header";

export default function MobileHeader() {
  const { state } = useCart();
  const { dialogOpen, sidenavOpen, searchBarOpen, toggleDialog, toggleSearchBar, toggleSidenav } =
    useHeader();

  const ICON_STYLE = { color: "grey.600", fontSize: 20 };

  return (
    <Fragment>
      <FlexBetween width="100%">

        {/* LOGO */}
        <Link href="/">
          <Image height={44} src="/assets/eurobrand-logo/logo.jpg" alt="logo" />
        </Link>

        {/* RIGHT CONTENT - CART, SEARCH BUTTON */}
        <FlexBox justifyContent="end" flex={1}>
          <IconButton onClick={toggleSearchBar}>
            <Icon.Search sx={ICON_STYLE} />
          </IconButton>

          <Badge badgeContent={state.cart.length} color="primary">
            <IconButton onClick={toggleSidenav}>
              <Icon.CartBag sx={ICON_STYLE} />
            </IconButton>
          </Badge>
        </FlexBox>
      </FlexBetween>

      {/* SEARCH FORM DRAWER */}
      <Drawer open={searchBarOpen} anchor="top" onClose={toggleSearchBar} sx={{ zIndex: 9999 }}>
      <Box width="100vw" padding={2} minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between">
          <FlexBetween mb={1}>

            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {/* CATEGORY BASED SEARCH FORM */}
          <SearchInput />
        </Box>
      </Drawer>

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
    </Fragment>
  );
}
