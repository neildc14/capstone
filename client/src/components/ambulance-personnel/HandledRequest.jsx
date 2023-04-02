import React from "react";
import { Box, Heading, Divider, Flex, Button } from "@chakra-ui/react";
import PersonnelRecentRequestCard from "./PersonnelRecentRequestCard";
import { UilHistory, UilUserCheck } from "@iconscout/react-unicons";

const HandledRequest = () => {
  return (
    <Box>
      <Box as="section">
        <Box mb={8} border="1px solid #D9D9D9">
          <Box>
            <Flex
              px={4}
              py={2}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading
                as="h2"
                display="inline-flex"
                gap={2}
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
                color="gray.700"
              >
                <UilUserCheck color="#FF7A00" /> Recent Approved Request
              </Heading>
            </Flex>
            <Divider />
          </Box>
          <Box px={4} py={4}>
            <PersonnelRecentRequestCard />
          </Box>
        </Box>
      </Box>
      <Box as="section">
        <Box px={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading
              as="h2"
              display="inline-flex"
              gap={2}
              py={2}
              fontSize="xl"
              fontWeight="semibold"
              bgColor="white"
              color="gray.700"
            >
              <UilHistory color="#FF7A00" />
              Request History
            </Heading>
          </Flex>
          <Divider />
        </Box>
        <Box px={4} py={2} height={{ md: "55vh" }} overflowY="scroll">
          <Flex flexDirection="column" gap={4}>
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
            <PersonnelRecentRequestCard />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default HandledRequest;
