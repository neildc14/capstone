import React from "react";
import { Box, Heading, Divider, Text, Flex, Link } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import requestFormWhite from "../../assets/icons/request-form-white.png";
import requestFormBlack from "../../assets/icons/request-form-black.png";
import requestWhite from "../../assets/icons/request-white.png";
import requestBlack from "../../assets/icons/request-black.png";
import mapWhite from "../../assets/icons/map-white.png";
import mapBlack from "../../assets/icons/map-black.png";
import dashboardBlack from "../../assets/icons/request-black-dashboard.png";
import dashboardWhite from "../../assets/icons/request-white-dashboard.png";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import {
  UilCreateDashboard,
  UilFileInfoAlt,
  UilFilePlusAlt,
  UilLocationPinAlt,
} from "@iconscout/react-unicons";

const RequestorSidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [hoverRequestDashboard, bindHoverRequestDashboard] = useHover();
  const [hoverRequest, bindHoverRequest] = useHover();
  const [hoverRequestForm, bindHoverRequestForm] = useHover();
  const [hoverRequestMap, bindHoverRequestMap] = useHover();

  console.log(hoverRequest);
  return (
    <Sidebar bgColor="teal.900">
      <Box>
        {/* <Box px={4}>
          <Heading
            as="h2"
            fontSize={{ base: "lg", md: "md", lg: "md" }}
            fontWeight="normal"
            color="whiteAlpha.900"
          >
            Requestor Dashboard
          </Heading>
        </Box>
        <Divider /> */}

        <Box ps={4} py={8}>
          {/* <Flex gap={2} alignItems="flex-end" mb={4} ps={2}>
            <Avatar size="sm">
              <AvatarBadge
                boxSize="1.25em"
                bg="green.500"
                borderColor="papayawhip"
              />
            </Avatar>
            <Text color="whiteAlpha.900">First Name</Text>
          </Flex> */}

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
                  ? "blackAlpha.900"
                  : "whiteAlpha.900"
              }
              bgColor={location.pathname === "/requestor" && "whiteAlpha.900"}
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              {...bindHoverRequestDashboard}
            >
              <UilCreateDashboard />
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
                  ? "blackAlpha.900"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/request" && "whiteAlpha.900"
              }
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              {...bindHoverRequestForm}
            >
              <UilFilePlusAlt />
              Request Ambulance
            </Link>

            <Link
              as={RouterLink}
              to="/requestor/map"
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
                location.pathname === "/requestor/map"
                  ? "blackAlpha.900"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/map" && "whiteAlpha.900"
              }
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              {...bindHoverRequestMap}
            >
              <UilLocationPinAlt />
              Locate Ambulance
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
                  ? "blackAlpha.900"
                  : "whiteAlpha.900"
              }
              bgColor={
                location.pathname === "/requestor/requests" && "whiteAlpha.900"
              }
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              {...bindHoverRequest}
            >
              <UilFileInfoAlt />
              Requests
            </Link>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default RequestorSidebar;
