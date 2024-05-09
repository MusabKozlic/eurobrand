import MenuItem from "@mui/material/MenuItem";
import TouchRipple from "@mui/material/ButtonBase";
import useTheme from "@mui/material/styles/useTheme";
// MUI ICON COMPONENT
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
// GLOBAL CUSTOM COMPONENT
import BazaarMenu from "components/BazaarMenu";
// STYLED COMPONENT
import { DropDownHandler } from "../styles";
// DATA
import { categories } from "../categories";
import { states } from "../state";
import { statesSort } from "../stateSort";
import { ChangeEventHandler, useState } from "react";

// ==============================================================
interface Props {
  title: string;
  handleChange: (cat: { title: string; value: string }) => () => void;
  stateTitle: string;
  handleChangeStateTitle: (state: { title: string; value: string }) => () => void; 
  handleStatus: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  status: string;
  type: string
}
// ==============================================================

export default function CategoryDropdown({ title, stateTitle, handleChangeStateTitle, handleStatus, status, type }: Props) {
  const { breakpoints } = useTheme();
  const [selectedValue, setSelectedValue] = useState(stateTitle);

  const handleChange = ({ title, value }) => {
    setSelectedValue(title);
    handleChangeStateTitle({ title, value });
    handleStatus(value);
  }

  return (
    <>
    <BazaarMenu
      direction="left"
      sx={{ zIndex: breakpoints.down("md") ? 99999 : 1502 }}
      handler={<DropDownHandler
        px={3}
        gap={0.5}
        height="100%"
        color="grey.700"
        // bgcolor="grey.100"
        alignItems="center"
        component={TouchRipple}>
        {selectedValue === "" ? "SVE" : selectedValue.toUpperCase()}
        <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
      </DropDownHandler>}>
        {type === "stanje" ? states.map((item) => (
          <MenuItem key={item.value} onClick={() => handleChange(item)}>
            {item.title}
          </MenuItem>
        )) : 
        statesSort.map((item) => (
          <MenuItem key={item.value} onClick={() => handleChange(item)}>
            {item.title}
          </MenuItem> ))
        }
      </BazaarMenu></>
  );
}
