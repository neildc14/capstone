import React, { useContext } from "react";
import { Box, useMediaQuery, useDisclosure, Flex } from "@chakra-ui/react";
import RequestorMobileSidebar from "../components/requestor/RequestorMobileSidebar";
import { Outlet } from "react-router-dom";
import NewHeader from "../layouts/NewHeader";
import AdministratorSidebar from "../components/administrator/AdministratorSidebar";
import { useDashboardContext } from "../App";

const AdministratorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onClose } = useDashboardContext();
  console.log(isOpen);

  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        padding="0"
        height={{ base: "100vh" }}
      >
        {isLargerThan768 ? (
          <AdministratorSidebar />
        ) : (
          <RequestorMobileSidebar isOpen={isOpen} onClose={onClose} />
        )}

        <Box width="100%" height="100%" overflowY="scroll" bgColor="white">
          <NewHeader />

          <Box as="main" px={{ base: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AdministratorDashboard;
