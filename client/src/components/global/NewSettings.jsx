import React, { useContext, useEffect } from "react";
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
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewSettings = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (user) {
      localStorage.removeItem("user");
      navigate("/account/login");
    }
  };

  return (
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
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NewSettings;
