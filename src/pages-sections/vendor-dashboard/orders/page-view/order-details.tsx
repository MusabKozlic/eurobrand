"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import OrderActions from "../order-actions";
import TotalSummery from "../total-summery";
import OrderedProduct from "../ordered-product";
import ShippingAddress from "../shipping-address";
// CUSTOM DATA MODEL
import Order from "models/Order.model";
import { useEffect, useState } from "react";
import OrderDetails from "models/OrderDetails.model";
import Product from "models/Product.model";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { navigation } from "components/layouts/vendor-dashboard/dashboard-navigation";

// ==============================================================
type Props = { id: number };
// ==============================================================

interface OrderProducts {
  id: number;
  product: Product;
  quantity: number;
}

const OrderDetailsPageView = (props: Props) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://www.eurobrand.ba/api"
      : "http://localhost:8080";
  const { id } = props;
  const [order, setOrder] = useState<OrderDetails>();
  const [products, setProducts] = useState<OrderProducts[]>();

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    await handleFetchOrder();
    await handleFetchProducts();
  };

  const handleFetchOrder = async () => {
    const order: OrderDetails = (await axios.get(`${url}/orders/${id}`)).data;
    setOrder(order);
  };

  const handleFetchProducts = async () => {
    const products = (await axios.get(`${url}/products/forOrder/${id}`)).data;
    setProducts(products);
  };

  const handleDelivery = async () => {
    (await axios.post(`${url}/orders/${id}/delivery`)).data;

    handleFetchData();
  };

  return (
    <Box py={4}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      {order && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Delivery</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {order.firstName} {order.lastName}
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phoneNumber}</TableCell>
                <TableCell>
                  {order.address}, {order.city}, {order.postalCode}
                </TableCell>
                <TableCell>{order.note}</TableCell>
                <TableCell>{order.totalPrice.toFixed(2)} KM</TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      order.orderStatus.status === "Pending"
                        ? "rgba(0, 0, 0, 0.4)" // Gray background for "Pending"
                        : order.orderStatus.status === "Delivered"
                          ? "rgba(0, 255, 0, 0.4)" // Green background for "Delivered"
                          : undefined, // Default background color
                    color:
                      order.orderStatus.status === "Delivered"
                        ? "#000" // Black text for "Delivered"
                        : undefined, // Default text color
                  }}
                >
                  {order.orderStatus.status}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="h4" gutterBottom sx={{ marginTop: "30px" }}>
        Ordered Products
      </Typography>
      {products && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((orderProduct) => (
                <TableRow key={orderProduct.id}>
                  <TableCell>{orderProduct.product.brand}</TableCell>
                  <TableCell>{orderProduct.product.model}</TableCell>
                  <TableCell>{orderProduct.product.description}</TableCell>
                  <TableCell>
                    {orderProduct.product.price.toFixed(2)} KM
                  </TableCell>
                  <TableCell>{orderProduct.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {order && (
        <Button
          disabled={order.orderStatus.status === "Delivered"}
          onClick={() => {
            handleDelivery();
          }}
          variant="contained"
          color="primary"
          sx={{
            marginTop: "40px",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto", // Optional for centering horizontally
          }}
        >
          Delivery
        </Button>
      )}
    </Box>
  );
};

export default OrderDetailsPageView;
