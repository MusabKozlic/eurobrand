import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// CUSTOM ICON COMPONENTS
import appIcons from "icons/mui-icons/appIcons";
// CUSTOM GLOBAL COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
// CATEGORY TYPESCRIPT INTERFACE
import Category from "models/Category.model";
// STYLED COMPONENTS
import { StyledScrollbar, Title } from "./styles";
import { Icon, Menu, MenuItem } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { categoriesTwo } from "__server__/__db__/sales/data";
import { MouseEventHandler, useState } from "react";
import Dropdowns from "./componenets/Dropdown";
// ==========================================================================
interface Props {
  selected: string;
  onChangeCategory: (value: string) => void;
}
// ==========================================================================

export default function SalesNavbar({ selected, onChangeCategory }: Props) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box bgcolor="background.paper">
      <Container>
        <StyledScrollbar
          autoHide={false}
          sx={
            downMd
              ? { width: "100%", paddingLeft: "300px", marginTop: "8vh" }
              : {
                  /* Styles for larger screens */
                }
          }
        >
          {categoriesTwo.map((item) => {
            const Icon = appIcons[item.icon];
            const selectedItem = item.slug === selected ? 1 : 0;

            return (
              <FlexRowCenter
                key={item.id}
                onClick={() => onChangeCategory(item.slug)}
                sx={{
                  cursor: "pointer",
                  minWidth: "100px",
                  flexDirection: "column",
                  background: selectedItem ? "primary.light" : "transparent",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
                  <Icon
                    sx={{ fontSize: "1.75rem" }}
                    color={selectedItem ? "primary" : "secondary"}
                  />
                  {(item.slug === "računarska oprema" ||
                    item.slug === "racunari" ||
                    item.slug === "laptopi") && (
                    <Dropdowns slug={item.slug} onChangeCategory={onChangeCategory} />
                  )}
                </div>
                <Title selected={selectedItem}>{item.name}</Title>
              </FlexRowCenter>
            );
          })}
        </StyledScrollbar>
      </Container>
    </Box>
  );
}
