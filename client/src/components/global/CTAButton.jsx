import { Button } from "@chakra-ui/react";
import React from "react";

const CTAButton = ({ handleCTAClick, label }) => {
  return (
    <>
      <Button
        size="md"
        width={{ base: "100%", md: "inherit " }}
        px={10}
        bgColor="red.600"
        color="white"
        _hover={{ bgColor: "red.700" }}
        fontSize="lg"
        onClick={handleCTAClick}
      >
        {label}
      </Button>
    </>
  );
};

export default CTAButton;
