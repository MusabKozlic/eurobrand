import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// GLOBAL CUSTOM COMPONENT
import { H6 } from "components/Typography";
// DUMMY CUSTOM DATA
import countryList from "data/countryList";

// ==============================================================
interface Props {
  handleBlur: any;
  handleChange: any;
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
}
// ==============================================================

export default function ShippingForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue
}: Props) {
  return (
    <Card sx={{ mb: 4, p: 3 }}>
      <H6 mb={2}>Podaci o naručiocu</H6>

      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            label="Ime"
            onBlur={handleBlur}
            name="shipping_name"
            onChange={handleChange}
            value={values.shipping_name}
            error={!!touched.shipping_name && !!errors.shipping_name}
            helperText={(touched.shipping_name && errors.shipping_name) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            onBlur={handleBlur}
            label="Broj telefona"
            onChange={handleChange}
            name="shipping_contact"
            value={values.shipping_contact}
            error={!!touched.shipping_contact && !!errors.shipping_contact}
            helperText={(touched.shipping_contact && errors.shipping_contact) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            label="Adresa"
            name="shipping_zip"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_zip}
            error={!!touched.shipping_zip && !!errors.shipping_zip}
            helperText={(touched.shipping_zip && errors.shipping_zip) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            label="Poštanski broj"
            onBlur={handleBlur}
            onChange={handleChange}
            name="shipping_address1"
            value={values.shipping_address1}
            error={!!touched.shipping_address1 && !!errors.shipping_address1}
            helperText={(touched.shipping_address1 && errors.shipping_address1) as string}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            onBlur={handleBlur}
            name="shipping_email"
            label="Prezime"
            onChange={handleChange}
            value={values.shipping_email}
            error={!!touched.shipping_email && !!errors.shipping_email}
            helperText={(touched.shipping_email && errors.shipping_email) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            type="email"
            sx={{ mb: 2 }}
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            name="shipping_company"
            value={values.shipping_company}
            error={!!touched.shipping_company && !!errors.shipping_company}
            helperText={(touched.shipping_company && errors.shipping_company) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            label="Grad"
            onBlur={handleBlur}
            onChange={handleChange}
            name="shipping_address2"
            value={values.shipping_address2}
            error={!!touched.shipping_address2 && !!errors.shipping_address2}
            helperText={(touched.shipping_address2 && errors.shipping_address2) as string}
          />
        </Grid>
      </Grid>
    </Card>
  );
}