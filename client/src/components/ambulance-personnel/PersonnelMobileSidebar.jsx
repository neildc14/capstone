import React from "react";

import MobileSidebar from "../global/MobileSidebar";
import { Box, Heading, Divider, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  UilThLarge,
  UilFolder,
  UilTicket,
  UilAmbulance,
  UilFileInfoAlt,
} from "@iconscout/react-unicons";

const PersonnelMobileSidebar = ({ isOpen, onClose }) => {
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
          Driver
        </Heading>
      </Box>
      <Divider />
      <Box as="section" my={4}>
        <Link
          as={RouterLink}
          to="/ambulance_personnel"
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
          <UilThLarge /> Dashboard
        </Link>
        <Link
          as={RouterLink}
          to="/ambulance_personnel/requests"
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
          <UilFileInfoAlt /> Handled Requests
        </Link>
        <Link
          as={RouterLink}
          to="/ambulance_personnel/pending_requests"
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
          <UilFolder /> Pending Requests
        </Link>

        <Link
          as={RouterLink}
          to="/ambulance_personnel/trip_tickets"
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
          <UilTicket />
          Trip Tickets
        </Link>

        <Link
          as={RouterLink}
          to="/ambulance_personnel/ambulance"
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
          <UilAmbulance />
          Ambulance
        </Link>
      </Box>
    </MobileSidebar>
  );
};

export default PersonnelMobileSidebar;
