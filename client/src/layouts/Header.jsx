import React from "react";
import { Box, Flex, Divider, useMediaQuery } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import DateTime from "../components/DisplayTime";
import Settings from "../components/Settings";
import ThemeButton from "../components/ThemeButton";


const Header = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box as="header" px={{ base: 4, md: 0 }} bgColor="gray.300">
      <Flex justifyContent="space-between" alignItems="center">
        {!isLargerThan768 && <TopNav />}
        <Flex alignItems="center" gap="4px" me={{ md: 10 }} ms="auto">
          {isLargerThan768 && <DateTime />}
          <Settings />
          <ThemeButton />
        </Flex>
      </Flex>
      <Divider mb={4} />
    </Box>
  );
};

export default Header;
