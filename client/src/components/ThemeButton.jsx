import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      variant="ghost"
      position="absolute"
      top="5px"
      right="10px"
      icon={
        colorMode === "light" ? (
          <MoonIcon boxSize={6} />
        ) : (
          <SunIcon boxSize={6} />
        )
      }
      onClick={toggleColorMode}
    />
  );
};

export default ThemeButton;
