"use client";

import { OrderDetailsStatus } from "models/OrderDetails.model";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

interface OrderState {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  postalCode: string;
  setPostalCode: Dispatch<SetStateAction<string>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  products: string;
  setProducts: Dispatch<SetStateAction<string>>;
  orderStatus: OrderDetailsStatus;
  setOrderStatus: Dispatch<SetStateAction<OrderDetailsStatus>>
}

export const OrderContext = createContext<OrderState>({
  firstName: '',
  setFirstName: () => {},
  lastName: '',
  setLastName: () => {},
  phoneNumber: '',
  setPhoneNumber: () => {},
  email: '',
  setEmail: () => {},
  address: '',
  setAddress: () => {},
  city: '',
  setCity: () => {},
  postalCode: '',
  setPostalCode: () => {},
  note: '',
  setNote: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  products: '',
  setProducts: () => {},
  orderStatus: {id: 1, status: "Pending"},
  setOrderStatus: () => {},
  id: null,
  setId: () => {}
});

export default function OrderProvider({children}: PropsWithChildren) {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderDetailsStatus>({id: 1, status: "Pending"});
  const [id, setId] = useState(null);

    return (
        <OrderContext.Provider value={{
          firstName, setFirstName, 
          lastName, setLastName, 
          phoneNumber, setPhoneNumber,
          email, setEmail,
          address, setAddress,
          city, setCity,
          postalCode, setPostalCode,
          note, setNote,
          totalPrice, setTotalPrice,
          products, setProducts,
          orderStatus, setOrderStatus,
          id, setId
          }}>
            {children}
        </OrderContext.Provider>
    )
}