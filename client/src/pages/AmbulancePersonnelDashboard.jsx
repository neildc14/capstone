import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useDisclosure, Flex } from "@chakra-ui/react";
import Header from "../layouts/Header";
import PersonnelSidebar from "../components/ambulance-personnel/PersonnelSidebar";
import PersonnelMobileSidebar from "../components/ambulance-personnel/PersonnelMobileSidebar";
import PersonnelHeader from "../layouts/PersonnelHeader";
import NewHeader from "../layouts/NewHeader";
import { useDashboardContext } from "../App";

const AmbulancePersonnelDashboard = () => {
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
          <PersonnelSidebar />
        ) : (
          <PersonnelMobileSidebar isOpen={isOpen} onClose={onClose} />
        )}

        <Box width="100%" height="100%" overflowY="scroll" bgColor="white">
          <PersonnelHeader />
          <Box as="main" px={{ base: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AmbulancePersonnelDashboard;
