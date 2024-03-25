import { FC } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import OrderDetails from "models/OrderDetails.model";

// ========================================================================
type Props = { order: OrderDetails };
// ========================================================================

const OrderRow: FC<Props> = ({ order }) => {
  const { id, firstName, lastName, address, totalPrice, city } = order || {};

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">#{id}</StyledTableCell>
      <StyledTableCell align="left">{firstName}</StyledTableCell>
      <StyledTableCell align="left">{lastName}</StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {address}
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {city}
      </StyledTableCell>

      <StyledTableCell align="left">{totalPrice} KM</StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/orders/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrderRow;
