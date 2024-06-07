import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "@mui/material";
import {
  subcategoriesComputer,
  subcategoriesLaptop,
  subcategories,
} from "__server__/__db__/sales/data";
import { useState, MouseEvent } from "react";

interface Props {
  slug: string;
  onChangeCategory: (value: string) => void;
}

export default function Dropdowns({ slug, onChangeCategory }: Props) {
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({
    racunari: null,
    laptopi: null,
    racunarskaOprema: null,
  });

  let subcategoriesList = [];

  switch (slug) {
    case "racunari":
      subcategoriesList = subcategoriesComputer;
      break;
    case "laptopi":
      subcategoriesList = subcategoriesLaptop;
      break;
    case "računarska oprema":
      subcategoriesList = subcategories;
      break;
    default:
      break;
  }

  const handleMenuClose = (category: string) => {
    setAnchorEl((prev) => ({ ...prev, [category]: null }));
  };

  const handleCategoryClick = (
    event: MouseEvent<HTMLElement> | MouseEvent<SVGSVGElement>,
    category: string
  ) => {
    event.stopPropagation();
    let normalizedCategory = category;
    if (category === "računarska oprema") {
      normalizedCategory = "racunarskaOprema";
    }
    setAnchorEl((prev) => ({
      ...prev,
      [normalizedCategory]: event.currentTarget as HTMLElement,
    }));
  };

  const handleSubcategoryClick = (
    event: MouseEvent<HTMLElement>,
    subcategory: string,
    category: string
  ) => {
    event.stopPropagation();
    let normalizedCategory = category;
    if (category === "računarska oprema") {
      normalizedCategory = "racunarskaOprema";
    }
    onChangeCategory(subcategory);
    handleMenuClose(normalizedCategory);
  };

  return (
    <>
      <ArrowDropDownIcon
        onClick={(event) => {
          handleCategoryClick(event, slug);
        }}
      />
      {/* Submenu */}
      {slug === "racunari" && (
        <Menu
          anchorEl={anchorEl.racunari}
          open={Boolean(anchorEl.racunari)}
          onClose={() => handleMenuClose("racunari")}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {subcategoriesList.map((subcategory) => (
            <MenuItem
              key={subcategory.slug}
              onClick={(event) =>
                handleSubcategoryClick(event, subcategory.slug, "racunari")
              }
            >
              {subcategory.name}
            </MenuItem>
          ))}
        </Menu>
      )}
      {slug === "laptopi" && (
        <Menu
          anchorEl={anchorEl.laptopi}
          open={Boolean(anchorEl.laptopi)}
          onClose={() => handleMenuClose("laptopi")}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {subcategoriesList.map((subcategory) => (
            <MenuItem
              key={subcategory.slug}
              onClick={(event) =>
                handleSubcategoryClick(event, subcategory.slug, "laptopi")
              }
            >
              {subcategory.name}
            </MenuItem>
          ))}
        </Menu>
      )}
      {slug === "računarska oprema" && (
        <Menu
          anchorEl={anchorEl.racunarskaOprema}
          open={Boolean(anchorEl.racunarskaOprema)}
          onClose={() => handleMenuClose("racunarskaOprema")}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {subcategoriesList.map((subcategory) => (
            <MenuItem
              key={subcategory.slug}
              onClick={(event) =>
                handleSubcategoryClick(event, subcategory.slug, "racunarskaOprema")
              }
            >
              {subcategory.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}
