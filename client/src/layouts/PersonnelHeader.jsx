import React from "react";
import { Box, Flex, Divider, useMediaQuery } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import DateTime from "../components/global/DisplayTime";
import ThemeButton from "../components/global/ThemeButton";
import NewSettings from "../components/global/NewSettings";
import PersonnelSettings from "../components/ambulance-personnel/PersonnelSettings";
import NotifBell from "../components/global/NotifBell";

const PersonnelHeader = () => {
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
          <NotifBell />
          <ThemeButton />
          {isLargerThan768 ? <NewSettings /> : <PersonnelSettings />}
        </Flex>
      </Flex>
      <Divider mb={4} />
    </Box>
  );
};

export default PersonnelHeader;
