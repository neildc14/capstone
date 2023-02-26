import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label="Theme">
      <IconButton
        aria-label="Toggle theme"
        variant="ghost"
        _hover={{ bgColor: "none" }}
        icon={
          colorMode === "light" ? (
            <MoonIcon boxSize={6} />
          ) : (
            <SunIcon boxSize={6} />
          )
        }
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export default ThemeButton;
