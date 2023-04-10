import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  UilHistory,
  UilFileInfoAlt,
  UilSearch,
} from "@iconscout/react-unicons";
import TripTicketCard from "../global/TripTicketCard";
import TripTicketDetails from "../global/TripTicketDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorTripTickets = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [show, setShow] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({});

  const fetchTripTickets = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}ticket`);
    return response.data;
  }, []);

  const queryKey = "trip_ticket";
  const { data, isLoading, isFetching, error } = useQuery(
    [queryKey],
    fetchTripTickets,
    {
      refetchOnWindowFocus: false,
    }
  );

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  const showTripTicketDetails = () => {
    setShow(true);
  };

  return (
    <>
      <Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
          gap={4}
        >
          <GridItem colSpan={4}>
            <Box as="section">
              <Box>
                <Flex
                  px={4}
                  py={2}
                  flexDirection={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  <Heading
                    as="h2"
                    flex="1"
                    display="inline-flex"
                    gap={2}
                    py={2}
                    fontSize="xl"
                    fontWeight="semibold"
                    bgColor="white"
                    color="gray.700"
                  >
                    <UilHistory color="#FF7A00" /> Trip History
                  </Heading>
                  <Box display="inline-flex" flex="1" gap={2}>
                    <Input
                      type="search"
                      size="sm"
                      flex="1"
                      placeholder="Search ticket"
                    />
                    <Button
                      type="submit"
                      display="inline-flex"
                      gap={2}
                      size="sm"
                    > 
                      <UilSearch size="16px" /> Search
                    </Button>
                  </Box>
                </Flex>
                <Divider />
              </Box>
              <Box overflowY={{ md: "scroll" }} height={{ md: "80vh" }}>
                <Flex flexDirection="column" gap={4} pe={{ md: 4 }} pt={4}>
                  {!error &&
                    memoizedData?.map((trip_ticket) => (
                      <TripTicketCard
                        key={trip_ticket._id}
                        trip_ticket={trip_ticket}
                        showTripTicketDetails={showTripTicketDetails}
                        ticketDetails={ticketDetails}
                        setTicketDetails={setTicketDetails}
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
                        No tickets found.
                      </CardBody>
                    </Card>
                  )}
                </Flex>
              </Box>
            </Box>
          </GridItem>

          {!error && (
            <GridItem colSpan={2}>
              {isLargerThan768 && (
                <Box
                  as="aside"
                  height="100%"
                  px={4}
                  py={4}
                  bgColor="gray.50"
                  borderLeft="1px solid #D9D9D9"
                >
                  <Box pb={4}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Heading
                        as="h2"
                        display="inline-flex"
                        gap={2}
                        py={2}
                        fontSize="lg"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        <UilFileInfoAlt color="#FF7A00" /> Trip Details
                      </Heading>
                    </Flex>
                    <Divider />
                  </Box>
                  {show && <TripTicketDetails ticketDetails={ticketDetails} />}
                </Box>
              )}
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(AdministratorTripTickets);
