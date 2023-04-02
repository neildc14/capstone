import React from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PersonnelPanelCard from "./PersonnelPanelCard";
import PersonnelRecentRequestCard from "./PersonnelRecentRequestCard";

const PersonnelDashboardPanel = () => {
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
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
                color="gray.700"
              >
                Dashboard Panel
              </Heading>
            </Flex>
            <Divider />
          </Box>
          <Box my={8}>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={3}
            >
              <GridItem>
                <PersonnelPanelCard
                  total={0}
                  title="Total Requests"
                  type="Pending"
                  bgColor="#E2E8F0"
                />
              </GridItem>

              <GridItem>
                <PersonnelPanelCard
                  title="Total Requests"
                  total={0}
                  bgColor="#E2E8F0"
                  type="Approved"
                />
              </GridItem>

              <GridItem>
                <PersonnelPanelCard
                  title="Total Requests"
                  total={0}
                  bgColor="#E2E8F0"
                  type="Fulfilled"
                />
              </GridItem>
              <GridItem>
                <PersonnelPanelCard
                  title="Total Requests"
                  total={0}
                  bgColor="#E2E8F0"
                  type="Rejected"
                />
              </GridItem>
              <GridItem>
                <PersonnelPanelCard
                  title="Total Ambulance"
                  total={0}
                  bgColor="#E2E8F0"
                  type="Available"
                />
              </GridItem>
              <GridItem>
                <PersonnelPanelCard
                  title="Total Distance Travelled "
                  total={0}
                  bgColor="#E2E8F0"
                  type="Today"
                />
              </GridItem>
            </Grid>
          </Box>
        </Box>
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
                  py={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="white"
                  color="gray.700"
                >
                  Recent Approved Request
                </Heading>
                <Button
                  size="sm"
                  px={6}
                  width={{ base: "100%", md: "inherit" }}
                  border="1px solid #ff7a00"
                  borderRadius="sm"
                  color="custom.primary"
                  bgColor="white"
                  _hover={{ color: "white", bgColor: "custom.primary" }}
                >
                  View All Requests
                </Button>
              </Flex>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              <PersonnelRecentRequestCard />
            </Box>
          </Box>
          <Box border="1px solid #D9D9D9">
            <Box>
              <Flex
                px={4}
                py={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading
                  as="h2"
                  py={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="white"
                  color="gray.700"
                >
                  Recent Pending Request
                </Heading>
              </Flex>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              <PersonnelRecentRequestCard />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default PersonnelDashboardPanel;
