import Link from "next/link";
import { Fragment, ReactNode } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
// LOCAL CUSTOM HOOKS
import useHeader from "./hooks/use-header";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENTS
import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import CategoriesMenu from "./components/categories-menu";
import LoginCartButtons from "./components/login-cart-buttons";
// STYLED COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";

// ==============================================================
interface Props {
  isFixed?: boolean;
  className?: string;
  midSlot: ReactNode;
}
// ==============================================================

export default function Header({ isFixed, className, midSlot }: Props) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = useHeader();

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      {/* LEFT CONTENT - LOGO AND CATEGORY */}
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <img
            src="/assets/eurobrand-logo/eurobrandLogo.png"
            alt="logo"
            width={130}
            height={80}
            style={{
              padding: "2%",
            }}
          />
        </Link>
        <Link href="/">
          <div
            className="logoContainer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="logoText"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                color: "#848484",
                textDecoration: "none",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                letterSpacing: "1px",
                lineHeight: "1.2",
              }}
            >
              Eurobrand
            </div>
            <div
              className="subText"
              style={{
                fontSize: "12px",
                fontFamily: "Arial, sans-serif",
                color: "#808080",
                letterSpacing: "1px",
                lineHeight: "1.2",
              }}
            >
              Prodaja računara i računarske opreme
            </div>
          </div>
        </Link>

        {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
        {isFixed ? <CategoriesMenu /> : null}
      </FlexBox>

      {/* SEARCH FORM | NAVIGATION */}
      {midSlot}

      {/* LOGIN AND CART BUTTON */}
      <LoginCartButtons
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
    </Fragment>
  );

  const CONTENT_FOR_SMALL_DEVICE = (
    <Fragment>
      {/* LOGO AND SEARCH FORM */}     
      <div
        style={{
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* LOGO */}
        <div>
          <FlexBox justifyContent="center" alignItems="center" style={{justifyContent: "space-between"}}>
            <Link href="/" style={{marginLeft: "-10%"}}>
              <img
                src="/assets/eurobrand-logo/eurobrandLogo.png"
                alt="logo"
                width={100}
                height={80}
                style={{
                  padding: "2%",
                }}
              />
            </Link>
            <Link href="/">
              <div
                className="logoContainer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Contents of your logo container */}
              </div>
            </Link>
            <Link href="/">
          <div
            className="logoContainer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="logoText"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                color: "#848484",
                textDecoration: "none",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                letterSpacing: "1px",
                lineHeight: "1.2",
              }}
            >
              Eurobrand
            </div>
            <div
              className="subText"
              style={{
                fontSize: "12px",
                fontFamily: "Arial, sans-serif",
                color: "#808080",
                letterSpacing: "1px",
                lineHeight: "1.2",
              }}
            >
              Prodaja računara i računarske opreme
            </div>
          </div>
        </Link>
          </FlexBox>
        </div>

        {/* SEARCH FORM */}
        <div style={{width: "80vw", marginLeft: "10%"}}>{midSlot}</div>
      </div>

      {/* LOGIN AND CART BUTTON */}
      <LoginCartButtons
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />

      {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
      {isFixed ? <CategoriesMenu /> : null}

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
    </Fragment>
  );

  return (
    <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        {downMd ? CONTENT_FOR_SMALL_DEVICE : CONTENT_FOR_LARGE_DEVICE}
      </StyledContainer>
    </HeaderWrapper>
  );
}
