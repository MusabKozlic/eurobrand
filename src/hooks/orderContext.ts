import { OrderContext } from "contexts/OrderContext";
import { useContext } from "react";

const useOrderDetails = () => useContext(OrderContext);
export default useOrderDetails;