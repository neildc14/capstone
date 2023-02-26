import React, { useState, useContext } from "react";
import { Box, useMediaQuery, useDisclosure, Flex } from "@chakra-ui/react";
import RequestForm from "../components/requestor/RequestForm";
import Header from "../layouts/Header";
import RequestorSidebar from "../components/requestor/RequestorSidebar";
import RequestorMobileSidebar from "../components/requestor/RequestorMobileSidebar";

const DashboardContext = React.createContext();

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenRequestForm, setOpenRequestForm] = useState(false);

  const toggleDashboard = () => {
    onOpen();
  };

  const handleRequestForm = () => {
    setOpenRequestForm(true);
  };

  const handleViewRequest = () => {
    setOpenRequestForm(false);
  };
  const handleViewMap = () => {
    setOpenRequestForm(false);
  };

  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        padding="0"
        height={{ base: "100vh" }}
      >
        {isLargerThan768 ? (
          <RequestorSidebar
            handleRequestForm={handleRequestForm}
            handleViewRequest={handleViewRequest}
            handleViewMap={handleViewMap}
          />
        ) : (
          <RequestorMobileSidebar
            isOpen={isOpen}
            onClose={onClose}
            handleRequestForm={handleRequestForm}
            handleViewRequest={handleViewRequest}
            handleViewMap={handleViewMap}
          />
        )}

        <Box width="100%" overflowY="scroll" bg="gray.200">
          <DashboardContext.Provider value={toggleDashboard}>
            <Header />
          </DashboardContext.Provider>
          <Box as="main" px={{ base: 4 }}>
            {isOpenRequestForm && <RequestForm />}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default RequestorDashboard;
