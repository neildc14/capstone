import React from "react";
import { Box, Flex, Divider, useMediaQuery } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import DateTime from "../components/global/DisplayTime";
import Settings from "../components/Settings";
import ThemeButton from "../components/global/ThemeButton";
import NewSettings from "../components/global/NewSettings";

const NewHeader = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box as="header" overflow="hidden">
      <Flex
        mx={{ base: 4 }}
        justifyContent="space-between"
        alignItems="baseline"
      >
        {!isLargerThan768 && <TopNav />}
        {isLargerThan768 && <DateTime />}
        <Flex alignItems="baseline" gap="4px" me={{ md: 4 }} ms="auto">
          {isLargerThan768 ? <NewSettings /> : <Settings />}
        </Flex>
      </Flex>
      <Divider mb={4} />
    </Box>
  );
};

export default NewHeader;
