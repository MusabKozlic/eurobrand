"use client";

import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import { CheckoutForm } from "../checkout-form";
import { CheckoutSummary } from "../checkout-summery";

export default function CheckoutPageView() {
  return (
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm />
      </Grid>

  );
}
