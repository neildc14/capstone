import React from "react";
import { Box } from "@chakra-ui/react";

const Sidebar = ({ children, bgColor }) => {
  return (
    <>
      <Box
        maxHeight="100%"
        width={{ base: "full", md: "xs", lg: "2xs" }}
        bgColor={bgColor}
        boxShadow="6px 0px 0px 0px rgba(0,0,0,0.1)"
      >
        {children}
      </Box>
    </>
  );
};

export default Sidebar;
