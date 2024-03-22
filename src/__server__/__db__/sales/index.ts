// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";
export const SalesEndpoints = (Mock) => {
  Mock.onGet("/api/sales-2/categories").reply(async () => {
    try {
      const response = await axios.get(url + "/category");
      return [response.status, response.data];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/sales-2/products").reply(async () => {
    try {
      const response = await axios.get(url + "/products");
      return [response.status, response.data];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/sales-2/save-order").reply(async (config) => {
    try {
      const orderDetails = JSON.parse(config.data); // Assuming data is passed in the request body
      const response = await axios.post(url + "/orders", orderDetails);
      return [response.status, response.data];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
}