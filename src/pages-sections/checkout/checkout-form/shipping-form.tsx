import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// GLOBAL CUSTOM COMPONENT
import { H6 } from "components/Typography";
// DUMMY CUSTOM DATA
import countryList from "data/countryList";
import useOrderDetails from "hooks/orderContext";
import { SetStateAction } from "react";

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
  const { setFirstName, setLastName, setPhoneNumber, setAddress, setPostalCode, setEmail, setCity } = useOrderDetails();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFirstName(name);
    handleChange(e);
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    setLastName(lastName);
    handleChange(e);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
    handleChange(e);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setAddress(address);
    handleChange(e);
  };

  const handleChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = e.target.value;
    setPostalCode(postalCode);
    handleChange(e);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    handleChange(e);
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setCity(city);
    handleChange(e);
  };


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
            onChange={handleChangeName}
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
            name="shipping_email"
            label="Prezime"
            onChange={handleChangeLastName}
            value={values.shipping_email}
            error={!!touched.shipping_email && !!errors.shipping_email}
            helperText={(touched.shipping_email && errors.shipping_email) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            onBlur={handleBlur}
            label="Broj telefona"
            onChange={handleChangePhoneNumber}
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
            onChange={handleChangeAddress}
            value={values.shipping_zip}
            error={!!touched.shipping_zip && !!errors.shipping_zip}
            helperText={(touched.shipping_zip && errors.shipping_zip) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            sx={{ mb: 2 }}
            label="Grad"
            onBlur={handleBlur}
            onChange={handleChangeCity}
            name="shipping_address2"
            value={values.shipping_address2}
            error={!!touched.shipping_address2 && !!errors.shipping_address2}
            helperText={(touched.shipping_address2 && errors.shipping_address2) as string}
          />

          <TextField
            fullWidth
            autoComplete="off"
            required
            label="Poštanski broj"
            onBlur={handleBlur}
            onChange={handleChangePostalCode}
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
            type="email"
            sx={{ mb: 2 }}
            label="Email"
            onBlur={handleBlur}
            onChange={handleChangeEmail}
            name="shipping_company"
            value={values.shipping_company}
            error={!!touched.shipping_company && !!errors.shipping_company}
            helperText={(touched.shipping_company && errors.shipping_company) ? errors.shipping_company : "Ovo polje nije obavezno"}          />

        </Grid>
      </Grid>
    </Card>
  );
}