import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import {
  Box,
  Heading,
  Divider,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import MobileSidebar from "../components/MobileSideBar";

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [showDashboard, setShowDashboard] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleDashboard = () => {
    onOpen();
  };

  return (
    <>
      {!isLargerThan768 && (
        <>
          <TopNav toggleDashboard={toggleDashboard} />
          <Divider />
        </>
      )}
      <Box display="flex" flexDirection="row" gap={4}>
        {isLargerThan768 ? (
          <Sidebar bgColor="teal.900" showDashboard={showDashboard}>
            <Box pt="10">
              <Box px={4}>
                <Heading
                  as="h2"
                  fontSize={{ base: "lg", md: "md", lg: "md", xl: "md" }}
                  fontWeight="normal"
                  color="whiteAlpha.900"
                >
                  Requestor Dashboard
                </Heading>
              </Box>
              <Divider />
            </Box>
          </Sidebar>
        ) : (
          <MobileSidebar bgColor="teal.900" isOpen={isOpen} onClose={onClose}>
            <Box px={4}>
              <Heading
                as="h2"
                fontSize={{ base: "lg", md: "md", lg: "md", xl: "xl" }}
                fontWeight="normal"
                color="whiteAlpha.900"
              >
                Requestor Dashboard
              </Heading>
            </Box>
            <Divider />
          </MobileSidebar>
        )}

        <Box pt="10">
          <Box as="form">
            
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RequestorDashboard;
