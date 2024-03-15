import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";

// ==============================================================
type Props = { price: number };
// ==============================================================

export default function ProductPrice({ price }: Props) {
  return (
    <FlexBox alignItems="center" gap={1} mt={0.5}>
      <Paragraph fontWeight={600} color="primary.main">
        {price}KM
      </Paragraph>
    </FlexBox>
  );
}
