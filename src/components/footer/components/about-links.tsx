import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { ABOUT_US } from "../data";
import { Paragraph } from "components/Typography";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function AboutLinks({ isDark }: Props) {
  return (
    <Fragment>
      <Heading>O nama</Heading>

      <div>
        {ABOUT_US.map((item, ind) => (
          <div key={ind}>
            <Paragraph py={0.6} color="grey.500" style={{cursor: "default"}}>{item}</Paragraph>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
