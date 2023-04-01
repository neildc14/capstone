import React from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PersonnelPanelCard from "./PersonnelPanelCard";
import RequestCard from "../RequestCard";

const PersonnelDashboardPanel = () => {
  return (
    <Box>
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
      <Box>
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
              Pending Requests
            </Heading>
            <Button size="sm" borderRadius="0" px={6}>
              View All
            </Button>
          </Flex>
          <Divider />
        </Box>
        <Box>
          <RequestCard />
          <RequestCard />
        </Box>
      </Box>
    </Box>
  );
};

export default PersonnelDashboardPanel;
