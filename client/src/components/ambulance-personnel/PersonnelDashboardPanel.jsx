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
} from "@chakra-ui/react";
import PanelCard from "../PanelCard";
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

            <Menu>
              <MenuButton
                as={Button}
                borderRadius={0}
                size="sm"
                bgColor="blue.400"
                color="white"
              >
                Availability
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
          <Divider />
        </Box>
        <Box my={8}>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-evenly"
            gap="2rem"
          >
            <PersonnelPanelCard
              total={0}
              title="Total Requests"
              type="Pending"
              bgColor="#E2E8F0"
            />

            <PersonnelPanelCard
              title="Total Requests"
              total={0}
              bgColor="#E2E8F0"
              type="Approved"
            />
            <PersonnelPanelCard
              title="Total Requests"
              total={0}
              bgColor="#E2E8F0"
              type="Fulfilled"
            />
          </Flex>
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
        </Box>
      </Box>
    </Box>
  );
};

export default PersonnelDashboardPanel;
