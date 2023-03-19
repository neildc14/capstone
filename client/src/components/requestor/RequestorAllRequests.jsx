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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorAllRequests = () => {
  const fetchAllRequests = async () => {
    const response = await axios.get(`${ENDPOINT}request`);
    return response.data;
  };

  const { data, isLoading, isFetching, error } = useQuery(
    ["ambulance_request_with_ticket"],
    fetchAllRequests,
    {
      refetchOnWindowFocus: true,
    }
  );
  console.log(data);

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
          {data?.map((request) => (
            <RequestCard
              key={request._id}
              request_data={request}
              request_id={request._id}
              request_status={request.status}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RequestorAllRequests;
