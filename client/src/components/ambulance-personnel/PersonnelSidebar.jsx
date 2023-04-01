import React from "react";
import { Box, Divider, Link, Text } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import {
  UilCreateDashboard,
  UilFileInfoAlt,
  UilFilePlusAlt,
  UilLocationPinAlt,
  UilThLarge,
} from "@iconscout/react-unicons";

const PersonnelSidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [hoverRequestDashboard, bindHoverRequestDashboard] = useHover();
  const [hoverRequest, bindHoverRequest] = useHover();
  const [hoverRequestForm, bindHoverRequestForm] = useHover();
  const [hoverRequestMap, bindHoverRequestMap] = useHover();

  return (
    <Sidebar bgColor="teal.900">
      <Box>
        <Box py={4}>
          <Text
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            color="#FF7A00"
          >
            LDRRMO-ARMS
          </Text>
          <Divider c />
        </Box>
        <Box ps={4} py={8}>
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
              to="/ambulance_personnel/map"
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
                location.pathname === "/ambulance_personnel/map"
                  ? "#FF7A00"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/ambulance_personnel/map" &&
                "whiteAlpha.900"
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

export default PersonnelSidebar;
