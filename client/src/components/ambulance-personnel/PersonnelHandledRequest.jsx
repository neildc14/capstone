import React, { useCallback, useMemo } from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import {
  UilHistory,
  UilUserCheck,
  UilFileSlash,
} from "@iconscout/react-unicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelGenericRequestCard from "./PersonnelGenericRequestCard";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const HandledRequest = () => {
  const fetchHandledRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request`);
    return response.data;
  }, []);

  const queryKey = "personnel_handled_requests";
  const { data, isLoading, isFetching, error } = useQuery(
    [queryKey],
    fetchHandledRequests,
    {
      refetchOnWindowFocus: true,
    }
  );

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  const filterApprovedRequest = () => {
    let approvedRequests;
    let recentApprovedRequest;
    if (Array.isArray(memoizedData)) {
      approvedRequests = memoizedData?.filter(
        (req) => req.status === "approved"
      );
      recentApprovedRequest = approvedRequests[0];
    }

    return recentApprovedRequest;
  };
  const recentApprovedRequest = filterApprovedRequest();

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
            <PersonnelGenericRequestCard
              request_data={recentApprovedRequest}
              borderRadius="sm"
              name={`${recentApprovedRequest?.first_name} ${recentApprovedRequest?.last_name}`}
              date_time={recentApprovedRequest?.createdAt}
            />
          </Box>
        </Box>
      </Box>
      <Box as="section">
        <Box px={4}>
          <Flex
            py={2}
            flexDirection="row"
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
              <UilHistory color="#FF7A00" />
              Request History
            </Heading>
            <Text color="#FF7A00" fontWeight="semibold">
              Total: {memoizedData?.length}
            </Text>
          </Flex>
          <Divider />
        </Box>
        <Box px={4} py={2} height={{ md: "55vh" }} overflowY="scroll">
          <Flex flexDirection="column" gap={4}>
            {!error &&
              memoizedData?.map((request) => (
                <PersonnelGenericRequestCard
                  key={request?._id}
                  request_data={request}
                  borderRadius="sm"
                  name={`${request?.first_name} ${request?.last_name}`}
                  date_time={request?.createdAt}
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
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default HandledRequest;
