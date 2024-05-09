import React, { useState } from "react";
import Grid from "@mui/material/Grid";
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
import { Description } from "@mui/icons-material";
import Link from "next/link";

// =====================================================
interface Props {
  product: Product;
  openDialog: boolean;
  handleCloseDialog: () => void;
}
// =====================================================

export default function ProductViewDialog(props: Props) {
  const { product, openDialog, handleCloseDialog } = props;
  const [openImageDialog, setOpenImageDialog] = useState(false); // State for opening image dialog
  const [imageIndex, setImageIndex] = useState(0); // State to track current image index

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
      },
    });
  };

  const handleImageClick = (index: number) => {
    setImageIndex(index);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth={false}
        onClose={handleCloseDialog}
        sx={{ zIndex: 1501 }}
      >
        <DialogContent sx={{ maxWidth: 900,  minWidth: 900 }}>
          <div style={{ cursor: "default" }}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                {/* Conditionally render the Carousel component */}
                {product.images && product.images.length > 1 ? (
                  <Carousel
                    slidesToShow={1}
                    arrowStyles={{
                      boxShadow: 0,
                      color: "secondary.main",
                      backgroundColor: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    {/* Mapping through product images */}
                    {product.images.map((image, index) => (
                      <div key={index} onClick={() => handleImageClick(index)}>
                        <BazaarImage
                          src={image.imageUrl}
                          alt={`product-${index}`}
                          sx={{
                            mx: "auto",
                            width: "100%",
                            objectFit: "contain",
                            height: { sm: 400, xs: 250 },
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  // Render single image without Carousel
                  product.images &&
                  product.images.length === 1 && (
                    <>
                    <div onClick={() => handleImageClick(0)}> {/* Call handleImageClick with index 0 */}
                    <BazaarImage
                      src={product.images[0].imageUrl}
                      alt={`product-0`}
                      sx={{
                        mx: "auto",
                        width: "100%",
                        objectFit: "contain",
                        height: { sm: 400, xs: 250 },
                      }}
                    />
                    </div>
                    </>
                  )
                )}
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

                <H1 color="primary.main">{product.price} KM</H1>

                <Paragraph
                  py={1}
                  color="grey.500"
                  fontWeight={600}
                  fontSize={13}
                >
                  STANJE: {product.productStatus.status}
                </Paragraph>

                <Paragraph my={2}>{product.description}</Paragraph>


                {product.descriptionUrl != null && (
                    <Link href={product.descriptionUrl} target="_blank">
                    <Paragraph style={{ color: 'blue', cursor: 'pointer' }}>Link za detaljan opis</Paragraph>
                  </Link>
                )}
                <Paragraph marginTop={4} sx={{ fontWeight: 'medium', fontSize: "smaller"  }}>Garancija 6 mjeseci i račun</Paragraph>
                <Paragraph sx={{ fontWeight: 'medium', fontSize: "smaller" }}>Vršimo dostavu brzom poštom za cijelu BiH u roku 24h, cijena 10 KM</Paragraph>

                <Divider sx={{ mb: 2 }} />

                {!cartItem?.qty && product.stock > 0 && (
                  <>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={handleCartAmountChange(1)}
                      sx={{ height: 45, marginRight: "2%" }}
                    >
                      Dodaj u korpu
                    </Button>
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      onClick={handleCloseDialog}
                    >
                      Zatvori prozor
                    </Button>
                  </>
                )}

                {product.stock === 0 && (
                  <>
                    <Button variant="contained" disabled sx={{ marginRight: "2%" }}>
                      Nema na stanju
                    </Button>
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      onClick={handleCloseDialog}
                    >
                      Zatvori prozor
                    </Button>
                  </>
                )}

                {cartItem?.qty > 0 && (
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

                    {cartItem?.qty == cartItem.stock ? (
                      <Button
                        variant="contained"
                        disabled
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        Maksimum
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ p: ".6rem", height: 45 }}
                        onClick={handleCartAmountChange(cartItem?.qty + 1)}
                      >
                        <Add fontSize="small" />
                      </Button>
                    )}
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      onClick={handleCloseDialog}
                      sx={{ marginLeft: "2%" }}
                    >
                      Zatvori prozor
                    </Button>
                  </FlexBox>
                )}
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

      {/* New dialog for displaying image carousel */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        fullScreen
        sx={{ zIndex: 1502 }} // Ensure the image carousel dialog appears above the main dialog
      >
        <DialogContent  style={{
          width: "100vw",
          height: "100vh"
        }}>
          {/* Conditionally render the Carousel component */}
          {product.images && product.images.length > 1 ? (
                  <Carousel
                    slidesToShow={1}
                    arrowStyles={{
                      boxShadow: 0,
                      color: "secondary.main",
                      backgroundColor: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    {/* Mapping through product images */}
                    {product.images.map((image, index) => (
                      <div key={index} onClick={() => handleImageClick(index)}>
                        <BazaarImage
                          src={image.imageUrl}
                          alt={`product-${index}`}
                          sx={{
                            mx: "auto",
                            objectFit: "contain",
                            width: "95vw",
                            height: "90vh",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  // Render single image without Carousel
                  product.images && product.images.length === 1 && (
                    <BazaarImage
                      src={product.images[0].imageUrl}
                      alt={`product-0`}
                      sx={{
                        mx: "auto",
                        objectFit: "contain",
                        width: "95vw",
                        height: "90vh",
                      }}
                    />
                  )
                )}
          <Button
            size="large"
            color="secondary"
            variant="outlined"
            onClick={handleCloseImageDialog}
            sx={{ display: 'block', margin: "auto" }}
          >
            Zatvori prozor
          </Button>
          <IconButton
            sx={{ position: "absolute", top: 3, right: 3 }}
            onClick={handleCloseImageDialog}
          >
            <Close fontSize="small" color="secondary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  );
}
