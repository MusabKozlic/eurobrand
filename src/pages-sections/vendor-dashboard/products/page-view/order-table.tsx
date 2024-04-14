import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Eye from "icons/Eye";
import OrderDetails from "models/OrderDetails.model";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  orders: OrderDetails[];
  handleDeleteOrder
}

const OrderTable: React.FC<Props> = ({ orders, handleDeleteOrder }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const router = useRouter();


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell>Visit order</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Delivery</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.firstName}</TableCell>
                  <TableCell>{order.lastName}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.totalPrice} KM</TableCell>
                  <TableCell>
                    <div
                      onClick={() =>
                        router.push(`/admin/orders/${order.id}`)
                      }
                    >
                      <Eye />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div onClick={() => {
                      handleDeleteOrder(order.id);
                    }}>
                      <Delete />
                    </div>
                  </TableCell>
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderTable;
