import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";

// ==============================================================
interface Props {
  item: CartItem;
  handleCartAmountChange: (amount: number, product: CartItem) => () => void;
}
// ==============================================================

export default function MiniCartItem({ item, handleCartAmountChange }: Props) {
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider">
      <FlexBox alignItems="center" flexDirection="column">
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(item.qty + 1, item)}
          sx={{ height: 28, width: 28, borderRadius: 50 }}>
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{item.qty}</H6>

        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={item.qty === 1}
          onClick={handleCartAmountChange(item.qty - 1, item)}
          sx={{ height: 28, width: 28, borderRadius: 50 }}>
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link href={`/products/${item.id}`} style={{cursor: "default"}}>
        <Avatar alt={item.model} src={item.images[0].imageUrl} sx={{ mx: 1, width: 75, height: 75 }} />
      </Link>

      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" style={{cursor: "default"}}>
        <Link href={`/products/${item.slug}`}>
          <H6 ellipsis className="title" style={{cursor: "default"}}>
            {item.brand} {item.model}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {item.price}KM x {item.qty}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {item.qty * item.price}KM
        </H6>
      </Box>

      <IconButton size="small" onClick={handleCartAmountChange(0, item)} sx={{ marginLeft: 2.5 }}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
