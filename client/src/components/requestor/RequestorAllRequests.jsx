import React, { useCallback, useMemo } from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  Flex,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import RequestCard from "./RequestorRequestCard";
import { UilHistoryAlt, UilFileSlash } from "@iconscout/react-unicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorAllRequests = () => {
  const fetchAllRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request`);
    return response.data;
  }, []);

  const queryKey = "ambulance_request";
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    [queryKey],
    fetchAllRequests,
    {
      refetchOnWindowFocus: false,
    }
  );

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <Box>
      <Box>
        <Flex
          py={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            as="h2"
            display="flex"
            fontSize="xl"
            fontWeight="semibold"
            bgColor="white"
          >
            <UilHistoryAlt color="#FF7A00" />{" "}
            <Text as="span">Request History</Text>
          </Heading>

          <Text color="#FF7A00" fontWeight="semibold">
            Total: {memoizedData?.length}
          </Text>
        </Flex>
        <Divider />
        <Box
          as="section"
          height={{ base: "80vh", md: "70vh" }}
          mt={4}
          overflowY="scroll"
        >
          <Skeleton isLoaded={!isLoading} height={{ base: "40vh", md: "100%" }}>
            {!error &&
              memoizedData?.map((request) => (
                <RequestCard
                  key={request._id}
                  request_data={request}
                  request_id={request._id}
                  request_status={request.status}
                  refetch={refetch}
                  queryKey={queryKey}
                />
              ))}

            {error && (
              <Card bgColor="orange.300">
                <CardBody
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  color="white"
                  fontWeight="semibold"
                >
                  <UilFileSlash color="white" /> No requests found.
                </CardBody>
              </Card>
            )}
          </Skeleton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RequestorAllRequests);
