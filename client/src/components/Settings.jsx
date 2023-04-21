import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { UilUserCircle } from "@iconscout/react-unicons";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Select,
  Box,
  Text,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Settings = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (user) {
      localStorage.removeItem("user");
      navigate("/account/login");
    }
  };
  return (
    <Tooltip label="Settings">
      <Menu overflow="hidden">
        <MenuButton
          as={Button}
          variant="ghost"
          size="sm"
          p={0}
          borderRadius={0}
          _hover={{ bgColor: "none" }}
        >
          <UilUserCircle color="#ff7a00" size="24px" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Tooltip>
  );
};

export default Settings;
