"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, Button } from '@mui/material';
import { useRouter } from "next/navigation";
import useCart from 'hooks/useCart';
import OrderDetails from 'models/OrderDetails.model';
import useSales from 'pages-sections/sales/use-sales';
import useOrderDetails from 'hooks/orderContext';
import axios from 'axios';

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
