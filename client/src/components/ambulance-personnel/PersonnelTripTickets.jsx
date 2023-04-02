import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import PersonnelTripTicketCard from "./PersonelTripTicketCard";
import { UilHistory, UilFileInfoAlt } from "@iconscout/react-unicons";

const PersonnelTripTickets = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
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
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
                <PersonnelTripTicketCard />
              </Flex>
            </Box>
          </Box>
        </GridItem>

        {isLargerThan768 && (
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
              <Card background="gray.100">
                <CardBody>
                  <VStack align="left" spacing={1} pb={3}>
                    <Heading
                      as="h5"
                      display="block"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      Trip Ticket ID:
                    </Heading>
                    <Text as="span" fontWeight="normal">
                      asdjfeqflkewqjhrrwin
                    </Text>
                  </VStack>
                  <VStack align="left" spacing={1} pb={3}>
                    <Heading
                      as="h5"
                      display="block"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      Driver:
                    </Heading>
                    <Text as="span" fontWeight="normal">
                      Juan Dela Crux
                    </Text>
                  </VStack>
                  <VStack align="left" spacing={1} pb={3}>
                    <Heading
                      as="h5"
                      display="block"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      Ambulance Plate:
                    </Heading>
                    <Text as="span" fontWeight="normal">
                      ABCM 342
                    </Text>
                  </VStack>
                  <VStack align="left" spacing={1} pb={3}>
                    <Heading
                      as="h5"
                      display="block"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      Destination:
                    </Heading>
                    <Text as="span" fontWeight="normal">
                      Manila
                    </Text>
                  </VStack>
                  <VStack align="left" spacing={1} pb={3}>
                    <Heading
                      as="h5"
                      display="block"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      Patient Name:
                    </Heading>
                    <Text as="span" fontWeight="normal">
                      Macaraeg Macaraeg
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default PersonnelTripTickets;
