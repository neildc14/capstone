import React from "react";
import { Box, Heading, Divider, Text, Button, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import requestFormWhite from "../../assets/icons/request-form-white.png";
import requestFormBlack from "../../assets/icons/request-form-black.png";
import requestWhite from "../../assets/icons/request-white.png";
import requestBlack from "../../assets/icons/request-black.png";
import mapWhite from "../../assets/icons/map-white.png";
import mapBlack from "../../assets/icons/map-black.png";

const RequestorSidebar = ({
  handleRequestForm,
  handleViewRequest,
  handleViewMap,
}) => {
  return (
    <Sidebar bgColor="teal.900">
      <Box pt="10">
        <Box px={4}>
          <Heading
            as="h2"
            fontSize={{ base: "lg", md: "md", lg: "md" }}
            fontWeight="normal"
            color="whiteAlpha.900"
          >
            Requestor Dashboard
          </Heading>
        </Box>
        <Divider />

        <Box px={4} py={8}>
          <Flex gap={2} alignItems="flex-end">
            <Avatar size="sm">
              <AvatarBadge
                boxSize="1.25em"
                bg="green.500"
                borderColor="papayawhip"
              />
            </Avatar>
            <Text color="whiteAlpha.900">First Name</Text>
          </Flex>

          <Box as="section" my={4}>
            <Button
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              p="0"
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              color="whiteAlpha.900"
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              onClick={handleViewRequest}
            >
              <img src={requestWhite} alt="request icon" />
              Requests
            </Button>
            <Button
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              p="0"
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              color="whiteAlpha.900"
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              onClick={handleRequestForm}
            >
              <img src={requestFormWhite} alt="form icon" />
              Request Ambulance
            </Button>
            <Button
              variant="ghost"
              display="flex"
              justifyContent="flex-start"
              gap=".5rem"
              width="100%"
              my={4}
              p="0"
              borderRadius="none"
              textAlign="left"
              fontSize={{ md: "sm", lg: "md" }}
              color="whiteAlpha.900"
              _hover={{
                color: "blackAlpha.900",
                bgColor: "whiteAlpha.900",
              }}
              onClick={handleViewMap}
            >
              <img src={mapWhite} alt="map icon" />
              Locate Ambulance
            </Button>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default RequestorSidebar;
