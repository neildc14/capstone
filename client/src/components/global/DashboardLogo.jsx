import React from "react";
import { Box, Text, Divider, Image, Flex } from "@chakra-ui/react";
import logo from "../../assets/icons/ARMSorange.png";
const DashboardLogo = () => {
  return (
    <Box py={1}>
      <Flex py={2} gap={3} justifyContent="center" alignItems="center">
        <Image src={logo} boxSize={10} />
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          color="#FF7A00"
          fontFamily="'Merriweather', serif"
        >
          A.M.RE.S.
        </Text>
      </Flex>
      <Divider />
    </Box>
  );
};

export default DashboardLogo;
