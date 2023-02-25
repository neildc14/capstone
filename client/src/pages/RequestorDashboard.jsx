import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import {
  Box,
  Heading,
  Divider,
  useMediaQuery,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import MobileSidebar from "../components/MobileSideBar";
import RequestForm from "../components/RequestForm";
import ThemeButton from "../components/ThemeButton";

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
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
      <ThemeButton />
      <Box display="flex" flexDirection={{ base: "colum", lg: "row" }} gap={4}>
        {isLargerThan768 ? (
          <Sidebar bgColor="teal.900">
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
              <Box px={4} py={8}>
                <Text color="whiteAlpha.900">Profile</Text>
                <Box as="section" my={4}>
                  <Button
                    width="100%"
                    my={4}
                    borderRadius="none"
                    fontSize={{ md: "sm", lg: "md" }}
                  >
                    Request Ambulance
                  </Button>
                  <Button
                    width="100%"
                    my={4}
                    borderRadius="none"
                    fontSize={{ md: "sm", lg: "md" }}
                  >
                    Locate Ambulance
                  </Button>
                </Box>
              </Box>
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

        <Box width="100%" px={4} pt="10">
          <RequestForm />
        </Box>
      </Box>
    </>
  );
};

export default RequestorDashboard;
