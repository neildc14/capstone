import React from "react";

import MobileSidebar from "../MobileSideBar";
import { Box, Heading, Divider, Text, Button, Flex } from "@chakra-ui/react";

const RequestorMobileSidebar = ({
  isOpen,
  onClose,
  handleRequestForm,
  handleViewRequest,
  handleViewMap,
}) => {
  return (
    <MobileSidebar bgColor="teal.900" isOpen={isOpen} onClose={onClose}>
      <Box>
        <Heading
          as="h2"
          px="0"
          fontSize={{ base: "lg", md: "md", lg: "md", xl: "xl" }}
          fontWeight="normal"
          color="whiteAlpha.900"
        >
          Requestor Dashboard
        </Heading>
      </Box>
      <Divider />
      <Box as="section" my={4}>
        <Button
          variant="ghost"
          display="block"
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
          Requests
        </Button>
        <Button
          variant="ghost"
          display="block"
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
          Request Ambulance
        </Button>
        <Button
          variant="ghost"
          display="block"
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
          Locate Ambulance
        </Button>
      </Box>
    </MobileSidebar>
  );
};

export default RequestorMobileSidebar;
