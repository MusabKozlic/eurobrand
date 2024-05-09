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
import { Icon, Menu, MenuItem } from '@mui/material';
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { categoriesTwo } from "__server__/__db__/sales/data";
import { subcategories } from "__server__/__db__/sales/data";
import { MouseEventHandler, useState } from "react";
// ==========================================================================
interface Props {
  selected: string;
  onChangeCategory: (value: string) => () => void;
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
      <StyledScrollbar autoHide={false} sx={downMd ? {width: "100%", paddingLeft: "300px", marginTop: "8vh" } : { /* Styles for larger screens */ }}>
          {categoriesTwo.map((item) => {
            const Icon = appIcons[item.icon];
            const selectedItem = item.slug === selected ? 1 : 0;

            return (
              <FlexRowCenter
                key={item.id}
                onClick={item.slug !== "računarska oprema" ? onChangeCategory(item.slug) : undefined}
                sx={{
                  cursor: "pointer",
                  minWidth: "100px",
                  flexDirection: "column",
                  background: selectedItem ? "primary.light" : "transparent",
                }}
              >
                {item.slug === "računarska oprema" ? (
                <>
                    <Icon
                        sx={{ fontSize: "1.75rem" }}
                        color={selectedItem ? "primary" : "secondary"}
                        aria-controls="dropdown-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    />
                    <Menu
                        id="dropdown-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                      {subcategories.map((subcat) => {
                          return <MenuItem key={subcat.slug} onClick={onChangeCategory(subcat.slug)}>{subcat.name}</MenuItem>
                      })}
                    </Menu>
                </>
            ) : (
                <Icon
                    sx={{ fontSize: "1.75rem" }}
                    color={selectedItem ? "primary" : "secondary"}
                />
            )}
                <Title selected={selectedItem}>{item.name}</Title>
              </FlexRowCenter>
            );
          })}
        </StyledScrollbar>
      </Container>
    </Box>
  );
}