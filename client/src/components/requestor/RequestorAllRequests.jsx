import React from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import RequestCard from "./RequestorRequestCard";
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
    ["ambulance_request"],
    fetchAllRequests,
    {
      refetchOnWindowFocus: true,
    }
  );
  console.log(data, error);

  return (
    <Box>
      <Box>
        <Heading
          as="h2"
          p={2}
          display="flex"
          fontSize="xl"
          fontWeight="semibold"
          bgColor="white"
        >
          <UilHistoryAlt color="#FF7A00" />{" "}
          <Text as="span">Request History</Text>
        </Heading>
        <Divider />
        <Box
          as="section"
          height={{ base: "80vh", md: "70vh" }}
          mt={4}
          overflowY="scroll"
        >
          <Skeleton isLoaded={!isLoading} height="40px">
            {data?.map((request) => (
              <RequestCard
                key={request._id}
                request_data={request}
                request_id={request._id}
                request_status={request.status}
              />
            ))}

            {error && (
              <Card bgColor="gray.50">
                <CardBody>No requests found</CardBody>
              </Card>
            )}
          </Skeleton>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestorAllRequests;
