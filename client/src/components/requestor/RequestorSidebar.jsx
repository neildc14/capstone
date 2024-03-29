import React, { useEffect } from "react";
import { Box, Divider, Text, Link } from "@chakra-ui/react";
import Sidebar from "../global/Sidebar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import {
  UilThLarge,
  UilFileInfoAlt,
  UilFilePlusAlt,
  UilTicket,
} from "@iconscout/react-unicons";
import DashboardLogo from "../global/DashboardLogo";

const RequestorSidebar = () => {
  const location = useLocation();

  const [hoverRequestDashboard, bindHoverRequestDashboard] = useHover();
  const [hoverRequest, bindHoverRequest] = useHover();
  const [hoverRequestForm, bindHoverRequestForm] = useHover();
  const [hoverRequestMap, bindHoverRequestMap] = useHover();
  const [hoverTripTickets, bindHoverTripTickets] = useHover();

  useEffect(() => {
    if (location.pathname.includes("/requestor")) {
      document.title = "WEB-ARMS | Requestor";
    }
  }, [location.pathname]);

  return (
    <Sidebar bgColor="teal.900">
      <DashboardLogo />
      <Box ps={4} py={1}>
        <Box>
          <Box as="section" my={4}>
            <Link
              as={RouterLink}
              to="/requestor"
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
                location.pathname === "/requestor"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={location.pathname === "/requestor" && "whiteAlpha.900"}
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
              to="/requestor/request"
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
                location.pathname === "/requestor/request"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/request" && "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverRequestForm}
            >
              <UilFilePlusAlt />
              Request Ambulance
            </Link>

            <Link
              as={RouterLink}
              to="/requestor/requests"
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
                location.pathname === "/requestor/requests"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/requests" && "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverRequest}
            >
              <UilFileInfoAlt />
              All Requests
            </Link>
            <Link
              as={RouterLink}
              to="/requestor/trip_tickets"
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
                location.pathname === "/requestor/trip_tickets"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/trip_tickets" &&
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
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default RequestorSidebar;
