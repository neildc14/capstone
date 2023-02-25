import React from "react";

import { Box, Heading, Divider, Text, Button, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const RequestorSidebar = () => {
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
            >
              Locate Ambulance
            </Button>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default RequestorSidebar;
