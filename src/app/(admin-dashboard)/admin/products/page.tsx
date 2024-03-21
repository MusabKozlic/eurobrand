import { ProductsPageView } from "pages-sections/vendor-dashboard/products/page-view";
import axios from "../../../../utils/axiosInstance";

export default async function Products() {
  const products = (await axios.get("/api/sales-2/products")).data;
  return <ProductsPageView products={products} />;
}
