"use client";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENT
import { H6 } from "components/Typography";
import { useRouter } from "next/navigation";
import { FlexBetween, FlexBox } from "components/flex-box";

export default function Predracun() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  }

  return (
    <div style={{height: "100vh", backgroundColor: "white"}}>
      <Card sx={{ mb: 4, p: 3 }}>
        <H6 mb={6} style={{textAlign: "center", fontSize: "28px"}}>Zatraži predračun</H6>

        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Naziv kompanije"
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Grad"
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt telefon"
            />
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="ID broj PU"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              required
              autoComplete="off"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Adresa"
            />  
            <TextField
              fullWidth
              autoComplete="off"
              required
              type="email"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt email"
            />  
            <TextField
              fullWidth
              required
              autoComplete="off"
              type="osoba"
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="Kontakt osoba"
            />  
            <TextField
              fullWidth
              autoComplete="off"
              required
              sx={{ mb: { xs: 2, sm: 2 } }}
              label="PDV broj"
            />
          </Grid>
        </Grid>
      </Card>
      <div style={{textAlign: "center"}}>
          <Button variant="contained" color="error" style={{marginRight: "3%", marginBottom: "4%"}} onClick={goToHome}>POČETNA</Button>
          <Button variant="contained" color="error" style={{marginBottom: "4%"}}>POŠALJI</Button>
      </div>
    </div>
  );
}
