import React, { useEffect } from "react";
import { Box, Link } from "@chakra-ui/react";
import Sidebar from "../global/Sidebar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import {
  UilFileInfoAlt,
  UilThLarge,
  UilFolder,
  UilTicket,
  UilAmbulance,
} from "@iconscout/react-unicons";
import DashboardLogo from "../global/DashboardLogo";

const PersonnelSidebar = () => {
  const location = useLocation();
  const [hoverRequestDashboard, bindHoverRequestDashboard] = useHover();
  const [hoverRequest, bindHoverRequest] = useHover();
  const [hoverAllRequests, bindHoverAllRequests] = useHover();
  const [hoverTripTickets, bindHoverTripTickets] = useHover();
  const [hoverRequestMap, bindHoverRequestMap] = useHover();

  useEffect(() => {
    if (location.pathname.includes("/ambulance_personnel")) {
      document.title = "AMRES-Personnel";
    }
  }, [location.pathname]);
  return (
    <Sidebar bgColor="teal.900">
      <Box>
        <DashboardLogo />
        <Box ps={4} py={1}>
          <Box as="section" my={4}>
            <Link
              as={RouterLink}
              to="/ambulance_personnel"
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
                location.pathname === "/ambulance_personnel"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel" && "whiteAlpha.900"
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
              to="/ambulance_personnel/requests"
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
                location.pathname === "/ambulance_personnel/requests"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel/requests" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverRequest}
            >
              <UilFileInfoAlt />
              Handled Requests
            </Link>

            <Link
              as={RouterLink}
              to="/ambulance_personnel/pending_requests"
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
                location.pathname === "/ambulance_personnel/pending_requests"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel/pending_requests" &&
                "whiteAlpha.900"
              }
              _hover={{
                color: "#FF7A00",
              }}
              {...bindHoverAllRequests}
            >
              <UilFolder />
              Pending Requests
            </Link>

            <Link
              as={RouterLink}
              to="/ambulance_personnel/trip_tickets"
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
                location.pathname === "/ambulance_personnel/trip_tickets"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel/trip_tickets" &&
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
              to="/ambulance_personnel/ambulance"
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
                location.pathname === "/ambulance_personnel/ambulance"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel/ambulance" &&
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
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default PersonnelSidebar;
