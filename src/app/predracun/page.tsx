"use client";

import { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENT
import { H6 } from "components/Typography";
import { useRouter } from "next/navigation";
import useCart from "hooks/useCart";
import axios from "axios";

type FormValues = {
  companyName: string;
  city: string;
  contactPhone: string;
  idNumberPU: string;
  address: string;
  contactEmail: string;
  contactPerson: string;
  pdvNumber: string;
};

type Predracun = {
  categoryName: string;
  brand: string;
  model: string;
  quantity: number;
  price: number;
};

type FormErrors = {
  [key in keyof FormValues]?: string;
};

export default function Predracun() {
  const router = useRouter();
  const { state } = useCart();

  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";

    let newArray: Predracun[] = [];
  // Check if state is not null and the cart array is not empty
  if (state && state.cart && state.cart.length > 0) {
     newArray = state.cart.map((item) => ({
      categoryName: item.category.name,
      brand: item.brand,
      model: item.model,
      quantity: item.qty,
      price: item.price,
    }));

  } else {
    console.log(
      "No items in the cart or cart data is not in the expected format."
    );
  }

  const [formValues, setFormValues] = useState<FormValues>({
    companyName: "",
    city: "",
    contactPhone: "",
    idNumberPU: "",
    address: "",
    contactEmail: "",
    contactPerson: "",
    pdvNumber: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const apiUrl =  url + '/orders/sendEmailWithPdf';


  const sendEmailWithPdf = async () => {
    try {
      const response = await axios.post(apiUrl, { formValues, newArray });
      console.log(response.data); // Handle response as needed
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof FormValues];
  
      // Basic required field validation
      if (!value) {
        errors[key as keyof FormValues] = "Ovo polje je obavezno!";
      }
  
      // Email validation
      if (key === 'contactEmail' && value && !emailRegex.test(value)) {
        errors[key as keyof FormValues] = "Pogrešan format mail-a!";
      }
    });
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const goToHome = () => {
    router.push("/");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      sendEmailWithPdf().then(() => {
        goToHome();
      });
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <Card sx={{ mb: 4, p: 3 }}>
        <H6 mb={6} style={{ textAlign: "center", fontSize: "28px" }}>
          Zatraži predračun
        </H6>

        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Naziv kompanije"
              name="companyName"
              value={formValues.companyName}
              onChange={handleInputChange}
              error={!!formErrors.companyName}
              helperText={formErrors.companyName}
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Grad"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              error={!!formErrors.city}
              helperText={formErrors.city}
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt telefon"
              name="contactPhone"
              value={formValues.contactPhone}
              onChange={handleInputChange}
              error={!!formErrors.contactPhone}
              helperText={formErrors.contactPhone}
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="ID broj PU"
              name="idNumberPU"
              value={formValues.idNumberPU}
              onChange={handleInputChange}
              error={!!formErrors.idNumberPU}
              helperText={formErrors.idNumberPU}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              required
              autoComplete="off"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Adresa"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              type="email"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt email"
              name="contactEmail"
              value={formValues.contactEmail}
              onChange={handleInputChange}
              error={!!formErrors.contactEmail}
              helperText={formErrors.contactEmail}
            />
            <TextField
              fullWidth
              required
              autoComplete="off"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt osoba"
              name="contactPerson"
              value={formValues.contactPerson}
              onChange={handleInputChange}
              error={!!formErrors.contactPerson}
              helperText={formErrors.contactPerson}
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="PDV broj"
              name="pdvNumber"
              value={formValues.pdvNumber}
              onChange={handleInputChange}
              error={!!formErrors.pdvNumber}
              helperText={formErrors.pdvNumber}
            />
          </Grid>
        </Grid>
      </Card>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          style={{ marginRight: "3%", marginBottom: "4%" }}
          onClick={goToHome}
        >
          POČETNA
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginBottom: "4%" }}
          onClick={handleSubmit}
        >
          POŠALJI
        </Button>
      </div>
    </div>
  );
}
