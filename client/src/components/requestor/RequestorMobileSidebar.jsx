import React from "react";

import MobileSidebar from "../global/MobileSidebar";
import { Box, Heading, Divider, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  UilCreateDashboard,
  UilFileInfoAlt,
  UilFilePlusAlt,
} from "@iconscout/react-unicons";

const RequestorMobileSidebar = ({ isOpen, onClose }) => {
  return (
    <MobileSidebar bgColor="teal.900" isOpen={isOpen} onClose={onClose}>
      <Box>
        <Heading
          as="h2"
          px="0"
          fontSize={{ base: "2xl", md: "md", lg: "md", xl: "xl" }}
          fontWeight="normal"
          color="whiteAlpha.900"
        >
          Requestor
        </Heading>
      </Box>
      <Divider />
      <Box as="section" my={4}>
        <Link
          as={RouterLink}
          to="/requestor"
          variant="ghost"
          display="flex"
          alignItems="center"
          gap=".5rem"
          width="100%"
          my={8}
          p="0"
          borderRadius="none"
          textAlign="left"
          fontSize={{ base: "xl", md: "sm", lg: "md" }}
          color="whiteAlpha.900"
          _hover={{
            color: "#FF7A00",
          }}
          onClick={onClose}
        >
          <UilCreateDashboard /> Dashboard
        </Link>
        <Link
          as={RouterLink}
          to="/requestor/request"
          variant="ghost"
          display="flex"
          alignItems="center"
          gap=".5rem"
          width="100%"
          my={8}
          p="0"
          borderRadius="none"
          textAlign="left"
          fontSize={{ base: "xl", md: "sm", lg: "md" }}
          color="whiteAlpha.900"
          _hover={{
            color: "#FF7A00",
          }}
          onClick={onClose}
        >
          <UilFilePlusAlt /> Request Ambulance
        </Link>

        <Link
          as={RouterLink}
          to="/requestor/requests"
          variant="ghost"
          display="flex"
          alignItems="center"
          gap=".5rem"
          width="100%"
          my={8}
          p="0"
          borderRadius="none"
          textAlign="left"
          fontSize={{ base: "xl", md: "sm", lg: "md" }}
          color="whiteAlpha.900"
          _hover={{
            color: "#FF7A00",
          }}
          onClick={onClose}
        >
          <UilFileInfoAlt />
          All Requests
        </Link>
      </Box>
    </MobileSidebar>
  );
};

export default RequestorMobileSidebar;
