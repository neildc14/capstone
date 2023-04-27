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

const Settings = ({ changeStatusHandler, handleLogOut }) => {
  const options = [
    { value: "stand-by", label: "Stand-by" },
    { value: "driving", label: "Driving" },
    { value: "off-duty", label: "Off-duty" },
  ];

  return (
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
        <Box
          width="100%"
          display="inline-flex"
          alignItems="baseline"
          justifyContent="space-between"
          gap={4}
          px={3}
        >
          <Text>Status:</Text>
          <Select
            size="sm"
            onChange={changeStatusHandler}
            defaultValue={options[2].value}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        <MenuDivider />
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Settings;
