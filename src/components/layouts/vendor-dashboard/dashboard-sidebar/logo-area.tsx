import Avatar from "@mui/material/Avatar";
// GLOBAL CUSTOM COMPONENT
import FlexBetween from "components/flex-box/flex-between";
// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";
// STYLED COMPONENT
import { ChevronLeftIcon } from "./styles";
import LazyImage from "components/LazyImage";

export default function LogoArea() {
  const { TOP_HEADER_AREA, COMPACT, sidebarCompact, handleSidebarCompactToggle } = useLayout();

  return (
    <FlexBetween
      p={2}
      maxHeight={TOP_HEADER_AREA}
      justifyContent={COMPACT ? "center" : "space-between"}>
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

      <ChevronLeftIcon
        color="disabled"
        compact={COMPACT}
        onClick={handleSidebarCompactToggle}
        sidebar_compact={sidebarCompact ? 1 : 0}
      />
    </FlexBetween>
  );
}
