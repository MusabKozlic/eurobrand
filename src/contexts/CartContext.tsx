"use client";

import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

// =================================================================================
type InitialState = { cart: CartItem[] };

export type CartItem = {
  qty: number;
  brand: string;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

type CartActionType = {
  type: "CHANGE_CART_AMOUNT";
  payload: CartItem;
};

// =================================================================================

const INITIAL_CART = [
];

const INITIAL_STATE = { cart: INITIAL_CART };

// ==============================================================
interface ContextProps {
  state: InitialState;
  dispatch: (args: CartActionType) => void;
}
// ==============================================================

export const CartContext = createContext<ContextProps>({} as ContextProps);

const reducer = (state: InitialState, action: CartActionType) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

export default function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
