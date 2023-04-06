import React from "react";
import { Box, Divider, Link, Text } from "@chakra-ui/react";
import Sidebar from "../global/Sidebar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import {
  UilLocationPinAlt,
  UilThLarge,
  UilFolder,
  UilTicket,
  UilAmbulance,
  UilUserSquare,
} from "@iconscout/react-unicons";

const AdministratorSidebar = () => {
  const location = useLocation();
  const [hoverRequestDashboard, bindHoverRequestDashboard] = useHover();
  const [hoverRequest, bindHoverRequest] = useHover();
  const [hoverAllRequests, bindHoverAllRequests] = useHover();
  const [hoverTripTickets, bindHoverTripTickets] = useHover();
  const [hoverRequestMap, bindHoverRequestMap] = useHover();

  return (
    <Sidebar bgColor="teal.900">
      <Box>
        <Box py={1}>
          <Text
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            color="#FF7A00"
          >
            LDRRMO-ARMS
          </Text>
          <Divider />
        </Box>
        <Box ps={4} py={1}>
          <Box as="section" my={4}>
            <Link
              as={RouterLink}
              to="/administrator"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator" && "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverRequestDashboard}
            >
              <UilThLarge />
              Dashboard
            </Link>

            <Link
              as={RouterLink}
              to="/administrator/all_requests"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator/all_requests"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator/all_requests" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverAllRequests}
            >
              <UilFolder />
              Requests
            </Link>

            <Link
              as={RouterLink}
              to="/administrator/ambulance"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator/ambulance"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator/ambulance" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverTripTickets}
            >
              <UilAmbulance />
              Ambulance
            </Link>

            <Link
              as={RouterLink}
              to="/administrator/trip_tickets"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator/trip_tickets"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator/trip_tickets" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverTripTickets}
            >
              <UilUserSquare />
              Drivers
            </Link>
            <Link
              as={RouterLink}
              to="/administrator/trip_tickets"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator/trip_tickets"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator/trip_tickets" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverTripTickets}
            >
              <UilTicket />
              Trip Tickets
            </Link>

            <Link
              as={RouterLink}
              to="/administrator/map"
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              ps={2}
              py={2}
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              fontWeight="semibold"
              color={
                location.pathname === "/administrator/map"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/administrator/map" && "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverRequestMap}
            >
              <UilLocationPinAlt />
              Locate Patient
            </Link>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default AdministratorSidebar;
