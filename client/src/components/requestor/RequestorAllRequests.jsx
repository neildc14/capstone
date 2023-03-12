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
} from "@chakra-ui/react";
import RequestCard from "./RequestCard";

const RequestorAllRequests = () => {
  return (
    <Box p={{ md: 6 }}>
      {/* <Box mb={10} sx={{ border: "1px solid gray.50" }}>
        <RequestHeading label="Recent Request" />
        <Divider />
        <Box as="section" mt={4} p={4}>
          <RequestCard />
        </Box>
      </Box> */}

      <Box>
        <RequestHeading label="Request History" />
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

const RequestHeading = ({ label }) => {
  return (
    <Heading as="h2" p={2} fontSize="xl" fontWeight="semibold" bgColor="white">
      {label}
    </Heading>
  );
};

export default RequestorAllRequests;
