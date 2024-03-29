import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
// LOCAL CUSTOM HOOKS
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import Product from "models/Product.model";

// =====================================================
interface Props {
  product: Product;
  openDialog: boolean;
  handleCloseDialog: () => void;
}
// =====================================================

export default function ProductViewDialog(props: Props) {
  const { product, openDialog, handleCloseDialog } = props;

  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.id === product.id);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
        id: product.id,
        brand: product.brand,
        model: product.model,
        description: product.description,
        stock: product.stock,
        images: product.images,
        category: product.category,
        price: product.price,
        slug: product.slug,
      }
    });
  };

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{ zIndex: 1501 }}
    >
      <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
        <div style={{cursor: "default"}}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {/* Carousel component */}
              <Carousel
                slidesToShow={1}
                arrowStyles={{
                  boxShadow: 0,
                  color: "secondary.main",
                  backgroundColor: "white",
                  fontWeight: "bolder"
                }}
              >
                {/* Mapping through product images */}
                {product.images &&
                  product.images.map((image, index) => (
                    <BazaarImage
                      key={index}
                      src={image.imageUrl}
                      alt={`product-${index}`}
                      sx={{
                        mx: "auto",
                        width: "100%",
                        objectFit: "contain",
                        height: { sm: 400, xs: 250 },
                      }}
                    />
                  ))}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>
                {product.brand} {product.model}
              </H2>
              {product.category && (
                <Paragraph
                  py={1}
                  color="grey.500"
                  fontWeight={600}
                  fontSize={13}
                >
                  KATEGORIJA: {product.category.name}
                </Paragraph>
              )}

              <H1 color="primary.main">{product.price}KM</H1>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                STANJE: {product.productStatus.status}
              </Paragraph>

              <Paragraph my={2}>{product.description}</Paragraph>

              <Divider sx={{ mb: 2 }} />

              {!cartItem?.qty && product.stock > 0 && (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCartAmountChange(1)}
                  sx={{ height: 45 }}
                >
                  Dodaj u korpu
                </Button>
              )}

              {product.stock === 0 &&
              <Button 
                variant="contained" 
                disabled
              >
                Nema na stanju
              </Button>
              }

            {cartItem?.qty > 0 ?            
                <FlexBox alignItems="center">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ p: ".6rem", height: 45 }}
                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  { cartItem?.qty  == cartItem.stock ?
                    <Button 
                      variant="contained" 
                      disabled
                      style={{width: "50px", height: "50px", fontSize: "8px", fontWeight: "bold"}}
                    >
                    Maksimum
                    </Button> : 
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ p: ".6rem", height: 45 }}
                      onClick={handleCartAmountChange(cartItem?.qty + 1)}
                    >          
                      <Add fontSize="small" />
                    </Button>
                  }
                </FlexBox>
            : ""}
            </Grid>
          </Grid>
        </div>

        <IconButton
          sx={{ position: "absolute", top: 3, right: 3 }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
