// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import axios from "axios";

//TODO switch this to http://localhost:8080 before using on locale machine
const url = "www.eurobrand.ba/api";

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
}