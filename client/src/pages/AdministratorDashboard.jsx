import React from "react";
import { Box, useMediaQuery, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NewHeader from "../layouts/NewHeader";
import AdministratorSidebar from "../components/administrator/AdministratorSidebar";
import { useDashboardContext } from "../App";
import AdministratorMobileSidebar from "../components/administrator/AdministratorMobileSidebar";

const AdministratorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onClose } = useDashboardContext();

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
          <AdministratorMobileSidebar isOpen={isOpen} onClose={onClose} />
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
