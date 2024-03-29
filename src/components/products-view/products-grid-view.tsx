import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ========================================================
type Props = { products: Product[] };
// ========================================================

export default function ProductsGridView({ products }: Props) {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item: Product) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
            id={item.id}
            slug={item.images[0]?.imageUrl}
            title={item.model}
            price={item.price}
            imgUrl={item.images[0]?.imageUrl}
            description={item.description}
            brand={item.brand}
            model={item.model}
            stock={item.stock}
            images={item.images}
            category={item.category}
            name={item.name}
            productStatus={item.productStatus}
          />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Prikaz 1-9 od svih proizvoda</Span>
        <Pagination count={Math.ceil(products.length / 10)} variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>
  );
}
