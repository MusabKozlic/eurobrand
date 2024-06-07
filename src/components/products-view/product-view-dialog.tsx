import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import { FlexBox } from "components/flex-box";
import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import { H1, H2, H3, Paragraph } from "components/Typography";
import useCart from "hooks/useCart";
import { currency } from "lib";
import Product from "models/Product.model";
import Link from "next/link";

interface Props {
  product: Product;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

export default function ProductViewDialog(props: Props) {
  const { product, openDialog, handleCloseDialog } = props;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const dialogRef = useRef<any>(null);
  const carouselRef = useRef<any>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (openImageDialog && carouselRef.current) {
      if (event.key === "ArrowRight") {
        setImageIndex((prevIndex) => {
          const newIndex = prevIndex < product.images.length - 1 ? prevIndex + 1 : 0;
          carouselRef.current.slickGoTo(newIndex);
          return newIndex;
        });
      } else if (event.key === "ArrowLeft") {
        setImageIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : product.images.length - 1;
          carouselRef.current.slickGoTo(newIndex);
          return newIndex;
        });
      }
    }
  };


  const handleKeyDownDialog = (event: KeyboardEvent) => {
    if (openDialog && !openImageDialog && dialogRef.current && !carouselRef.current) {
      if (event.key === "ArrowRight") {
        setImageIndex((prevIndex) => {
          const newIndex = prevIndex < product.images.length - 1 ? prevIndex + 1 : 0;
          dialogRef.current.slickGoTo(newIndex);
          return newIndex;
        });
      } else if (event.key === "ArrowLeft") {
        setImageIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : product.images.length - 1;
          dialogRef.current.slickGoTo(newIndex);
          return newIndex;
        });
      }
    }
  };

  useEffect(() => {
    if (openImageDialog) {
      document.addEventListener("keydown", handleKeyDown);
    } else if(openDialog) {
      document.addEventListener("keydown", handleKeyDownDialog);
    }else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleKeyDownDialog);
    }
  }, [openImageDialog, openDialog]);

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
        imgUrl: product.images[0]?.imageUrl
      },
    });
  };

  const handleOpenImageDialog = () => {
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
        <DialogContent sx={{ maxWidth: 900 }}>
          <div style={{ cursor: "default" }}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                {product.images && product.images.length > 1 ? (
                  <Carousel
                    ref={dialogRef}
                    slidesToShow={1}
                    arrowStyles={{
                      boxShadow: 0,
                      color: "secondary.main",
                      backgroundColor: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={handleOpenImageDialog}
                        style={{ position: "relative" }}
                      >
                        <div style={{ position: "relative" }}>
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
                          {product.productStatus.status === "Novo" && (
                            <div
                              style={{
                                position: "absolute",
                                top: 50,
                                right: 10,
                                padding: "5px",
                                background: "rgba(255,255,255,0.9)",
                                fontSize: "large",
                              }}
                            >
                              NOVO
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  product.images &&
                  product.images.length === 1 && (
                    <>
                      <div onClick={() => setOpenImageDialog(true)}>
                        <div style={{ position: "relative" }}>
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
                          {product.productStatus.status === "Novo" && (
                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 30,
                                padding: "5px",
                                background: "rgba(255,255,255,0.9)",
                                fontSize: "large",
                              }}
                            >
                              NOVO
                            </div>
                          )}
                        </div>
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
                    <Paragraph style={{ color: "blue", cursor: "pointer" }}>
                      Link za detaljan opis
                    </Paragraph>
                  </Link>
                )}
                <Paragraph
                  marginTop={4}
                  sx={{ fontWeight: "medium", fontSize: "smaller" }}
                >
                  Garancija 6 mjeseci i račun
                </Paragraph>

                <Divider sx={{ mb: 2 }} />

                {!cartItem?.qty && product.stock > 0 && (
                  <>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                     
                      onClick={handleCartAmountChange(1)}
                      sx={{ height: 45, marginRight: "2%", marginBottom: "2%" }}
                    >
                      Dodaj u korpu
                    </Button>
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      onClick={handleCloseDialog}
                      sx={{ height: 45, marginBottom: "2%" }}
                    >
                      Zatvori prozor
                    </Button>
                  </>
                )}

                {product.stock === 0 && (
                  <>
                    <Button
                      variant="contained"
                      disabled
                      sx={{ marginRight: "2%", marginBottom: "2%" }}
                    >
                      Nema na stanju
                    </Button>
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      onClick={handleCloseDialog}
                      sx={{ height: 45, marginBottom: "2%" }}
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

                    {cartItem?.qty < product.stock && (
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

      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        fullScreen
        sx={{ zIndex: 1502 }}
      >
        <DialogContent
          ref={dialogRef}
          tabIndex={-1}
          style={{
            width: "100vw",
            height: "100vh",
            outline: "none",
          }}
        >
          {product.images && product.images.length > 1 ? (
            <Carousel
              ref={carouselRef}
              slidesToShow={1}
              arrowStyles={{
                boxShadow: 0,
                color: "secondary.main",
                backgroundColor: "white",
                fontWeight: "bolder",
              }}
            >
              {product.images.map((image, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <div style={{ position: "relative" }}>
                    <BazaarImage
                      src={image.imageUrl}
                      alt={`product-${index}`}
                      sx={{
                        mx: "auto",
                        objectFit: "contain",
                        width: "100vw",
                        height: "90vh",
                      }}
                    />
                    {product.productStatus.status === "Novo" && (
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 280,
                          padding: "5px",
                          background: "rgba(255,255,255,0.9)",
                          fontSize: "large",
                        }}
                      >
                        NOVO
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            product.images &&
            product.images.length === 1 && (
              <div style={{ position: "relative" }}>
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
                {product.productStatus.status === "Novo" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 430,
                      padding: "5px",
                      background: "rgba(255,255,255,0.9)",
                      fontSize: "large",
                    }}
                  >
                    NOVO
                  </div>
                )}
              </div>
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
