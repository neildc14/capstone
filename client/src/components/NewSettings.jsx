import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Text,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { UilUserCircle } from "@iconscout/react-unicons";

const NewSettings = () => {
  return (
    <Tooltip label="User settings">
      <Menu overflow="hidden">
        <MenuButton
          as={Button}
          variant="ghost"
          size="sm"
          p={0}
          borderRadius={0}
          _hover={{ bgColor: "none" }}
          rightIcon={<ChevronDownIcon />}
        >
          <Box display="inline-flex" alignItems="center" gap=".2rem">
            <UilUserCircle color="#ff7a00" size="24px" /> <Text>@username</Text>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Tooltip>
  );
};

export default NewSettings;
