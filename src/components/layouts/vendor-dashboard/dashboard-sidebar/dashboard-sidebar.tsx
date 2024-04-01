import Image from "next/image";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Local CUSTOM COMPONENTS
import LogoArea from "./logo-area";
import LayoutDrawer from "../../layout-drawer";
import MultiLevelMenu from "./multi-level-menu";
// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";
// STYLED COMPONENT
import { SidebarWrapper } from "./styles";
import LazyImage from "components/LazyImage";

export default function DashboardSidebar() {
  const {
    sidebarCompact,
    TOP_HEADER_AREA,
    showMobileSideBar,
    handleSidebarHover,
    handleCloseMobileSidebar
  } = useLayout();

  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  if (downLg) {
    return (
      <LayoutDrawer open={showMobileSideBar ? true : false} onClose={handleCloseMobileSidebar}>
        <Box p={2} maxHeight={TOP_HEADER_AREA}>
          <div className="logoContainer" style={{display: "flex",
              flexDirection: "column",
              alignItems: "center"}}>
              <div className="logoText" style={{fontSize: "20px",
                fontWeight: "bold",  fontFamily: "Arial, sans-serif", cursor: "default"}}>
                Eurobrand
              </div>
              <div className="subText" style={{fontSize: "12px", fontFamily: "Arial, sans-serif", cursor: "default"}}>
                Prodaja računara i računarske opreme
              </div>
            </div>
        </Box>

        <MultiLevelMenu />
      </LayoutDrawer>
    );
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => sidebarCompact && handleSidebarHover(false)}>
      {/* SIDEBAR TOP LOGO SECTION */}
      <LogoArea />

      {/* SIDEBAR NAVIGATION SECTION */}
      <MultiLevelMenu />
    </SidebarWrapper>
  );
}
