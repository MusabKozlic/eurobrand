import Link from "next/link";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// DUMMY CUSTOM DATA
import countryList from "data/countryList";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

export default function CheckoutForm() {
  const { state } = useCart();

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const STATE_LIST = [
    { value: "new-york", label: "New York" },
    { value: "chicago", label: "Chicago" }
  ];

  return (
    <Card sx={{ padding: 3 }}>
      <FlexBetween mb={2} style={{cursor: "default"}}>
        <Span color="grey.600">Ukupno:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {getTotalPrice()}KM
        </Span>
      </FlexBetween>

      <Divider sx={{ mb: 2 }} />

      <FlexBox alignItems="center" columnGap={1} mb={2} style={{cursor: "default"}}>
        <Span fontWeight="600">Napomena</Span>

        <Span
          p="6px 10px"
          fontSize={12}
          lineHeight="1"
          borderRadius="3px"
          color="primary.main"
          bgcolor="primary.light">
          Bilješka
        </Span>
      </FlexBox>

      {/* COMMENTS TEXT FIELD */}
      <TextField variant="outlined" rows={6} fullWidth multiline />

      <Divider sx={{ mb: 2 }} />

      <Divider sx={{ mb: 2 }} />

      <Button></Button>

      <Button fullWidth color="primary" href="/checkout" variant="contained" LinkComponent={Link}>
        Dalje
      </Button>
    </Card>
  );
}
