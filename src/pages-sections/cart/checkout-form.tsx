"use client";

import Link from "next/link";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { useState } from "react";
import useOrderDetails from "hooks/orderContext";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { state } = useCart();
  const [noteText, setNoteText] = useState<string>();
  const { setNote } = useOrderDetails();
  const { setTotalPrice } = useOrderDetails();
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  }

  const goToPredracun = () => {
    router.push("/predracun");
  }

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleSaveNote = () => {
    setTotalPrice(getTotalPrice);
    setNote(noteText);
  };

  return (
    <div>
      <Card sx={{ padding: 3 }}>
        <FlexBetween mb={2} style={{cursor: "default"}}>
          <Span color="grey.600">Ukupno:</Span>

          <Span fontSize={18} fontWeight={600} lineHeight="1">
            {getTotalPrice()} KM
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
        <TextField onInput={handleChangeNote} value={noteText} variant="outlined" rows={6} fullWidth multiline />

        <Divider sx={{ mb: 2 }} />

        <Divider sx={{ mb: 2 }} />

        <Button></Button>

        <Button onClick={handleSaveNote} fullWidth color="primary" href="/checkout" variant="contained" LinkComponent={Link}>
          Dalje
        </Button>

      </Card>
      <FlexBox justifyContent="space-around" mt={2}>
        <Button variant="contained" color="error" onClick={goToHome}>POČETNA</Button>
        <Button variant="contained" color="error" onClick={goToPredracun}>ZATRAŽI PONUDU</Button>
      </FlexBox>  </div>
  );
}
