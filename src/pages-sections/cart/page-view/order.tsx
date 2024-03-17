"use client";

import React from 'react';
import { Link, Button } from '@mui/material';
import { useRouter } from "next/navigation";

export default function OrderPageView() {
    const router = useRouter();

    const goToHome = () => {
        router.push("/");
    }
  return (
    <div style={{textAlign: "center", paddingTop: "5%", cursor: "default"}}>
    <h1>Vaša narudžba je uspješno zaprimljena.</h1>
    <p style={{fontSize: "18px"}}>Uskoro ćemo Vas kontaktirati.</p>
    <Button variant="contained" color="error" style={{marginTop: "4%"}} onClick={goToHome}>POČETNA</Button>
  </div>
  );
}
