import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { UilMoonset, UilSunset } from "@iconscout/react-unicons";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label="Theme">
      <IconButton
        aria-label="Toggle theme"
        variant="ghost"
        borderRadius={0}
        _hover={{ bgColor: "none" }}
        icon={
          colorMode === "light" ? (
            <UilMoonset color="#ff7a00" />
          ) : (
            <UilSunset color="#ff7a00" />
          )
        }
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export default ThemeButton;
