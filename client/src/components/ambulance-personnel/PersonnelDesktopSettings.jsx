import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { UilUserCircle } from "@iconscout/react-unicons";

const PersonnelDesktopSettings = ({ handleLogOut, changeStatusHandler }) => {
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
        <Box
          width="100%"
          display="inline-flex"
          alignItems="baseline"
          justifyContent="space-between"
          gap={4}
          px={3}
        >
          <Text>Status:</Text>
          <Select size="sm" onChange={changeStatusHandler}>
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
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PersonnelDesktopSettings;
