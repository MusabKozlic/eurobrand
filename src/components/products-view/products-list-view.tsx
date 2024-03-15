import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between";
import ProductCard1 from "components/product-cards/product-card-1/product-card";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

export default function ProductsListView({ products }: Props) {
  return (
    <div>
      {products.map((item) => (
        <ProductCard1
        key={item.id}
        id={item.id}
        slug={item.images[0]?.imageUrl}
        title={item.model}
        price={item.price}
        imgUrl={item.images[0]?.imageUrl}
        description={item.description}
        brand={item.brand}
      />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </div>
  );
}
