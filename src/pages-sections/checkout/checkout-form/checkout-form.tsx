import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { Formik } from "formik";
// DUMMY CUSTOM DATA
import countryList from "data/countryList";
// LOCAL CUSTOM COMPONENTS
import ShippingForm from "./shipping-form";
import BillingAddressForm from "./billing-address-form";
import OrderDetails from "models/OrderDetails.model";
import axios from "axios";
import useOrderDetails from "hooks/orderContext";
import useCart from "hooks/useCart";

export default function CheckoutForm() {
  const url = process.env.NODE_ENV === 'production' ? "https://www.eurobrand.ba/api" : "http://localhost:8080";
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const { state, dispatch } = useCart();
  const { firstName, lastName, phoneNumber, address, postalCode, email, city, note, totalPrice } = useOrderDetails();

    const handleSaveOrder = async (order: OrderDetailsBody) => {
      const response = (await axios.post(url + "/orders", order)).data;
    }

    interface ProductBody {
      productId: number;
      quantity: number;
    }

    interface OrderDetailsBody {
      order: OrderDetails;
      products: ProductBody[];
    }

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

  const handleFormSubmit = async (values: typeof initialValues) => {
    handleSave();
    dispatch({ type: "CLEAR_CART" });
    router.push("/order");
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => {
        const handleCheckboxChange = (checked: boolean) => {
          setSameAsShipping(checked);
          setFieldValue("same_as_shipping", checked);
          setFieldValue("billing_name", checked ? values.shipping_name : "");
        };

        return (
          <div style={{display: "flex", justifyContent: "center", textAlign:"center"}}>
            <form onSubmit={handleSubmit} style={{width: "70%"}}>
              <ShippingForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />

              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <Button
                    LinkComponent={Link}
                    variant="outlined"
                    color="primary"
                    type="button"
                    href="/cart"
                    fullWidth>
                    Povratak na korpu
                  </Button>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Button LinkComponent={Link} variant="contained" color="primary" type="submit" fullWidth>
                    Pošalji narudžbu
                  </Button>
                </Grid>
              </Grid>
            </form>    
          </div>
        );
      }}
    </Formik>
  );
}

const initialValues = {
  shipping_zip: "",
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_address1: "",
  shipping_address2: "",
  shipping_country: countryList[229],

  billing_zip: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_address1: "",
  billing_address2: "",
  billing_country: countryList[229]
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});
