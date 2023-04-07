import React, { useState } from "react";
import {
  Box,
  Heading,
  Divider,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  UilFileCheckAlt,
  UilThLarge,
  UilAngleLeft,
  UilAngleRight,
} from "@iconscout/react-unicons";
import PaginatedItems from "../global/PaginatedItems";
import AdministratorRequestCard from "./AdministratorRequestCard";

const AdministratorDashboardPanel = () => {
  const navigate = useNavigate();

  const navigateToRequests = () => {
    navigate("requests");
  };

  const panel_card_data = [
    { title: "Total Requests", total: 0, type: "Today" },
    {
      title: "Total Ambulance",
      total: 0,
      type: "Available",
    },
    { title: "Total Driver", total: 0, type: "On-Duty" },
    { title: "Total Requests", total: 0, type: "Rejected" },
  ];

  // Example items, to simulate fetching from another resources.
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14,
  ];

  return (
    <Box>
      <Flex
        display="flex"
        flexDirection={{ base: "column-reverse", md: "column" }}
        gap={{ base: 4, md: 0 }}
      >
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
                <UilThLarge color="#FF7A00" /> Dashboard Panel
              </Heading>
            </Flex>
            <Divider />
          </Box>
          <Box my={8}>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              {panel_card_data?.map((panel_card) => (
                <GridItem key={panel_card.type}>
                  <PersonnelPanelCard
                    total={panel_card.total}
                    title={panel_card.title}
                    type={panel_card.type}
                    bgColor="#E2E8F0"
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box as="section">
          <Box mb={8} bgColor="custom.secondary">
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
                  color="blackAlpha"
                >
                  <UilFileCheckAlt color="#FF7A00" /> Recent Pending Request
                </Heading>

                <Flex
                  width={{ base: "100%", md: "inherit" }}
                  flexDirection={{ base: "row", md: "row" }}
                  justifyContent={{ base: "space-between" }}
                  alignItems={{ base: "center", md: "center" }}
                  gap={4}
                >
                  <Text color="#FF7A00" fontWeight="semibold">
                    Total: 30
                  </Text>
                  <Button
                    size="sm"
                    px={{ base: 2, md: 6 }}
                    border="1px solid #ff7a00"
                    borderRadius="md"
                    color="custom.primary"
                    bgColor="white"
                    _hover={{ color: "white", bgColor: "orange.500" }}
                    onClick={navigateToRequests}
                  >
                    View All
                  </Button>
                </Flex>
              </Flex>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              <PaginatedItems itemsPerPage={4} items={items}>
                {(currentItems) => (
                  <Flex flexDirection="column" gap={2}>
                    {currentItems &&
                      currentItems.map((item) => (
                        <AdministratorRequestCard
                          key={item}
                          bgColor="white"
                          borderRadius="sm"
                        />
                      ))}
                  </Flex>
                )}
              </PaginatedItems>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(AdministratorDashboardPanel);
