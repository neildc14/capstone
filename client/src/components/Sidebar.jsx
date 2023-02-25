import React from "react";
import { Box } from "@chakra-ui/react";

const Sidebar = ({ children, bgColor }) => {
  return (
    <>
      <Box
        height={{ base: "100vh" }}
        width={{ base: "full", md: "10rem", lg: "3xs" }}
        bgColor={bgColor}
        transition="all .5s ease-in-out"
      >
        {children}
      </Box>
    </>
  );
};

export default Sidebar;
