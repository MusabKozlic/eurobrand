import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";

export default function LogoSection() {
  return (
    <Fragment>
      <Link href="/">
        <Image mb={2.5} style={{width: "200px", height: "100px"}} src="/assets/eurobrand-logo/logo.jpg" alt="logo" />
      </Link>

      <Paragraph mb={2.5} color="grey.500" style={{cursor: "default"}}>
        Prodaja i servis novih i polovnih računara i računarske opreme, laptopa, mobitela i još mnogo toga.
      </Paragraph>

    </Fragment>
  );
}
