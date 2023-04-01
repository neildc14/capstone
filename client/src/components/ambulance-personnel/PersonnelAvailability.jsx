import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const PersonnelAvailability = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="sm"
        p={0}
        borderRadius={0}
        _hover={{ bgColor: "none" }}
        _active={{ bgColor: "none" }}
        rightIcon={<ChevronDownIcon />}
      >
        Availability
      </MenuButton>
      <MenuList>
        <MenuItem>A</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PersonnelAvailability;
