"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { products: Product[] };
// ==============================================================

export default function RelatedProducts({ products }: Props) {
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>

      <Grid container spacing={3}>
        {products.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
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
          />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
