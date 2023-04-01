import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useDashboardContext } from "../pages/RequestorDashboard";

const TopNav = () => {
  const toggleDashboard = useDashboardContext();
  return (
    <>
      <IconButton
        aria-label="Toggle dashboard"
        variant="ghost"
        icon={<HamburgerIcon boxSize={6} color="custom.primary" />}
        onClick={toggleDashboard}
      />
    </>
  );
};

export default TopNav;
