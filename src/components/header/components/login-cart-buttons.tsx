import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import PersonOutline from "@mui/icons-material/PersonOutline";
// CUSTOM ICON COMPONENT
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

// ==============================================================
interface Props {
  toggleDialog: () => void;
  toggleSidenav: () => void;
}
// ==============================================================

export default function LoginCartButtons({ toggleDialog, toggleSidenav }: Props) {
  const { state } = useCart();

  const ICON_COLOR = { color: "grey.600" };

  return (
    <div>
      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingCartIcon sx={ICON_COLOR} />
        </IconButton>
      </Badge>
    </div>
  );
}
