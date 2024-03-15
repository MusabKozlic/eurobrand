import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import BazaarImage from "components/BazaarImage";
import { H2, Paragraph } from "components/Typography";
// STYLED COMPONENTS
import { ContentWrapper, LinkText, RootStyled } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==========================================================
type Props = { product: Product };
// ==========================================================

export default function CarouselCard3({ product }: Props) {
  return (
    <RootStyled>
      <ContentWrapper>
        <H2 mb="0.5rem" textAlign="center" lineHeight={1.2}>
          {product.brand}
        </H2>

        <Paragraph color="grey.600" textAlign="center" mb="1.5rem">
          Starting at ${product.price}
        </Paragraph>

        <Link href={`/products/${product.images[0].imageUrl}`}>
          <LinkText>SHOP NOW</LinkText>
        </Link>
      </ContentWrapper>

      <BazaarImage width="100%" src={product.images[0].imageUrl} alt="shoes" />
    </RootStyled>
  );
}
