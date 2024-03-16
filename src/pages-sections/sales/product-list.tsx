import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { products: Product[] };
// ==============================================================

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3} minHeight={500}>
      {products.map((item) => (
        <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
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
  );
}
