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
import { Button, Typography } from "@mui/material";
import Images from "models/Images.model";
import Category from "models/Category.model";
import { useState } from "react";
import ProductStatus from "models/ProductStatus.model";

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

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const openProductDialog = () => {
    setDialogOpen(true);
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
    };
    handleCartAmountChange(product, "remove");
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
        <ImageWrapper onClick={openProductDialog}>
          {/* PRODUCT IMAGE / THUMBNAIL */}
          <div
            className="image-container"
            style={{
              width: "100%",
              height: "280px" /* Set your desired height here */,
              overflow: "hidden",
            }}
          >
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
            <QuantityButtons
              quantity={cartItem?.qty || 0}
              stock={stock}
              handleIncrement={handleIncrementQuantity}
              handleDecrement={handleDecrementQuantity}
            />
          ) : (
            stock > 0 && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleIncrementQuantity}
                sx={{ height: 45 }}
              >
                Dodaj u korpu
              </Button>
            )
          )}
        </ContentWrapper>
      </StyledBazaarCard>
    </>
  );
}
