import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { UilMoonset } from "@iconscout/react-unicons";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label="Theme">
      <IconButton
        aria-label="Toggle theme"
        variant="ghost"
        _hover={{ bgColor: "none" }}
        icon={colorMode === "light" ? <UilMoonset /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export default ThemeButton;
