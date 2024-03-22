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
        <LazyImage src={require("../../../../../public/assets/eurobrand-logo/logo.jpg")} alt="logo"
        sx={{ width: "130px" }}
        />

      <ChevronLeftIcon
        color="disabled"
        compact={COMPACT}
        onClick={handleSidebarCompactToggle}
        sidebar_compact={sidebarCompact ? 1 : 0}
      />
    </FlexBetween>
  );
}
