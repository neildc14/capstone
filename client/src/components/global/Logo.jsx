import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import orangeLogo from "../../assets/icons/ARMSorange.png";

const Logo = () => {
  return (
    <Flex
      height="100%"
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={orangeLogo} height="120px" width="120px" />
      <Heading
        as="h1"
        fontSize="8xl"
        color="white"
        fontWeight="bold"
        fontFamily="'Merriweather', serif"
      >
        WEB-ARMS
      </Heading>
      <Text color="white">Web-Based Ambulance Monitoring And Requesting System</Text>
    </Flex>
  );
};

export default Logo;
