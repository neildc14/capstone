import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
const TopNav = ({ toggleDashboard }) => {
  return (
    <>
      <IconButton
        aria-label="Toggle dashboard"
        variant="ghost"
        icon={<HamburgerIcon boxSize={6} />}
        onClick={toggleDashboard}
      />
    </>
  );
};

export default TopNav;
