import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import AboutLinks from "./components/about-links";
import SocialLinks from "./components/social-links";
import CustomerCareLinks from "./components/customer-care-links";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Paragraph } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between";
// STYLED COMPONENT
import { Heading } from "./styles";

export default function Footer4() {
  return (
    <Box component="footer" bgcolor="white" pt={12}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box maxWidth={100}>
              <LazyImage src={require("../../../public/assets/images/logo2.svg")} alt="logo" />
            </Box>

            <Paragraph mb={2.5} maxWidth={{ xl: 400 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in
              gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at
              amet.
            </Paragraph>
          </Grid>

          {/* ABOUT US LINKS */}
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <AboutLinks isDark />
          </Grid>

          {/* CUSTOMER CARE LINKS */}
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomerCareLinks isDark />
          </Grid>

         
        </Grid>

        <Box component={Divider} mt={{ md: 8, xs: 3 }} />

        <FlexBetween pt={2} pb={{ sm: 10, md: 2 }}>
          <Paragraph>© 2023 By UI Lib. All rights reserved.</Paragraph>
          <SocialLinks variant="dark" />
        </FlexBetween>
      </Container>
    </Box>
  );
}
