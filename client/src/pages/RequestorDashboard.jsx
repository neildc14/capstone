import React, { useContext } from "react";
import { Box, useMediaQuery, useDisclosure, Flex } from "@chakra-ui/react";
import Header from "../layouts/Header";
import RequestorSidebar from "../components/requestor/RequestorSidebar";
import RequestorMobileSidebar from "../components/requestor/RequestorMobileSidebar";
import { Outlet } from "react-router-dom";
import NewHeader from "../layouts/NewHeader";

const DashboardContext = React.createContext();

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleDashboard = () => {
    onOpen();
  };
  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        padding="0"
        height={{ base: "100vh" }}
      >
        {isLargerThan768 ? (
          <RequestorSidebar />
        ) : (
          <RequestorMobileSidebar isOpen={isOpen} onClose={onClose} />
        )}

        <Box width="100%" height="100%" overflowY="scroll" bgColor="white">
          <DashboardContext.Provider value={toggleDashboard}>
            <NewHeader />
          </DashboardContext.Provider>
          <Box as="main" px={{ base: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default RequestorDashboard;
