import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import {
  Box,
  Heading,
  Divider,
  useMediaQuery,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import RequestForm from "../components/requestor/RequestForm";
import ThemeButton from "../components/ThemeButton";

import RequestorSidebar from "../components/requestor/RequestorSidebar";
import RequestorMobileSidebar from "../components/requestor/RequestorMobileSidebar";

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleDashboard = () => {
    onOpen();
  };

  return (
    <>
      {!isLargerThan768 && (
        <React.Fragment>
          <TopNav toggleDashboard={toggleDashboard} />
          <Divider />
        </React.Fragment>
      )}
      <ThemeButton />

      <Flex flexDirection={{ base: "colum", lg: "row" }} gap={4}>
        {isLargerThan768 ? (
          <RequestorSidebar />
        ) : (
          <RequestorMobileSidebar isOpen={isOpen} onClose={onClose} />
        )}

        <Box width="100%" px={4} pt="10">
          <RequestForm />
        </Box>
      </Flex>
    </>
  );
};

export default RequestorDashboard;
