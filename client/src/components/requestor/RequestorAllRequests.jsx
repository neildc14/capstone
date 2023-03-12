import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import { UilHistoryAlt } from "@iconscout/react-unicons";

const RequestorAllRequests = () => {
  return (
    <Box p={{ md: 6 }}>
      <Box>
        <Heading
          as="h2"
          p={2}
          display="flex"
          fontSize="xl"
          fontWeight="semibold"
          bgColor="white"
        >
          <UilHistoryAlt /> <Text as="span">Request History</Text>
        </Heading>
        <Divider />
        <Box
          as="section"
          height={{ base: "80vh", md: "70vh" }}
          mt={4}
          overflowY="scroll"
        >
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
        </Box>
      </Box>
    </Box>
  );
};

export default RequestorAllRequests;
