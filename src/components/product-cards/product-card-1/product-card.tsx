"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./components/hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./components/quantity-buttons";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles";
import { Button, Dialog, Typography } from "@mui/material";
import Images from "models/Images.model";
import Category from "models/Category.model";
import { useState } from "react";
import ProductStatus from "models/ProductStatus.model";
import DialogDrawer from "components/header/components/dialog-drawer";
import { useRouter } from "next/navigation";

// ========================================================
type Props = {
  title: string;
  slug: string;
  price: number;
  imgUrl: string;
  id: number;
  hideRating?: boolean;
  hoverEffect?: boolean;
  showProductSize?: boolean;
  description: string;
  descriptionUrl?: string;
  brand: string;
  model: string;
  stock: number;
  images: Images[];
  category: Category;
  name: string;
  productStatus: ProductStatus;
};
// ========================================================

export default function ProductCard1({
  id,
  slug,
  title,
  price,
  imgUrl,
  hoverEffect,
  showProductSize,
  description,
  descriptionUrl,
  brand,
  model,
  stock,
  images,
  category,
  name,
  productStatus,
}: Props) {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleFavorite,
    handleCartAmountChange,
  } = useProduct(slug);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [dialogCartOpen, setDialogCartOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const toggleCartDialog = () => {
    setDialogCartOpen(!dialogCartOpen);
    setSidenavOpen(true);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const openProductDialog = () => {
    setDialogOpen(true);
  };

  const openSinglePredracun = () => {
    handleIncrementQuantity();
    router.push(`/predracun?singleOrderId=${id}`);
  };

  const handleIncrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) + 1,
      brand,
      model,
      stock,
      images,
      category,
      description,
      descriptionUrl,
    };
    if ((cartItem?.qty || 0) < product.stock) {
      handleCartAmountChange(product);
    }
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) - 1,
      brand,
      model,
      stock,
      images,
      category,
      description,
      descriptionUrl,
    };
    handleCartAmountChange(product, "remove");
  };

  const openCart = () => {
    handleIncrementQuantity();
    toggleCartDialog();
  };

  return (
    <>
      {dialogOpen && (
        <ProductViewDialog
          openDialog={dialogOpen}
          handleCloseDialog={toggleDialog}
          product={{
            id,
            brand,
            model,
            description,
            descriptionUrl,
            stock,
            images,
            category,
            price,
            title,
            slug,
            name,
            productStatus,
          }}
        />
      )}
      <StyledBazaarCard hoverEffect={hoverEffect} style={{ cursor: "pointer" }}>
        <ImageWrapper
          onClick={openProductDialog}
          style={{
            transition: "transform 0.3s ease-in-out, width 2s, height 2s",
            transform: isHovered ? "scale(1.4)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* PRODUCT IMAGE / THUMBNAIL */}
          <div
            className="image-container"
            style={{
              width: "100%",
              height: "280px" /* Set your desired height here */,
              overflow: "hidden",
            }}
          >
            {productStatus.status == "Novo" && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "5px",
                  background: "rgba(255,255,255,0.9)",
                  fontSize: "large",
                }}
              >
                NOVO
              </div>
            )}
            <LazyImage
              priority
              src={`${imgUrl}`}
              width={500}
              height={500}
              alt={title}
              className="card-image"
            />
          </div>
        </ImageWrapper>

        {/* PRODUCT VIEW DIALOG BOX */}
        <ProductViewDialog
          openDialog={openModal}
          handleCloseDialog={toggleDialog}
          product={{
            id,
            brand,
            model,
            description,
            stock,
            images,
            category,
            price,
            title,
            slug,
            name,
            productStatus,
          }}
        />

        <ContentWrapper style={{ cursor: "pointer" }}>
          <Box onClick={openProductDialog} flex="1 1 0" minWidth="0px" mr={1}>
            <div style={{ cursor: "pointer" }}>
              {/* PRODUCT NAME / TITLE */}
              <ProductTitle title={brand + " " + title} slug={slug} />
            </div>
            <div
              style={{
                paddingTop: "10px",
                paddingBottom: "2px",
                fontSize: "13px",
                fontFamily: "sans-serif",
              }}
            >
              {description}
            </div>
            {/* PRODUCT SIZE IF AVAILABLE */}
            {showProductSize ? (
              <Span color="grey.600" mb={1} display="block">
                Liter
              </Span>
            ) : null}

            {/* PRODUCT PRICE WITH DISCOUNT */}
            <ProductPrice price={price} />
            {stock <= 0 ? (
              <Button variant="contained" disabled>
                Nema na stanju
              </Button>
            ) : (
              ""
            )}
          </Box>
          {/* PRODUCT QUANTITY HANDLER BUTTONS */}
          {stock > 0 && cartItem?.qty > 0 ? (
            <></>
          ) : (
            stock > 0 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={openCart}
                  sx={{ height: 45 }}
                >
                  Dodaj u korpu
                </Button>
                <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={openSinglePredracun}
                sx={{ height: 45 }}>
                  Zatraži predračun
                </Button>
              </div>
            )
          )}
        </ContentWrapper>
      </StyledBazaarCard>
      <DialogDrawer
        dialogOpen={dialogOpen}
        toggleDialog={toggleCartDialog}
        toggleSidenav={() => {
          setSidenavOpen(false);
        }} // Placeholder function if not required
        sidenavOpen={sidenavOpen} // Placeholder value if not required
      />
    </>
  );
}
