import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import PersonnelTripTicketCard from "./PersonnelTripTicketCard";
import { UilHistory, UilFileInfoAlt } from "@iconscout/react-unicons";

import PersonnelTripTicketDetails from "./PersonnelTripTicketDetails";

const PersonnelTripTickets = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [show, setShow] = useState(false);

  const showTripTicketDetails = () => {
    setShow(true);
  };

  let count = 10;

  const listItems = [];
  for (let i = 0; i < count; i++) {
    listItems.push(
      <PersonnelTripTicketCard showTripTicketDetails={showTripTicketDetails} />
    );
  }
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
                </Flex>
                <Divider />
              </Box>
              <Box overflowY={{ md: "scroll" }} height={{ md: "80vh" }}>
                <Flex flexDirection="column" gap={4} pe={{ md: 4 }} pt={4}>
                  {listItems}
                </Flex>
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={2}>
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
              {isLargerThan768 && show && <PersonnelTripTicketDetails />}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(PersonnelTripTickets);
