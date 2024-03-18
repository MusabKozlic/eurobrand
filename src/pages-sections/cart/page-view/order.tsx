"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, Button } from '@mui/material';
import { useRouter } from "next/navigation";
import useCart from 'hooks/useCart';
import OrderDetails from 'models/OrderDetails.model';
import useSales from 'pages-sections/sales/use-sales';
import useOrderDetails from 'hooks/orderContext';
import axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? "https://www.eurobrand.ba/api" : "http://localhost:8080";

export default function OrderPageView() {
  const { state } = useCart();
    const router = useRouter();
    const { firstName, lastName, phoneNumber, address, postalCode, email, city, note, totalPrice } = useOrderDetails();

    const handleSaveOrder = async (order: OrderDetailsBody) => {
      const response = (await axios.post(url + "/orders", order)).data;
      console.log(response);
    }

    interface ProductBody {
      productId: number;
      quantity: number;
    }

    interface OrderDetailsBody {
      order: OrderDetails;
      products: ProductBody[];
    }

    useEffect(() => {
      handleSave();
    }, [])

    const handleSave = () => {
      const newOrder: OrderDetails = {
        firstName,
        lastName,
        phoneNumber,
        address,
        postalCode,
        email,
        city,
        note,
        totalPrice
      };

      const products: ProductBody[] = state.cart.map(item => ({
        productId: item.id,
        quantity: item.qty,
      }));
      
      const orderBody : OrderDetailsBody = {
        order: newOrder,
        products: products
      }
  
      handleSaveOrder(orderBody); // Assuming handleSaveOrder exists and you pass the new order to it
    };

    const goToHome = () => {
        router.push("/");
    }
  return (
    <div style={{textAlign: "center", paddingTop: "5%", cursor: "default"}}>
      {note && (<div>Notes for this order: {note}</div>)}
    <h1>Vaša narudžba je uspješno zaprimljena.</h1>
    <p style={{fontSize: "18px"}}>Uskoro ćemo Vas kontaktirati.</p>
    <Button variant="contained" color="error" style={{marginTop: "4%"}} onClick={goToHome}>POČETNA</Button>
  </div>
  );
}
