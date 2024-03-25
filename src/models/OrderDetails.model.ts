interface OrderDetails {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    address: string,
    city: string,
    postalCode: string;
    note: string;
    totalPrice: number;
    orderStatus: OrderDetailsStatus
  }

  export interface OrderDetailsStatus {
    id: number,
    status: string
  }

  export default OrderDetails;