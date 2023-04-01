import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Tooltip label="Settings">
      <IconButton
        variant="ghost"
        _hover={{ bgColor: "none" }}
        icon={<SettingsIcon boxSize={4} color="custom.primary" />}
      />
    </Tooltip>
  );
};

export default Settings;
