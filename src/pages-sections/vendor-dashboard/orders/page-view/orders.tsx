"use client";

import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import SearchArea from "../../search-box";

import OrderDetails from "models/OrderDetails.model";
import OrderTable from "pages-sections/vendor-dashboard/products/page-view/order-table";
import { useEffect, useState } from "react";
import axios from "axios";

// =============================================================================
type Props = { orders: OrderDetails[] };
// =============================================================================

const OrdersPageView = () => {
  const [orders, setOrders] = useState<OrderDetails[]>();
  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";

    const handleFetchData = async () => {
      const orders: OrderDetails[] = (await axios.get(`${url}/orders`)).data;

      setOrders(orders);
    }

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

      {orders && <OrderTable orders={orders} />}
    </Box>
  );
};

export default OrdersPageView;
