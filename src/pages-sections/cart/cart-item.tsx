import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENT
import { Wrapper } from "./styles";
import Images from "models/Images.model";
import Category from "models/Category.model";
import Image from "next/image";

// =========================================================
type Props = {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: number;
  brand: string;
  model: string;
  stock: number;
  images: Images[];
  category: Category;
  description: string;
};
// =========================================================

export default function CartItem({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug,
  brand,
  model,
  stock,
  images,
  category,
  description,
}: Props) {
  const { dispatch } = useCart();

  // HANDLE CHANGE CART PRODUCT QUANTITY
  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        name,
        price,
        imgUrl,
        qty: amount,
        slug,
        brand,
        model,
        stock,
        images,
        category,
        description,
      },
    });
  };

  return (
    <Wrapper>
      <Image
        alt={name}
        width={140}
        height={140}
        src={imgUrl && imgUrl}
      />

      {/* DELETE BUTTON */}
      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{ position: "absolute", right: 15, top: 15 }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <div style={{ cursor: "default" }}>
          <Span ellipsis fontWeight="600" fontSize={18}>
            {brand} {model}
          </Span>
        </div>

        {/* PRODUCT PRICE SECTION */}
        <Span
          ellipsis
          fontWeight="600"
          fontSize={12}
          color="grey.600"
          style={{ marginTop: "-2%" }}
        >
          {description}
        </Span>
        <FlexBox
          gap={1}
          flexWrap="wrap"
          alignItems="center"
          style={{ cursor: "default" }}
        >
          <Span color="grey.600">
            {price} KM x {qty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {price * qty} KM
          </Span>
        </FlexBox>

        {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
        <FlexBox alignItems="center" style={{ cursor: "default" }}>
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>

          {qty == stock ? (
            <Button
              variant="contained"
              disabled
              style={{
                width: "50px",
                height: "50px",
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              Maksimum
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              variant="outlined"
              sx={{ p: "5px" }}
              onClick={handleCartAmountChange(qty + 1)}
            >
              <Add fontSize="small" />
            </Button>
          )}
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
}
