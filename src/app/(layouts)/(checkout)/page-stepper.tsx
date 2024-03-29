"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Stepper from "./stepper";

const STEPPER_LIST = [
  { title: "Korpa", disabled: false },
  { title: "Podaci za narudžbu", disabled: false },
  { title: "Kraj", disabled: true }
];

export default function PageStepper({ children }: PropsWithChildren) {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleStepChange = (step: number) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/order");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/order":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <Container className="mt-2 mb-2">
      <Box mb={3} display={{ sm: "block", xs: "none" }}>
        <Stepper
          stepperList={STEPPER_LIST}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />
      </Box>

      {children}
    </Container>
  );
}
