import { UilBell } from "@iconscout/react-unicons";

import { useState } from "react";
import { BellIcon } from "@chakra-ui/icons";
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
  Badge,
  Icon,
} from "@chakra-ui/react";

const NotifBell = () => {
  const [notificationsCount, setNotificationsCount] = useState(10);
  return (
    <Menu overflow="hidden" alignSelf="center">
      <MenuButton
        as={Badge}
        variant="ghost"
        size="sm"
        borderRadius={0}
        px="2"
        py={1}
        cursor="pointer"
        alignSelf="center"
      >
        <Icon as={UilBell} boxSize={6} color="#FF7A00" />
        {notificationsCount}
      </MenuButton>
      <MenuList maxWidth="400px" bgColor="orange.200">
        <MenuItem>
          lorem10 impsum set amet. lorem10 impsum set amet. lorem10 impsum set
          amet.lorem10 impsum set amet.
        </MenuItem>
        <MenuItem>
          lorem10 impsum set amet. lorem10 impsum set amet. lorem10 impsum set
          amet.lorem10 impsum set amet.
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NotifBell;
