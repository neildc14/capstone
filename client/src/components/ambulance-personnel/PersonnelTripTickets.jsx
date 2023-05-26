import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Card,
  CardBody,
  useMediaQuery,
} from "@chakra-ui/react";
import TripTicketCard from "../global/TripTicketCard";
import { UilHistory, UilFileInfoAlt } from "@iconscout/react-unicons";
import TripTicketDetails from "../global/TripTicketDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "../global/SearchBar";

import Authorization from "../../utils/auth";
import { useReactToPrint } from "react-to-print";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelTripTickets = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [show, setShow] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({});
  const [search, setSearch] = useState([]);

  const { headers } = Authorization();

  const fetchTripTickets = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}ticket/ambulance_personnel`, {
      headers,
    });
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

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });

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
                    <UilHistory color="#FF7A00" /> Trip History
                  </Heading>
                  <SearchBar
                    memoizedData={memoizedData}
                    setSearch={setSearch}
                    placeholder="Search a request"
                    noResultMessage="No trip ticket found."
                  />
                </Flex>
                <Divider />
              </Box>
              <Box overflowY={{ md: "scroll" }} height={{ md: "80vh" }}>
                <Flex flexDirection="column" gap={4} pe={{ md: 4 }} pt={4}>
                  {!error &&
                    search.length <= 0 &&
                    memoizedData?.map((trip_ticket) => (
                      <TripTicketCard
                        key={trip_ticket._id}
                        trip_ticket={trip_ticket}
                        showTripTicketDetails={showTripTicketDetails}
                        ticketDetails={ticketDetails}
                        setTicketDetails={setTicketDetails}
                      />
                    ))}
                  {!error &&
                    search.length > 0 &&
                    search?.map((trip_ticket) => (
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
                  ref={componentRef}
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
                        <UilFileInfoAlt color="#FF7A00" /> Trip Ticket Details
                      </Heading>
                    </Flex>
                    <Divider />
                  </Box>
                  {show && (
                    <TripTicketDetails
                      ticketDetails={ticketDetails}
                      handlePrint={handlePrint}
                    />
                  )}
                </Box>
              )}
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(PersonnelTripTickets);
