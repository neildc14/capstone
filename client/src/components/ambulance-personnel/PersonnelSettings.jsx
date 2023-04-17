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

const Settings = () => {
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
          <Box
            width="100%"
            display="inline-flex"
            alignItems="baseline"
            justifyContent="space-between"
            gap={4}
            px={3}
          >
            <Text>Status:</Text>
            <Select size="sm">
              <option name="standy_by" value="stand-by">
                Standy-by
              </option>
              <option name="driving" value="driving">
                Driving
              </option>
              <option name="off_duty" value="off_duty">
                Off-duty
              </option>
            </Select>
          </Box>

          <MenuDivider />
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Tooltip>
  );
};

export default Settings;
