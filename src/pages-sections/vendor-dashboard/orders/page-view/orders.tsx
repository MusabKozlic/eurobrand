"use client";

import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import SearchArea from "../../search-box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OrderDetails from "models/OrderDetails.model";
import OrderTable from "pages-sections/vendor-dashboard/products/page-view/order-table";
import { useEffect, useState } from "react";
import axios from "axios";

// =============================================================================
type Props = { orders: OrderDetails[] };
// =============================================================================

const OrdersPageView = () => {
  const [orders, setOrders] = useState<OrderDetails[]>();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();
  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleDelete = async () => {
      await axios.delete(`${url}/orders/${idToDelete}`);
      await handleFetchData();
      setOpen(false);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleFetchData = async () => {
      const orders: OrderDetails[] = (await axios.get(`${url}/orders`)).data;

      setOrders(orders);
    }

    const handleDeleteOrder = async (id: number) => {
      setIdToDelete(id);
      setOpen(true);
    };

    useEffect(() => {
      handleFetchData();
    }, []);

  return (
    <Box py={4}>
      <H3 mb={2}>Orders</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Create Order"
        url="/admin/orders"
        searchPlaceholder="Search Order..."
      />

      {orders && <OrderTable orders={orders} handleDeleteOrder={handleDeleteOrder} />}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle color={"red"} id="responsive-dialog-title">
          {"Brisanje narudžbe"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Da li ste sigurni da želite izbrisati ovu narudžbu iz vaše baze podataka?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
          Izbriši
          </Button>
          <Button onClick={handleClose} autoFocus>
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersPageView;
