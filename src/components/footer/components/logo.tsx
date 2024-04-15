import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";

export default function LogoSection() {
  return (
    <Fragment>
      <Link href="/">
        <div className="logoContainer" style={{display: "flex",
          flexDirection: "column",
          alignItems: "center"}}>
          <div className="logoText" style={{fontSize: "24px",
            fontWeight: "bold",  fontFamily: "Arial, sans-serif", textDecoration: "none",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            letterSpacing: "1px",
            lineHeight: "1.2"}}>
            Eurobrand
          </div>
          <div className="subText" style={{fontSize: "16px", 
            fontFamily: "Arial, sans-serif", marginBottom: "4%", letterSpacing: "1px", lineHeight: "1.2"}}>
            Prodaja računara i računarske opreme
          </div>
        </div>     
        </Link>

      <Paragraph mb={2.5} color="grey.500" style={{cursor: "default"}}>
        Prodaja i servis novih i polovnih računara i računarske opreme, laptopa, mobitela i još mnogo toga.
      </Paragraph>

    </Fragment>
  );
}
